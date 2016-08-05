import { drawDev } from '/imports/ui/helpers/dev';
import { drawPlaces, hidePlaces } from '/imports/ui/helpers/drawPlaces';
import { mapProjection } from '/imports/ui/helpers/mapProjection';

/**
 * Animation durations
 */
export function appDurations() {
  const dur = {};

  // Stagger base duration, to make the animations happen in delayed sequence
  dur.stagger = 30;

  // Default animation, used in various short item show and hides
  dur.default = 300;

  // Slide the sidebar out quickly to make the app feel snappy.
  dur.sidebarSlide = 800;

  // Zoom the map slightly slower so that your eye catches the location translation.
  dur.bgZoom = 1200;

  // Timing for circle bounce
  dur.bounce = 300;

  return dur;
}

/**
 * Element sizes
 *
 * Returns and object with global sizes and pixel dimensions for animation
 * and positioning.
 */
export function appSizes() {
  const sizes = {};

  // Screen dimensions
  sizes.screenWidth = 1920;
  sizes.screenHeight = 1080;
  sizes.infoWidthCollapsed = 560;
  sizes.infoWidthExpanded = sizes.screenWidth * (19 / 24);

  // Map X translate
  // Fudge factor for the distance to move all the map points
  sizes.zoomTranslate = 400;

  // Image sizes
  sizes.maxWidth = 200;
  sizes.thumbHieght = 100;
  sizes.highlightHieght = 650;

  return sizes;
}

/**
 * Create the D3 chart object
 */
let d3Chart = {};
d3Chart.create = function (el, props, state) {
  const sizes = appSizes();
  const dur = appDurations();

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

  this._drawMap(el, props, state);

  // Set the sidebar animation durations
  // Start with sidebar collapsed and set animation durations
  $('#map-sidebar, #map-sidebar-background')
    .css('transition', 'all ' + (dur.sidebarSlide / 1000) + 's ease')
    .css('width', sizes.infoWidthCollapsed);

  // Listen for clicks on the places
  // It's important to use the .on() syntax which can handle
  // looking for elements that are animating into the page over time (animation)
  $(document).on('click', '.place-label', function () {

    // Output the element that was clicked on
    let elemId = $(this).attr('id');

    // Pass this along to the image-thumbnails
    let childImage = $(this).children('.place-label-background').attr('id');

    /**
     * Animate out the places that were not clicked
     */
    hidePlaces(
      elemId,
      mapProjection(state.settings),
      state.places,
    );

    let selectedPlace = _.find(state.places, function (o) {
      return o.slug == elemId;
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
    $('#map-sidebar, #map-sidebar-background')
      .css('width', sizes.infoWidthExpanded);
    let $mapSidebar = $('#map-sidebar');
    $mapSidebar.find('h3#place-heading')
      .html(selectedPlace.name)
      .show();
    $mapSidebar.find('h3#default-heading')
        .hide();

    // Add home button to the side panel
    let $homeButton = $('<div/>')
      .addClass('home-button')
      .html('Home');
    $('.Chart')
      .append($homeButton);

    // Position home button in center
    $homeButton.css(
      'left',
      ((sizes.screenWidth - sizes.infoWidthExpanded) / 2) -
      ($homeButton.outerWidth() / 2)
    );

    // Sidebar content

    // Main image
    let randImage = _.find(state.images, function (image) {
      return image.slug == childImage;
    });

    let $highlightImg = $('<img/>')
      .empty()
      .addClass('image-highlight')
      .attr('height', sizes.highlightHieght)
      .attr('src', 'images/collection/' + randImage.filename);
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
  });

  /**
   * Handle click on the home button
   */
  $(document).on('click', '.home-button', function () {
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

    // Reset sidebar content
    $('#image-content, #image-thumbnails, #text-content')
      .empty();

    drawPlaces(
      el,
      mapProjection(state.settings),
      state.places,
      state.images,
    );

  });

};

/**
 * Update the D3 chart when the React props change
 */
d3Chart.update = function (el, props, state) {
  const mapPath = d3.select('path.states');
  mapPath.remove();
  this._drawMap(el, props, state);
};

d3Chart.destroy = function (el) {
  // Clean up chart
};

d3Chart._drawMap = function (el, props, state) {
  const sizes = appSizes();

  // Draw development tools if enabled
  drawDev(el, props, mapProjection(state.settings));

  // Draw all of the places on the map
  drawPlaces(
    el,
    mapProjection(state.settings),
    state.places,
    state.images,
  );

  $('#image-thumbnails')
    .css('height', (sizes.thumbHieght + 100));

};

export default d3Chart;
