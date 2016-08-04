/**
 * Draw a line between the circle and the picture
 *
 * The line helps people know which picture goes with which spot
 *
 * @param {object} el Parent SVG element
 * @param {object} projection D3 map projection
 * @param {object} place Meteor data object for the place
 * @param {int} maxWidth Width of the image circle.
 *  Used here for calculating animation centers
 * @param dur {int} Line drawing animation duration
 */
function drawLine(el, projection, place, maxWidth, dur) {
  var placeGroup = d3.select(el).selectAll('.d3-points')
    .append('g')
    .attr('id', 'line-' + place.slug)
    .classed('place-line', true);

  var line = linePoints(projection, place, maxWidth);
  placeGroup.append('line')
    .attr('x1', line.x1)
    .attr('y1', line.y1)
    .attr('x2', line.x1)
    .attr('y2', line.y1)
    .attr('opacity', 0)
    .classed('map-line', true)
    .transition()
    .duration(dur)
    .attr('x1', line.x2)
    .attr('y1', line.y2)
    .attr('opacity', 1);
}

function linePoints(projection, place, maxWidth) {
  var line = {};
  line.x1 = projection([place.long, place.lat])[0];
  line.y1 = projection([place.long, place.lat])[1];
  line.x2 = line.x1 + place.offsetX + (maxWidth / 2);
  line.y2 = line.y1 + place.offsetY + (maxWidth / 2);
  return line;
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
 * @param {int} maxWidth Width of the image circle.
 *              Used here for calculating animation centers
 */
function drawCircle(el, projection, place, maxWidth) {
  var placeGroup = d3.select(el).selectAll('.d3-points')
    .append('g')
    .attr('id', 'circle-' + place.slug)
    .classed('place-circle', true);
  placeGroup.append('circle')
    .attr('r', '5px')
    .attr('stroke-width', 4)
    .attr('stroke', '#062926')
    .classed('map-circle', true);
  var line = linePoints(projection, place, maxWidth);
  placeGroup.attr('transform', 'translate(' + line.x1 + ',' + line.y1 + ')');
}

/**
 * Draw individual location label group
 *
 * Draw the text label, picture, and click-able box near each location circle
 *
 * @param  {function} projection D3 map projection object
 * @param  {object} place Place object data from Meteor
 * @param  {object} placeImage TODO: add description
 * @param  {object} maxWidth Maximum width for the image
 * @param  {int} picDur Milliseconds for the fade in animation
 */
function drawImageLabel(projection, place, placeImage, maxWidth, picDur) {
  var center = {};
  center.x1 = projection([place.long, place.lat])[0];
  center.y1 = projection([place.long, place.lat])[1];
  center.x2 = projection([place.long, place.lat])[0] + place.offsetX;
  center.y2 = projection([place.long, place.lat])[1] + place.offsetY;

  // Parent group div for picture and the labels
  var xStyle = ['left', center.x1 + 'px'];
  var yStyle = ['top', center.y1 + 'px'];

  var $newDiv = $('<div/>')
    .attr('id', place.slug)
    .addClass('place-label')
    .css(yStyle[0], yStyle[1])
    .css(xStyle[0], xStyle[1]);

  var backgroundImage = '/images/collection/' + placeImage.filename;

  let displayDimension = placeImage.width;
  if (placeImage.width >= maxWidth) {
    displayDimension = maxWidth;
  }

  var $placeLabelBackground = $('<div/>')
    .addClass('place-label-background')
    .css('background-image', 'url(' + backgroundImage + ')')
    .css('width', '0px')
    .css('height', '0px');

  $newDiv.append($placeLabelBackground);
  $('.Chart').append($newDiv);

  $newDiv.animate({
    opacity: 1,
    left: center.x2,
    top: center.y2,
  }, picDur, function () {
    var $placeLabelText = $('<div/>')
      .addClass('place-label-text')
      .html(place.name);
    $placeLabelBackground.append($placeLabelText);
    $placeLabelText
      .animate({
        opacity: 1,
      }, 500);
  });

  $placeLabelBackground.animate({
    width: displayDimension + 'px',
    height: displayDimension + 'px',
  }, picDur);

}

function drawPlace(el, projection, place, placeImage, maxWidth, animDur) {
  // Draw the location labels and images
  drawImageLabel(projection, place, placeImage, maxWidth, animDur);

  // Draw map circle, for each location
  drawLine(el, projection, place, maxWidth, animDur);

  // Draw map circle, for each location
  drawCircle(el, projection, place, maxWidth);
}

/**
 * Draw all the places when you enter the map
 *
 * @param el
 * @param projection
 * @param places
 * @param images
 * @param maxWidth
 * @param stagger
 * @param animDur
 */
export function drawPlaces(el, projection, places, images, maxWidth, stagger, animDur) {
  _.each(places, function (place, i) {
    // Find the images for this location
    const placeImages = _.filter(images, function (o) {
      if (o.place == place.name) {
        return true;
      }
    });

    // Select a random image
    const placeImage = _.sample(placeImages);

    setTimeout(function () {
      drawPlace(el, projection, place, placeImage, maxWidth, animDur);
    }, stagger * (i + 1 - 0.9));
  });
}

/**
 * Hide places that weren't clicked
 *
 * @param el
 * @param projection
 * @param places
 * @param images
 * @param maxWidth
 * @param stagger
 * @param animDur
 */
export function hidePlaces(elemId, el, projection, places, images, maxWidth, stagger, animDur) {
  _.each(places, function (place, i) {
    hidePlace(elemId, el, projection, place, maxWidth, animDur);
  });

}

/**
 * Hide a single place
 *
 * @param elemId
 * @param el
 * @param projection
 * @param place
 * @param maxWidth
 * @param animDur
 */
function hidePlace(elemId, el, projection, place, maxWidth, animDur) {
  // Fade out the divs, that weren't clicked
  let $placeLabel = $('.place-label');
  // let $filteredPlaces = $placeLabel.not('#' + elemId);
  let $filteredPlaces = $placeLabel;
  $filteredPlaces.animate({
    opacity: 0,
  }, 300, function () {
    $filteredPlaces.hide();
  });

  // Fade out the SVG elements, that weren't clicked
  let shapes = ['line', 'circle'];
  _.each(shapes, function (shape){
    let placeShape = d3.selectAll('#' + shape + '-' + place.slug);
    // Leave the circle for the clicked element in place
    if (placeShape.attr('id') != 'circle-' + elemId) {
      placeShape
        .select(shape)
        .transition()
        .duration(300)
        .attr('opacity', 0);
    } else {
      var circlePath = '#circle-' + elemId + ' circle';
      console.log(circlePath);
      console.log('----^ ^ ^ ^ ^ circlePath ^ ^ ^ ^ ^----');
      d3.select(circlePath)
        .attr('r', '20px')
        .attr('stroke-width', 3)
        .attr('fill-opacity', .2);
    }
  });

}

