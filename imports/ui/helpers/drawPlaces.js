import { appDurations, appSizes } from '/imports/ui/helpers/settings';
import _ from 'lodash';
import $ from 'jquery';

const d3 = require('d3');

/**
 * Define the SVG line points for each location
 */
function linePoints(projection, place) {
  const sizes = appSizes();
  const line = {};
  line.x1 = projection([place.long, place.lat])[0];
  line.y1 = projection([place.long, place.lat])[1];
  line.x2 = line.x1 + place.offsetX + (sizes.maxWidth / 2);
  line.y2 = line.y1 + place.offsetY + (sizes.maxWidth / 2);
  return line;
}

/**
 * Draw a line between the circle and the picture
 *
 * The line helps people know which picture goes with which spot
 *
 * @param {object} el Parent SVG element
 * @param {object} projection D3 map projection
 * @param {object} place Meteor data object for the place
 */
function drawLine(el, projection, place) {
  const dur = appDurations();
  const placeGroup = d3.select(el).selectAll('.map-points')
    .append('g')
    .attr('id', `line-${place.slug}`)
    .classed('place-line', true);

  const line = linePoints(projection, place);
  placeGroup.append('line')
    .attr('x1', line.x1)
    .attr('y1', line.y1)
    .attr('x2', line.x1)
    .attr('y2', line.y1)
    .attr('opacity', 0)
    .classed('map-line', true)
    .transition()
    .duration(dur.default)
    .attr('x1', line.x2)
    .attr('y1', line.y2)
    .attr('opacity', 1);
}

/**
 * Draw individual location circle
 *
 * We draw this separately since we don't want any other transformations to
 * move the lat/long based map circle.
 *
 * @param {object} el Top level react DOM parent for our SVG elements
 * @param {function} projection D3 map projection object
 * @param {object} place Place object data from Meteor
 */
function drawCircle(el, projection, place) {
  const sizes = appSizes();
  const placeGroup = d3.select(el).selectAll('.map-points')
    .append('g')
    .attr('id', `circle-${place.slug}`)
    .classed('place-circle', true);
  placeGroup.append('circle')
    .attr('r', '5px')
    .attr('id', `circle-${place.slug}-base`)
    .attr('stroke-width', 4)
    .attr('stroke', '#062926')
    .classed('map-circle', true);
  const line = linePoints(projection, place, sizes.maxWidth);
  placeGroup.attr('transform', `translate(${line.x1},${line.y1})`);
}

/**
 * Draw individual location label group
 *
 * Draw the text label, picture, and click-able box near each location circle
 *
 * @param  {function} projection D3 map projection object
 * @param  {object} place Place object data from Meteor
 * @param  {object} placeImage TODO: add description
 */
function drawImageLabel(projection, place, placeImage) {
  const sizes = appSizes();
  const dur = appDurations();

  const center = {};
  center.x1 = projection([place.long, place.lat])[0];
  center.y1 = projection([place.long, place.lat])[1];
  center.x2 = projection([place.long, place.lat])[0] + place.offsetX;
  center.y2 = projection([place.long, place.lat])[1] + place.offsetY;

  // Parent group div for picture and the labels
  const xStyle = ['left', `${center.x1}px`];
  const yStyle = ['top', `${center.y1}px`];

  const $newDiv = $('<div/>')
    .attr('id', place.slug)
    .addClass('place-label')
    .css(yStyle[0], yStyle[1])
    .css(xStyle[0], xStyle[1]);
  const backgroundImage = `/images/collection/${placeImage.filename}`;
  let displayDimension = placeImage.width;
  if (placeImage.width >= sizes.maxWidth) {
    displayDimension = sizes.maxWidth;
  }

  let backgroundSize = '';
  if (placeImage.width > placeImage.height) {
    const backgroundWidth = (
      (placeImage.width * sizes.maxWidth) / placeImage.height
    );
    backgroundSize = `${backgroundWidth}px ${sizes.maxWidth}px`;
  } else {
    backgroundSize = '100%';
  }

  const $placeLabelBackground = $('<div/>')
    .attr('id', placeImage.slug)
    .addClass('place-label-background')
    .css('background-image', `url(${backgroundImage})`)
    .css('background-size', backgroundSize)
    .css('width', '0px')
    .css('height', '0px');

  $newDiv.append($placeLabelBackground);
  $('.Chart').append($newDiv);

  $newDiv.animate({
    opacity: 1,
    left: center.x2,
    top: center.y2,
  }, dur.default, () => {
    const labelRotation = _.sample(['-3', '3']);
    const $placeLabelText = $('<div/>')
      .addClass('place-label-text')
      .css({ transform: `rotate(${labelRotation}deg)` })
      .html(place.name);
    $placeLabelBackground.append($placeLabelText);
    $placeLabelText
      .animate({
        opacity: 1,
      }, 500);
  });

  $placeLabelBackground.animate({
    width: `${displayDimension}px`,
    height: `${displayDimension}px`,
  }, dur.default);
}

function drawPlace(el, projection, place, placeImage) {
  // Draw the location labels and images
  drawImageLabel(projection, place, placeImage);

  // Draw map circle, for each location
  drawLine(el, projection, place);

  // Draw map circle, for each location
  drawCircle(el, projection, place);
}

/**
 * Draw all the places when you enter the map
 *
 * @param el
 * @param projection
 * @param places
 * @param images
 */
export function drawPlaces(el, projection, places, images) {
  const dur = appDurations();

  // Remove any past circles
  d3.selectAll('.place-circle')
    .remove();

  _.each(places, (place, i) => {
    // Find the images for this location
    const placeImages = _.filter(images, (o) => o.place === place.name);

    // Select a random image
    const placeImage = _.sample(placeImages);
    setTimeout(() => {
      drawPlace(el, projection, place, placeImage);
    }, dur.stagger * (i + 0.1));
  });
}

/**
 * Hide a single place
 *
 * @param elemId
 * @param projection
 * @param place
 * @param maxWidth
 */
function hidePlace(elemId, projection, place, maxWidth) {
  const dur = appDurations();
  const sizes = appSizes();

  // Fade out the divs, that weren't clicked
  const $filteredPlaces = $('.place-label');
  $filteredPlaces.animate({
    opacity: 0,
  }, 300, () => {
    $filteredPlaces.remove();
  });

  // Fade out the SVG elements, that weren't clicked
  const shapes = ['line', 'circle'];
  _.each(shapes, (shape) => {
    const placeShape = d3.selectAll(`#${shape}-${place.slug}`);

    // Leave the circle for the clicked element in place
    if (placeShape.attr('id') !== `circle-${elemId}`) {
      placeShape
        .select(shape)
        .transition()
        .duration(300)
        .attr('opacity', 0);
      placeShape
        .remove();
    } else {
      // Move the clicked highlight circle
      const circleGroup = `#circle-${elemId}`;
      const line = linePoints(projection, place, maxWidth);
      const translationX = ((sizes.screenWidth - sizes.infoWidthExpanded) / 2);
      d3.select(circleGroup)
        .transition()
        .duration(dur.bgZoom)
        .attr('transform', `translate(${translationX},${line.y1})`);

      /**
       * Animate selected map point circle
       */

      // Add a second stroke
      d3.select(`#circle-${elemId}`)
        .append('circle')
        .attr('id', `circle-${elemId}-stroke`)
        .attr('r', '5px')
        .attr('stroke-width', 4)
        .attr('stroke', '#33444C');
      const circlePathBase = `#circle-${elemId}-base`;
      const circlePathStroke = `#circle-${elemId}-stroke`;

      setTimeout(() => {
        d3.select(circlePathBase)
          .transition()
          .duration(dur.bounce)
          .attr('r', '45px')
          .attr('stroke-width', 9)
          .attr('stroke', '#0083c0')
          .attr('fill-opacity', 0.1)
          .transition()
          .duration(dur.bounce)
          .attr('r', '30px');

        d3.select(circlePathStroke)
          .transition()
          .duration(dur.bounce)
          .attr('r', '45px')
          .attr('stroke-width', 6)
          .attr('fill-opacity', 0.1)
          .transition()
          .duration(dur.bounce)
          .attr('r', '30px');
      }, dur.bgZoom - 500);
    }
  });
}

/**
 * Hide places that weren't clicked
 *
 * @param elemId
 * @param projection
 * @param places
 * @param maxWidth
 */
export function hidePlaces(elemId, projection, places, maxWidth) {
  _.each(places, (place) => {
    hidePlace(elemId, projection, place, maxWidth);
  });
}
