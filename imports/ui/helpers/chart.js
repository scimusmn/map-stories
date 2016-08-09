import { drawDev } from '/imports/ui/helpers/dev';
import { drawPlaces, hidePlaces } from '/imports/ui/helpers/drawPlaces';
import { mapProjection } from '/imports/ui/helpers/mapProjection';
import { appDurations, appSizes } from '/imports/ui/helpers/settings';
import {
  collapseSidebar, drawSidebar, expandSidebar, highlightImage
} from '/imports/ui/helpers/sidebar';
import { zoomImage, hideZoomImage } from '/imports/ui/helpers/zoom';

const sizes = appSizes();
const dur = appDurations();

/**
 * Create the D3 chart object
 */
let d3Chart = {};
d3Chart.create = function (el, props, state) {

  /**
   * Set up the homepage map
   */
  this._drawMap(el, props, state);

  /**
   * Set up the homepage sidebar
   */
  drawSidebar();

  /**
   * Handle clicks on homepage places
   *
   * It's important to use the .on() syntax which can handle
   * looking for elements that are animating into the page
   * over time (animation).
   */
  $(document).on('click', '.place-label', function () {
    drawDetailPage(this, state);
  });

  /**
   * Handle click on the detail page home button
   */
  $(document).on('click', '.home-button', function () {
    reDrawHomePage(el, state);
  });

  /**
   * Handle click on the dock images
   */
  $(document).on('click', '.image-thumbnail:not(.active)', function () {
    highlightImage(this, state);
  });

  /**
   * Handle click on the highlight images
   */
  $(document).on('click', '.image-highlight', function () {
    zoomImage(this, state);
  });

  /**
   * Handle close click for image highlights
   */
  $(document).on('click', '.zoom-image-container', function () {
    hideZoomImage(this, state);
  });

};

/**
 * Draw the homepage map when the app is loaded
 * @param el
 * @param props
 * @param state
 * @private
 */
d3Chart._drawMap = function (el, props, state) {
  const sizes = appSizes();
  let svg = d3.select(el).append('svg')
    .attr('class', 'd3')
    .attr('width', props.width)
    .attr('height', props.height);

  // Add SVG background image
  svg.append('svg:image')
    .attr('id', 'background-image')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', sizes.screenWidth)
    .attr('height', sizes.screenHeight)
    .attr('xlink:href', '/images/mnrra_754709.jpg');

  // Add a group for the points
  svg.append('g')
    .attr('class', 'map-points');

  // Draw development tools if enabled
  drawDev(el, props, mapProjection(state.settings));

  // Draw all of the places on the map
  drawPlaces(
    el,
    mapProjection(state.settings),
    state.places,
    state.images,
  );

};


/**
 * Draw the details page, when a user selects a location
 * @param clicked The clicked DOM element
 * @param {object} state Meteor data via React state
 */
function drawDetailPage(clicked, state) {

  // Selected place ID
  let selectedPlaceId = $(clicked).attr('id');

  // ID of the image in the selected place
  // This will be highlighted in the sidebar
  let selectedPlaceImageId = $(clicked)
    .children('.place-label-background')
    .attr('id');

  // Get Meteor data object for the selected place
  let selectedPlace = _.find(state.places, function (o) {
    return o.slug == selectedPlaceId;
  });

  // Animate out the places that were not clicked
  hidePlaces(
    selectedPlaceId,
    mapProjection(state.settings),
    state.places,
  );

  // Center the map on the selected location
  zoomMap(state, selectedPlace);

  // Expand the sidebar and add clicked content
  expandSidebar(state, selectedPlace, selectedPlaceImageId);

  // Draw the home button
  drawHomeButton();
}

/**
 * Zoom and pan the background map to a selected location
 * @param state
 * @param selectedPlace
 */
function zoomMap(state, selectedPlace) {

  let projection = mapProjection(state.settings);
  let line = {};
  line.x1 = projection([selectedPlace.long, selectedPlace.lat])[0];
  line.y1 = projection([selectedPlace.long, selectedPlace.lat])[1];

  // Zoom and position background image
  d3.select('#background-image')
    .transition()
    .duration(dur.bgZoom)
    .attr('width', sizes.screenWidth * 2)
    .attr('height', sizes.screenHeight * 2)
    .attr(
      'x',
      (
        (line.x1 * -2) +
        ((sizes.screenWidth - sizes.infoWidthExpanded) / 2)
      )
    )
    .attr('y', (line.y1 * -1));

  // Use in the future if you draw a bigger map
  // that can accommodate the overflow in the Y axis
  // .attr('y', ((line.y1 * -2) + (screenHeight / 2)));

}

/**
 * Draw home button
 */
function drawHomeButton() {
  // Add home button
  let $homeButton = $('<div/>')
    .addClass('home-button')
    .html('Home');
  $('.Chart')
    .append($homeButton);

  // Position home button in center of map panel
  $homeButton.css(
    'left',
    ((sizes.screenWidth - sizes.infoWidthExpanded) / 2) -
    ($homeButton.outerWidth() / 2)
  );
}

/**
 * Draw homepage on return from the detail view
 * @param el
 * @param state
 */
function reDrawHomePage(el, state) {
  collapseSidebar();

  // Reset the background map
  d3.select('#background-image')
    .transition()
    .duration(300)
    .attr('width', sizes.screenWidth)
    .attr('height', sizes.screenHeight)
    .attr('x', 0)
    .attr('y', 0);

  // Remove home button
  $('div.home-button').remove();

  drawPlaces(
    el,
    mapProjection(state.settings),
    state.places,
    state.images,
  );
}

/**
 * Update the D3 chart when the React props change
 * @param el
 * @param props
 * @param state
 */
d3Chart.update = function (el, props, state) {
  const mapPath = d3.select('path.states');
  mapPath.remove();
  this._drawMap(el, props, state);
};

export default d3Chart;
