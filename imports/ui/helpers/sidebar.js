import { appSizes, appDurations } from '/imports/ui/helpers/settings';
import { mapProjection } from '/imports/ui/helpers/mapProjection';
import _ from 'lodash';

const s = require('underscore.string');
const d3 = require('d3');

const sizes = appSizes();
const dur = appDurations();

function drawDakotaPlaceNames(selectedPlace, dakota, state) {
  const projection = mapProjection(state.settings);
  const selectedPlacePoint = projection([selectedPlace.long, selectedPlace.lat]);

  const svg = d3.select('.d3');
  _.each(dakota, (placeName) => {

    const point = projection([placeName.long, placeName.lat]);

    const adjustedPoint = []
    _.each(point, (coor, i) => { adjustedPoint.push((selectedPlacePoint[i] - coor)); });

    // Add a group for the then-now point
    const dakotaGroup = svg.append('g')
      .attr('class', 'dakota-place');

    // Adjust position for translated map
    const transX = ((sizes.screenWidth - sizes.infoWidthExpanded) / 2) - adjustedPoint[0];

    let labelPosX = (transX + 800);
    let labelPosY = (point[1] + 800);
    let labelWidth = 225;
    let lineOffsetX = 0;
    let lineOffsetY = 0;
    let labelRotation = _.sample(['-3', '3']);

    if (placeName.englishPlaceName === 'Mendota') {
      labelPosX = (transX + -131);
      labelPosY = (point[1] + -250);
      labelWidth = 170;
      lineOffsetX = 120;
      lineOffsetY = 140;
      labelRotation = 3;
    }

    if (placeName.englishPlaceName === 'Black Dog\'s village') {
      labelPosX = (transX + -190);
      labelPosY = (point[1] + 0);
      labelWidth = 250;
      lineOffsetX = 200;
      lineOffsetY = 70;
      labelRotation = 3;
    }

    if (placeName.englishPlaceName === 'Pilot Knob') {
      labelPosX = (transX - 80);
      labelPosY = (point[1] - 40);
      labelWidth = 210;
      lineOffsetX = 200;
      lineOffsetY = 100;
      labelRotation = -3;
    }

    if (placeName.englishPlaceName === 'Saint Paul') {
      labelPosX = (transX - 180);
      labelPosY = (point[1] - 240);
      labelWidth = 210;
      lineOffsetX = 181;
      lineOffsetY = 100;
      labelRotation = -3;
    }

    if (placeName.englishPlaceName === 'Spirit Island') {
      labelPosX = (transX - 100);
      labelPosY = (point[1] + 10);
      labelWidth = 211;
      lineOffsetX = 200;
      lineOffsetY = 100;
      labelRotation = -3;
    }

    if (placeName.englishPlaceName === 'Saint Anthony Falls') {
      labelPosX = (transX - 140);
      labelPosY = (point[1] - 280);
      labelWidth = 260;
      lineOffsetX = 200;
      lineOffsetY = 100;
      labelRotation = 3;
    }

    if (placeName.englishPlaceName === 'Nicollet Island') {
      labelPosX = (transX - 230);
      labelPosY = (point[1] - 440);
      labelWidth = 220;
      lineOffsetX = 200;
      lineOffsetY = 100;
      labelRotation = -3;
    }

    if (placeName.englishPlaceName === 'Little Crow’s Village') {
      labelPosX = (transX - 180);
      labelPosY = (point[1] + 101);
      labelWidth = 250;
      lineOffsetX = 200;
      lineOffsetY = 100;
      labelRotation = 3;
    }

    if (placeName.englishPlaceName === 'Carver’s Cave') {
      labelPosX = (transX - 180);
      labelPosY = (point[1] - 241);
      labelWidth = 220;
      lineOffsetX = 200;
      lineOffsetY = 100;
      labelRotation = -3;
    }

    if (placeName.englishPlaceName === 'Saint Croix River') {
      labelPosX = (transX - 321);
      labelPosY = (point[1] - 380);
      labelWidth = 250;
      lineOffsetX = 200;
      lineOffsetY = 100;
      labelRotation = 0;
    }

    if (placeName.englishPlaceName === 'Fort Snelling') {
      labelPosX = (transX - 240);
      labelPosY = (point[1] - 240);
      labelWidth = 210;
      lineOffsetX = 190;
      lineOffsetY = 100;
      labelRotation = -3;
    }

    if (placeName.englishPlaceName === 'Pike Island') {
      labelPosX = (transX - 110);
      labelPosY = (point[1] + 30);
      labelWidth = 210;
      lineOffsetX = 150;
      lineOffsetY = 100;
      labelRotation = -3;
    }

    if (placeName.englishPlaceName === 'Minnesota River') {
      labelPosX = (transX - 160);
      labelPosY = (point[1] + 24);
      labelWidth = 280;
      lineOffsetX = 150;
      lineOffsetY = 100;
      labelRotation = 3;
    }

    if (placeName.englishPlaceName === 'Meeting of the Rivers') {
      labelPosX = (transX - 211);
      labelPosY = (point[1] - 400);
      labelWidth = 260;
      lineOffsetX = 200;
      lineOffsetY = 100;
      labelRotation = 3;
    }

    setTimeout(function () {
      dakotaGroup.append('line')
        .attr('x1', transX)
        .attr('y1', point[1])
        .attr('x2', transX)
        .attr('y2', point[1])
        .attr('opacity', 0)
        .classed('map-line', true)
        .transition()
        .duration(600)
        .attr('x1', (labelPosX + lineOffsetX))
        .attr('y1', (labelPosY + lineOffsetY))
        .attr('opacity', 1);

      // Draw circle
      dakotaGroup.append('circle')
        .attr('r', '0')
        .attr('opacity', 0)
        .attr('stroke-width', 4)
        .attr('stroke', '#062926')
        .classed('map-circle', true)
        .attr('id', `dakota-map-circle-${placeName.slug}`)
        .attr('transform', `translate(${transX},${point[1]})`)
        .transition()
        .duration(300)
        .attr('opacity', 1)
        .attr('r', '5px');

    }, 800);

    let labelLeft = (labelPosX - 20);

    const $dakotaIcon = $('<div/>')
      .addClass('dakota-audio-icon')
      .html('<i class="fa fa-volume-up" aria-hidden="true"></i>');

    const $dakotaLabelText = $('<div/>')
      .addClass('dakota-label-text')
      .css({ transform: `rotate(${labelRotation}deg)` })
      .attr('id', `dakota-${placeName._id}`)
      .css('left', labelPosX + 60)
      .css('top', labelPosY + 60)
      .css('width', labelWidth)
      .css('height', 90)
      .html(`<span class="dakota">${placeName.dakotaPlaceName}</span><br/><span class="english">${placeName.englishPlaceName}</span>`);

    $dakotaLabelText
      .prepend($dakotaIcon);

    setTimeout(function () {
      // Attach label
      $('#dakota-place-names')
        .fadeIn(dur.default)
        .append($dakotaLabelText);

      // Fade it in
      $dakotaLabelText
        .animate({
          opacity: 1,
        }, 500);
      }, 500);

  });

}

export function expandSidebar(state, selectedPlace, selectedPlaceImageId) {
  let $mapSidebar = $('#map-sidebar');

  // Find if there are any Dakota place names
  const dakota = [];
  _.each(state.dakota, (dakotaPlaceName) => {
    if (dakotaPlaceName.place === selectedPlace.name) {
      dakota.push(dakotaPlaceName);
    }
  });

  if (!_.isUndefined(dakota)) {
    drawDakotaPlaceNames(selectedPlace, dakota, state);
  }

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
    cumulativeLeft = 110;
    adjustmentRatio = 0.38;
  }
  if (_.size(placeImages) > 11) {
    cumulativeLeft = 180;
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
  $('#then-now')
    .fadeOut(dur.default)
    .html('');

  // Fade out the Dakota Place Names
  $('#dakota-place-names')
    .fadeOut(dur.default)
    .html('');
  $('.dakota-place')
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

}

function drawThenNowIcon(selectedThenNow, state) {
  const svg = d3.select('.Chart').append('svg')
    .attr('class', 'svg-detail')
    .attr('width', `${sizes.screenWidth}px`)
    .attr('height', `${sizes.screenHeight}px`);

  // Add a group for the then-now point
  const thenGroup = svg.append('g')
    .attr('class', 'then-now');

  // Translate lat long to map pixels
  const projection = mapProjection(state.settings);
  const point = projection([selectedThenNow.long, selectedThenNow.lat]);

  // Adjust position for translated map
  const transX = ((sizes.screenWidth - sizes.infoWidthExpanded) / 2);

  const buttonPosX = (transX + selectedThenNow.offsetX);
  const buttonPosY = (point[1] + selectedThenNow.offsetY);

  // Draw circle
  thenGroup.append('circle')
    .attr('r', '0')
    .attr('opacity', 0)
    .attr('stroke-width', 4)
    .attr('stroke', '#062926')
    .classed('map-circle', true)
    .attr('transform', `translate(${transX},${point[1]})`)
    .transition()
    .duration(2500)
    .attr('opacity', 1)
    .attr('r', '5px');

  // Then and now image button
  const $thenNowButton = $('<img/>')
    .addClass('then-now-button')
    .attr('src', `images/then-now/${selectedThenNow.thumbFilename}`)
    .css('width', 0)
    .css('height', 0)
    .css('left', (transX))
    .css('top', (point[1]))
    .attr('id', `then-now-${selectedThenNow._id}`)

  let labelWidth = 225;
  let labelLeft = (buttonPosX - 20);
  if (selectedThenNow.place === 'Saint Anthony Falls') {
    labelWidth = 275;
    labelLeft = (buttonPosX - 60);
  }

  let labelRotation = _.sample(['-3', '3']);
  const $placeLabelText = $('<div/>')
    .addClass('then-now-label-text')
    .css({ transform: `rotate(${labelRotation}deg)` })
    .css('left', labelLeft)
    .css('top', buttonPosY + 155)
    .css('width', labelWidth)
    .css('height', 85)
    .html(`${selectedThenNow.place}<br/>Then & Now`);

  // Animate in
  setTimeout(() => {
    // Draw line
    thenGroup.append('line')
      .attr('x1', transX)
      .attr('y1', point[1])
      .attr('x2', transX)
      .attr('y2', point[1])
      .attr('opacity', 0)
      .classed('map-line', true)
      .transition()
      .duration(300)
      .attr('x1', buttonPosX + (175 / 2))
      .attr('y1', buttonPosY + (175 / 2))
      .attr('opacity', 1);
    $('#then-now')
      .fadeIn(dur.default)
      .append($thenNowButton)
      .append($placeLabelText);
    $placeLabelText
      .animate({
        opacity: 1,
      }, 500);

    $thenNowButton
      .animate({
        left: buttonPosX,
        top: buttonPosY,
        width: 175,
        height: 175,
      }, dur.default);
  }, 1000);
}

