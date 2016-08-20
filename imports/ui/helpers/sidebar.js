import { appSizes, appDurations } from '/imports/ui/helpers/settings';
import { mapProjection } from '/imports/ui/helpers/mapProjection';
import _ from 'lodash';

const s = require('underscore.string');
const d3 = require('d3');

const sizes = appSizes();
const dur = appDurations();

export function expandSidebar(state, selectedPlace, selectedPlaceImageId) {
  let $mapSidebar = $('#map-sidebar');

  // Find if there are any then and now images
  let thenNow = _.find(state.thenNow, function (thenNowImage) {
    return thenNowImage.place === selectedPlace.name;
  });
  if (!_.isUndefined(thenNow)) {
    drawThenNowIcon(thenNow, state);
  }

  let selectedPlaceImage = _.find(state.images, function (image) {
    return image.slug == selectedPlaceImageId;
  });

  $('#sidebar-content')
    .removeClass()
    .addClass(selectedPlaceImage.slug);

  // Fade out default heading
  $mapSidebar.find('h3#default-heading')
    .fadeOut(dur.default, function () {

      // Populate place heading
      $mapSidebar.find('h3#place-heading')
        .html(selectedPlace.name);

      // Populate main image
      var imageHeight = sizes.highlightMaxHeight;
      if (selectedPlaceImage.customHeight) {
        imageHeight = selectedPlaceImage.customHeight;
      }

      let $highlightZoomIcon = $('<i/>')
        .addClass('fa fa-search-plus')
        .attr('aria-hidden', 'true');

      let $highlightZoom = $('<div/>')
        .addClass('image-zoom')
        .append($highlightZoomIcon);

      let $highlightImg = $('<img/>')
        .addClass('image-highlight')
        .attr('id', 'highlighted-' + selectedPlaceImage.slug)
        .attr('height', imageHeight)
        .attr('src', 'images/collection/' + selectedPlaceImage.filename);
      $('#highlighted-image')
        .prepend($highlightImg)
        .prepend($highlightZoom);

      if (selectedPlaceImage.caption != '' && _.has(selectedPlaceImage, 'caption')) {
        $('#caption-content')
          .show()
          .html(selectedPlaceImage.caption);
      } else {
        $('#caption-content')
          .hide();
      }

      // Populate image credit
      $('#credit-content')
        .html(selectedPlaceImage.credit);

      // Populate main text block
      const lines = s.lines(selectedPlaceImage.desc);
      let description = '';
      _.each(lines, line => {
        if (line !== '') {
          description = `${description}<p>${line}</p>`;
        }
      });

      let $paragraph = $('<p/>')
        .html(description);
      $('#text-content')
        .append($paragraph);

      // Fade in location content
      $('#location-content')
        .fadeIn(dur.default);

      // Expand the sidebar width
      $('#map-sidebar, #map-sidebar-background')
        .animate({
          left: (sizes.screenWidth - sizes.infoWidthExpanded),
        }, dur.default, function () {
          $('#dock')
            .animate({
              bottom: -20,
            }, dur.default);
        });

    });

  // Thumbnails bar - Dock
  let placeImages = _.filter(state.images, function (o) {
    return o.place == selectedPlace.name;
  });

  placeImages = _.sortBy(placeImages, function (o) {
    return parseInt(o.order);
  });

  // Total width of the dock thumbnails
  var sumWidths = _.reduce(placeImages, function (sum, image) {
    var ratio = image.width / image.height;
    var adjustedWidth = sizes.thumbHieght * ratio;
    return (parseInt(sum) + parseInt(adjustedWidth));
  }, 0);

  sumWidths = sumWidths + ((sizes.dockMargin * 2) * _.size(placeImages));

  // If the expected dock size is too big add a multiplier to shrink the
  // images and the margins between them.
  var dimensionMultiplier = sizes.dockWidth / sumWidths;
  var thumbHeight = sizes.thumbHieght;
  var marginLeft = sizes.defaultDockMargin;
  if (sumWidths > sizes.dockWidth) {
    marginLeft = sizes.smallerDockMargin;
  }

  const dockImages = _.size(placeImages);

  let adjustmentRatio = 0.5;
  let cumulativeLeft = 100;
  if (_.size(placeImages) > 5) {
    cumulativeLeft = 100;
    adjustmentRatio = 0.5;
  }
  if (_.size(placeImages) > 8) {
    cumulativeLeft = 50;
    adjustmentRatio = 0.55;
  }
  if (_.size(placeImages) > 10) {
    cumulativeLeft = 50;
    adjustmentRatio = 0.75;
  }
  if (_.size(placeImages) > 11) {
    cumulativeLeft = -50;
    adjustmentRatio = 0.20;
  }

  _.each(placeImages, function (image, i) {

    // Discover the image thumbnails' width
    var ratio = image.width / image.height;

    if (i !== 0) {
      const previousI = (i - 1);
      const prevRatio = placeImages[previousI].width / placeImages[previousI].height;
      const prevImageAdjustedWidth = sizes.thumbHieght * prevRatio;
      cumulativeLeft += prevImageAdjustedWidth;
    }

    // Dock Image container
    var marginTop = 0;
    let $thumbDiv = $('<div/>')
      // .css('margin-left', Math.floor(sizes.dockMargin * dimensionMultiplier))
      .css('left', cumulativeLeft * adjustmentRatio)
      // .css('margin-right', Math.floor(sizes.dockMargin * dimensionMultiplier))
      .css('margin-top', marginTop)
      .css('margin-bottom', 0)
      .empty();

    // Rotate images to display in a fan
    const rotationRange = 16;
    const rotationStart = -8;
    var imageRotation = 0;

    // With only two images use the start and finish rotations
    if (dockImages == 2 &&  i == 0) {
      imageRotation = rotationStart;
    }

    if (dockImages == 2 &&  i == 1) {
      imageRotation = rotationStart + rotationRange;
    }

    // Fan the images out at intervals with more than 2 images
    if (dockImages > 2) {
      imageRotation = rotationStart + ((rotationRange / (dockImages - 1)) * i);
    }

    // Thumbnail image
    let $thumbImg = $('<img/>')
      .empty()
      .attr('id', 'dock-' + image.slug)
      .addClass('image-thumbnail')
      .css('transform', 'rotate(' + imageRotation + 'deg)')
      .attr('height', thumbHeight)
      .attr('src', 'images/collection/' + image.filename);

    // Identify the active image in the dock
    if (image.slug === selectedPlaceImage.slug) {
      $thumbImg
        .addClass('active')
        .css('margin-top', sizes.highlightedDockImageMargin);
    }

    $thumbDiv
      .append($thumbImg);

    $('#dock')
      .append($thumbDiv);

  });
}

export function collapseSidebar() {
  // Fade out sidebar content
  $('#location-content')
    .fadeOut((dur.default / 2), function () {

      // After fade out empty all the divs
      $('#place-heading, #credit-content, #text-content, #dock')
        .empty();
      $('#image-content').find('img')
        .remove();

      $('#dock')
        .animate({
          bottom: ((sizes.dockHeight) * -1 - 100),
        });

      // Slide the sidebar back to homepage default
      $('#map-sidebar, #map-sidebar-background')
        .animate({
          left: (sizes.screenWidth - sizes.infoWidthCollapsed),
        }, (dur.default / 2), function () {
          // Fade back in the default heading
          let $mapSidebar = $('#map-sidebar');
          $mapSidebar
            .find('h3#default-heading')
            .fadeIn(dur.default);
        });

    });

  // Fade out the then and now button
  $('#then-now-button')
    .fadeOut(dur.default)
    .html('');
}

/**
 * Set up the sidebar on the initial render
 *
 * Start with sidebar collapsed. Set sizes and animation durations
 */
export function drawSidebar() {
  // Set sidebar to default homepage width
  $('#map-sidebar, #map-sidebar-background')
    .css('width', sizes.infoWidthExpanded)
    .css('left', sizes.screenWidth - sizes.infoWidthCollapsed);

  // Hide the div that we will place our detail content into
  // This make it easier to fade in on transition
  $('#location-content')
    .hide();

  $('#dock')
    .css('bottom', (sizes.dockHeight) * -1 - 100)
    .css('height', (sizes.dockHeight))
    .css('padding-left', (sizes.dockLeftPadding))
    .addClass('other');

}

export function highlightImage(clicked, state) {
  let selectedDockImage = _.find(state.images, function (image) {
    return image.slug == clicked.id.replace('dock-', '');
  });

  $('#sidebar-content')
    .removeClass()
    .addClass(selectedDockImage.slug);

  $('#image-content, #text-content')
    .fadeOut((dur.default / 2), function () {

      // Replace image and text content
      const lines = s.lines(selectedDockImage.desc);
      let description = '';
      _.each(lines, line => {
        if (line !== '') {
          description = `${description}<p>${line}</p>`;
        }
      });

      $('#text-content')
        .empty();
      let $paragraph = $('<p/>')
        .html(description);
      $('#text-content')
        .append($paragraph);

      $('#credit-content')
        .html(selectedDockImage.credit);

      if (selectedDockImage.caption != '' && _.has(selectedDockImage, 'caption')) {
        $('#caption-content')
          .show()
          .html(selectedDockImage.caption);
      } else {
        $('#caption-content')
          .hide();
      }

      var imageHeight = sizes.highlightMaxHeight;
      if (selectedDockImage.customHeight) {
        imageHeight = selectedDockImage.customHeight;
      }

      $('.image-highlight')
        .attr('id', 'highlighted-' + selectedDockImage.slug)
        .attr('height', imageHeight)
        .attr('src', 'images/collection/' + selectedDockImage.filename);
    })

    // Fade detail content back in after content is switched
    .fadeIn(dur.default / 2);

  // Remove the active class from any dock images
  $('#dock').find('div img.active')
    .removeClass('active')
    .animate({
      marginTop: 0,
    }, (dur.default / 4));

  $('#dock-' + selectedDockImage.slug)
    .addClass('active')
    .animate({
      marginTop: sizes.highlightedDockImageMargin * 1.4,
    }, (dur.default / 6), function () {
      $(this).animate({
        marginTop: sizes.highlightedDockImageMargin,
      }, dur.default / 4);
    });

  // TODO: Figure out a way to animate box-shadow
  // Changing the box shadow without an animated transition is distracting
  // None of the jquery plugins seem to work properly.
  // .css('box-shadow', '6px 6px 20px #222222')
  // .css('box-shadow', 'none');

}

function drawThenNowIcon(selectedThenNow, state) {
  const svg = d3.select('.Chart').append('svg')
    .attr('class', 'svg-detail')
    .attr('width', `${sizes.screenWidth}px`)
    .attr('height', `${sizes.screenHeight}px`);

  // Add a group for the map
  const thenGroup = svg.append('g')
    .attr('class', 'then-now');

  const projection = mapProjection(state.settings);
  const point = projection([selectedThenNow.long, selectedThenNow.lat]);
  console.log(point);
  console.log('----^ ^ ^ ^ ^ point ^ ^ ^ ^ ^----');

  thenGroup.append('circle')
    .attr('r', '5px')
    // .attr('id', `circle-${place.slug}-base`)
    .attr('stroke-width', 4)
    .attr('stroke', '#062926')
    .classed('map-circle', true);

  thenGroup
    .attr('transform', `translate(${point[0]},${point[1]})`);

  const $thenNowButton = $('<img/>')
    // .attr('height', imageHeight)
    .addClass('then-now-button')
    .attr('src', `images/then-now/${selectedThenNow.thumbFilename}`);

  $('#then-now-button')
    .fadeIn(dur.default)
    .append($thenNowButton);

}
