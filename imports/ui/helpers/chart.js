import { drawDev } from '/imports/ui/helpers/dev';
import { drawPlaces, hidePlaces } from '/imports/ui/helpers/drawPlaces';
import { mapProjection } from '/imports/ui/helpers/mapProjection';
import { appDurations, appSizes } from '/imports/ui/helpers/settings';

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

};

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
    .attr('xlink:href', '/images/mnrra_be09d4.png');

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
 * Set up the sidebar on the initial render
 *
 * Start with sidebar collapsed. Set sizes and animation durations
 */
function drawSidebar() {
  $('#map-sidebar, #map-sidebar-background')
    .css('transition', 'all ' + (dur.sidebarSlide / 1000) + 's ease')
    .css('width', sizes.infoWidthCollapsed);
  $('#image-thumbnails')
    .css('height', (sizes.thumbHieght + 100));
}

function drawDetailPage(clicked, state) {

  // Selected place ID
  let selectedPlaceId = $(clicked).attr('id');

  // ID of the image in the selected place
  // This will be highlighted in the sidebar
  let selectedPlaceImageId = $(clicked)
    .children('.place-label-background')
    .attr('id');

  /**
   * Animate out the places that were not clicked
   */
  hidePlaces(
    selectedPlaceId,
    mapProjection(state.settings),
    state.places,
  );

  let selectedPlace = _.find(state.places, function (o) {
    return o.slug == selectedPlaceId;
  });

  // Map projection details for map zoom
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

  /**
   * Draw sidebar
   */

  // Sidebar heading
  let $mapSidebar = $('#map-sidebar');
  $mapSidebar.find('h3#place-heading')
    .html(selectedPlace.name)
    .show();
  $mapSidebar.find('h3#default-heading')
    .hide();

  // Expand the sidebar width
  $('#map-sidebar, #map-sidebar-background')
    .css('width', sizes.infoWidthExpanded);

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

  // Main image
  let selectedPlaceImage = _.find(state.images, function (image) {
    return image.slug == selectedPlaceImageId;
  });

  let $highlightImg = $('<img/>')
    .empty()
    .addClass('image-highlight')
    .attr('height', sizes.highlightHieght)
    .attr('src', 'images/collection/' + selectedPlaceImage.filename);
  $('#image-content')
    .append($highlightImg);

  let $highlightText = $('<p/>')
    .empty()
    .addClass('text-highlight')
    .html('Lorem ipsum');
  $('#text-content')
    .append($highlightText);

  // Thumbnails bar
  let placeImages = _.filter(state.images, function (o) {
    return o.place == selectedPlace.name;
  });

  _.each(placeImages, function (image) {

    let $thumbDiv = $('<img/>')
      .empty()
      .addClass('image-thumbnail')
      .attr('height', sizes.thumbHieght)
      .attr('src', 'images/collection/' + image.filename);

    $('#image-thumbnails')
      .append($thumbDiv);

  });
}

/**
 * Draw homepage on return from the detail view
 * @param el
 * @param state
 */
function reDrawHomePage(el, state) {
  // Fade out sidebar content
  $('#location-content')
    .animate({
      opacity: 0,
    }, 200, function () {
      $('#image-content, #image-thumbnails, #text-content')
        .empty();
    });

  // Resize the sidebar
  $('#map-sidebar, #map-sidebar-background')
    .css('width', sizes.infoWidthCollapsed);

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

  // Reset heading
  let $mapSidebar = $('#map-sidebar');
  $mapSidebar
    .find('h3#default-heading')
    .show();
  $mapSidebar
    .find('h3#place-heading')
    .hide();

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

d3Chart.destroy = function (el) {
  // Clean up chart
};

export default d3Chart;
