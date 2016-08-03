import { drawDev } from '/imports/ui/helpers/dev';
import { drawPlaces, hidePlaces } from '/imports/ui/helpers/drawPlaces';
import { mapProjection } from '/imports/ui/helpers/mapProjection';

var d3Chart = {};

// Image width
const maxWidth = 200;

// Animation duration
const animDur = 200;

// Stagger base, to make the animations happen in delayed sequence
const stagger = 200;

/**
 * Create the D3 chart object
 */
d3Chart.create = function (el, props, state) {
  var svg = d3.select(el).append('svg')
    .attr('class', 'd3')
    .attr('width', props.width)
    .attr('height', props.height);

  // Add SVG background image
  svg.append('svg:image')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1920)
    .attr('height', 1080)
    .attr('xlink:href', '/images/mnrra_be09d4.png');

  // Add a group for the points
  svg.append('g')
    .attr('class', 'd3-points');

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

    var projection = mapProjection(state.settings);
    let line = {}
    line.x1 = projection([selectedPlace.long, selectedPlace.lat])[0];
    line.y1 = projection([selectedPlace.long, selectedPlace.lat])[1];
    console.log(line);
    console.log('----^ ^ ^ ^ ^ line ^ ^ ^ ^ ^----');

    // Set up place information
    $('.map-info, .map-info-background')
      .animate({
        width: '800px',
      }, 800);
    $('.map-info h3')
      .html(selectedPlace.name);
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
