import { drawDev } from '/imports/ui/helpers/dev';
import { drawPlaces, hidePlaces } from '/imports/ui/helpers/drawPlaces';
import { mapProjection } from '/imports/ui/helpers/mapProjection';

/**
 * Animation durations
 */
export function appDurations() {
  const dur = {};

  // Stagger base, to make the animations happen in delayed sequence
  dur.stagger = 30;

  // Default animation duration
  dur.default = 300;

  // Map zoom duration
  dur.bgZoom = 1200;

  // Bounce
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
  sizes.infoWidthExpanded = sizes.screenWidth * (2 / 3);

  // Map X translate
  // Fudge factor for the distance to move all the map points
  sizes.zoomTranslate = 400;

  // Image width
  sizes.maxWidth = 200;

  return sizes;
}

/**
 * Create the D3 chart object
 */
d3Chart.create = function (el, props, state) {
  var svg = d3.select(el).append('svg')
    .attr('class', 'd3')
    .attr('width', props.width)
    .attr('height', props.height);

  // Add SVG background image
  var backgroundImage = svg.append('svg:image')
    .attr('id', 'background-image')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1920)
    .attr('height', 1080)
    .attr('xlink:href', '/images/mnrra_be09d4.png');

  // Add a group for the points
  svg.append('g')
    .attr('class', 'map-points');

  this._drawMap(el, props, state);

  // Listen for clicks on the places
  // It's important to use the .on() syntax which can handle
  // looking for elements that are animating into the page over time (animation)
  $(document).on('click', '.place-label', function (e) {
    // Output the element that was clicked on
    var elemId = $(this).attr('id');

    /**
     * TODO:
     *  - Hide all of the elements that aren't the one that was clicked
     *  - Zoom the map to the point that was clicked
     *  - Animate in the right div that contains the content for the section
     *    that was clicked
     */

    /**
     * Animate out the places that were not clicked
     */
    hidePlaces(
      elemId,
      el,
      mapProjection(state.settings),
      state.places,
      state.images,
      maxWidth,
      stagger,
      animDur
    );

    let selectedPlace = _.find(state.places, function (o) {
      return o.slug == elemId;
    });

    // Map projection details for map zoom
    var projection = mapProjection(state.settings);
    let line = {};
    line.x1 = projection([selectedPlace.long, selectedPlace.lat])[0];
    line.y1 = projection([selectedPlace.long, selectedPlace.lat])[1];

    // Zoom and position background image
    d3.select('#background-image')
      .transition()
      .duration(300)
      .attr('width', 3840)
      .attr('height', 2160)
      .attr('x', ((line.x1 * -2) + 320))
      .attr('y', (line.y1 * -1));

    // Use in the future if you draw a bigger map
    // that can accommodate the overflow in the Y axis
    // .attr('y', ((line.y1 * -2) + (1080 / 2)));

    /**
     * Draw sidebar
     */
    // Sidebar heading
    $('#map-sidebar, #map-sidebar-background')
      .attr('class', 'map-sidebar-detail');
    $('#map-sidebar h3#default-heading')
      .hide()
    $('#map-sidebar h3#place-heading')
      .html(selectedPlace.name)
      .show();

    // Add home button to the side panel
    var $homeButton = $('<div/>')
      .addClass('home-button')
      .html('Home');
    $('#map-sidebar')
      .append($homeButton);

    // Sidebar content
    var placeImages = _.filter(state.images, function(o) {
      return o.place == selectedPlace.name;
    });
    _.each(placeImages, function (image) {

      var $thumbDiv = $('<img/>')
        .empty()
        .addClass('image-thumbnail')
        .attr('width', 300)
        .attr('src', 'images/collection/' + image.filename);

      $('#image-thumbnails')
        .append($thumbDiv);

    });
  });

  $(document).on('click', '.home-button', function (e) {
    // Resize the sidebar
    $('#map-sidebar, #map-sidebar-background')
      .attr('class', 'map-sidebar-home');

    // Reset the background map
    d3.select('#background-image')
      .transition()
      .duration(300)
      .attr('width', 1920)
      .attr('height', 1080)
      .attr('x', 0)
      .attr('y', 0);

    // Remove home button
    $('div.home-button').remove();

    // Reset heading
    $('#map-sidebar h3#default-heading')
      .show()
    $('#map-sidebar h3#place-heading')
      .hide();

    // Reset sidebar content
    $('#image-thumbnails')
      .empty();

    drawPlaces(
      el,
      mapProjection(state.settings),
      state.places,
      state.images,
      maxWidth,
      stagger,
      animDur
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

  // Draw development tools if enabled
  drawDev(el, props, mapProjection(state.settings));

  // Draw all of the places on the map
  drawPlaces(
    el,
    mapProjection(state.settings),
    state.places,
    state.images,
    maxWidth,
    stagger,
    animDur
  );

};

export default d3Chart;
