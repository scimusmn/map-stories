import { Meteor } from 'meteor/meteor';
import { drawDev } from '/imports/ui/helpers/dev';
import { drawPlaces, hidePlaces } from '/imports/ui/helpers/drawPlaces';
import { mapProjection } from '/imports/ui/helpers/mapProjection';
import { appDurations, appSizes } from '/imports/ui/helpers/settings';
import {
  collapseSidebar, drawSidebar, expandSidebar, highlightImage,
} from '/imports/ui/helpers/sidebar';
import {
  zoomImage, hideZoomImage, zoomThenNow, hideZoomThenNow, playDakota, hideDakota
} from '/imports/ui/helpers/zoom';
import $ from 'jquery';
import _ from 'lodash';

const d3 = require('d3');

const sizes = appSizes();
const dur = appDurations();

/**
 * Draw homepage on return from the detail view
 * @param el
 * @param state
 */
function reDrawHomePage(el, state) {
  hideZoomImage();

  collapseSidebar();

  // Reset the background map
  d3.select('#background-image')
    .transition()
    .duration(300)
    .attr('width', sizes.screenWidth)
    .attr('height', sizes.screenHeight)
    .attr('x', 0)
    .attr('y', 0);

  $('.then-now').remove();

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
 * Draw home button
 */
function drawHomeButton() {
  // Add home button
  const $homeButton = $('<div/>')
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
 * Zoom and pan the background map to a selected location
 * @param state
 * @param selectedPlace
 */
function zoomMap(state, selectedPlace) {
  const projection = mapProjection(state.settings);
  const line = {};
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
}

/**
 * Draw the details page, when a user selects a location
 * @param clicked The clicked DOM element
 * @param {object} state Meteor data via React state
 */
function drawDetailPage(clicked, state) {

  // Selected place ID
  const selectedPlaceId = $(clicked).attr('id');

  // ID of the image in the selected place
  // This will be highlighted in the sidebar
  const selectedPlaceImageId = $(clicked)
    .children('.place-label-background')
    .attr('id');

  // Get Meteor data object for the selected place
  const selectedPlace = _.find(state.places, (o) => o.slug === selectedPlaceId);

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
 * Create the D3 chart object
 */
const d3Chart = {};
d3Chart.create = function createChart(el, props, state) {
  /**
   * Screensaver
   */
  function showScreensaver() {
    $('#screensaver')
      .fadeIn(
        dur.default,
        () => {
          const homeButtonVisible = $('.home-button').is(':visible');
          if (homeButtonVisible) {
            reDrawHomePage(el, state);
          }
        }
      );
  }

  function hideScreensaver() {
    const $screensaver = $('#screensaver');
    $screensaver
      .fadeOut(
        dur.default,
        () => $screensaver.hide()
      );
  }

  const screensaver = {
    activate() {
      showScreensaver();
      this.timeoutID = undefined;
    },

    setup() {
      if (typeof this.timeoutID === 'number') {
        this.cancel();
      }
      this.timeoutID = window.setTimeout((msg) => {
        this.activate(msg);
      }, dur.screensaver, 'Screensaver activated');
    },

    cancel() {
      hideScreensaver();
      window.clearTimeout(this.timeoutID);
      this.timeoutID = undefined;
    },

  };
  screensaver.setup();

  /**
   * Set up the homepage map
   */
  this.drawMap(el, props, state);

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
  $(document).on('click', '.place-label', function handleHomeClicks() {
    drawDetailPage(this, state);
  });

  /**
   * Handle click on the detail page home button
   */
  $(document).on('click', '.home-button', () => {
    reDrawHomePage(el, state);
  });

  /**
   * Handle click on the dock images
   */
  $(document).on('click', '.image-thumbnail:not(.active)', (e) => {
    highlightImage(e.target, state);
  });

  /**
   * Handle click on the highlight images
   */
  $(document).on('click', '.image-highlight', (e) => {
    zoomImage(e.target, state);
  });
  // Handle zoom icon click
  $(document).on('click', '.fa-search-plus', (e) => {
    const target = $('.image-highlight')[0];
    zoomImage(target, state);
  });
  // Handle zoom caption click
  $(document).on('click', '.image-caption', (e) => {
    const target = $('.image-highlight')[0];
    zoomImage(target, state);
  });

  /**
   * Handle close click for image highlights
   */
  $(document).on('click', '.zoom-image-container', (e) => {
    const $test = $(e.target);
    if (!($test).is('.zoom-image')) {
      hideZoomImage();
    }
    return false;
  });

  /**
   * Handle clicks on the Then and Now buttons
   */
  $(document).on('click', '.then-now-button', (e) => {
    zoomThenNow(e.target, state);
  });

  /**
   * Handle clicks on the Then and Now close button
   */
  $(document).on('click', '.then-now-zoom-image-container', (e) => {
    const $test = $(e.target);
    if (
      ($test).is('.then-now-zoom-image-container') ||
      ($test).is('.fa-times')
    ) {
      hideZoomThenNow(this, state);
    }
  });

  /**
   * Handle clicks on the Dakota place name buttons
   */
  $(document).on('click', '.dakota-label-text', (e) => {
    console.log(e);
    console.log('----^ ^ ^ ^ ^ e ^ ^ ^ ^ ^----');
    playDakota(e.target, state);
  });

  $(document).on('click', '.dakota-container', (e) => {
    const $test = $(e.target);
    if (!($test).is('.dakota-stage')) {
      hideDakota(this, state);
    }
  });

  /**
   * Reset screensaver timer on any event
   */
  $(document).on('click', '', () => {
    screensaver.cancel();
    screensaver.setup();
  });

};

/**
 * Draw the homepage map when the app is loaded
 * @param el
 * @param props
 * @param state
 * @private
 */
d3Chart.drawMap = (el, props, state) => {
  const svg = d3.select(el).append('svg')
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
  // drawDev(el, props, mapProjection(state.settings));

  // Draw all of the places on the map
  drawPlaces(
    el,
    mapProjection(state.settings),
    state.places,
    state.images,
  );
};


/**
 * Update the D3 chart when the React props change
 * @param el
 * @param props
 * @param state
 */
d3Chart.update = function updateD3Chart(el, props, state) {
  const mapPath = d3.select('path.states');
  mapPath.remove();
  this.drawMap(el, props, state);
};

export default d3Chart;
