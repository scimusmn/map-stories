import { appSizes, appDurations } from '/imports/ui/helpers/settings';
import _ from 'lodash';

const sizes = appSizes();
const dur = appDurations();

/**
 * Hide the zoom image
 *
 * @param clicked
 * @param state
 */
export function hideZoomImage(clicked, state) {
  $('.zoom-image-container')
    .fadeOut(dur.default, function () {
      $(this)
        .remove();
    });
}

/**
 * Show the zoom image
 *
 * @param clicked
 * @param state
 */
export function zoomImage(clicked, state) {

  let selectedHighlightImage = _.find(state.images, function (image) {
    return image.slug == clicked.id.replace('highlighted-', '');
  });

  // Fit the image on the screen by max height
  var imageWidth = selectedHighlightImage.width;
  var imageHeight = selectedHighlightImage.height;
  var imageTopMargin = sizes.zoomTopMargin;
  var maxZoomHeight = (sizes.screenHeight - (sizes.zoomTopMargin * 2));
  console.log(maxZoomHeight);
  console.log('----^ ^ ^ ^ ^ maxZoomHeight ^ ^ ^ ^ ^----');
  if (selectedHighlightImage.height >= maxZoomHeight) {
    imageWidth = (imageWidth * maxZoomHeight) / imageHeight;
    imageHeight = maxZoomHeight;
  } else {
    imageTopMargin = ((sizes.screenHeight - imageHeight) / 2);
  }

  var imageLeftMargin = ((sizes.screenWidth - imageWidth) / 2);

  // Define image
  var $zoomImage = $('<img/>')
    .attr('height', imageHeight)
    .addClass('zoom-image')
    .attr('src', 'images/collection/' + selectedHighlightImage.filename);

  // Define close button
  let $zoomClose = $('<i/>')
    .addClass('fa fa-times ')
    .attr('aria-hidden', 'true');

  let $zoomImageCloseContainer = $('<div/>')
    .addClass('zoom-image-close-container')
    .css('margin-left', imageLeftMargin)
    .css('margin-top', imageTopMargin)
    .css('width', imageWidth)
    .css('height', imageHeight);

  // Add image to page
  var $zoomImageContainer = $('<div/>')
    .addClass('zoom-image-container')
    .hide();
  $($zoomImageCloseContainer)
    .append($zoomImage)
    .append($zoomClose);
  $($zoomImageContainer)
    .append($zoomImageCloseContainer);
  $('body')
    .append($zoomImageContainer);
  $($zoomImageContainer)
    .fadeIn(dur.default);

}

export function zoomThenNow(clicked, state) {
  const selectedThenNow = _.find(state.thenNow, (thenNowImage) => {
    return thenNowImage._id === clicked.id.replace('then-now-', '');
  });

  // Fit the image on the screen by max height
  var imageWidth = selectedThenNow.width;
  var imageHeight = selectedThenNow.height;
  var imageTopMargin = sizes.zoomTopMargin;
  var maxZoomHeight = (sizes.screenHeight - (sizes.zoomTopMargin * 2));
  if (selectedThenNow.height >= maxZoomHeight) {
    imageWidth = (imageWidth * maxZoomHeight) / imageHeight;
    imageHeight = maxZoomHeight;
  } else {
    imageTopMargin = ((sizes.screenHeight - imageHeight) / 2);
  }
  var thenNowRatio = selectedThenNow.width / selectedThenNow.height;
  var thenNowWidth = thenNowRatio * imageHeight;
  console.log(thenNowWidth);
  console.log('----^ ^ ^ ^ ^ thenNowWidth ^ ^ ^ ^ ^----');
  if (thenNowWidth > 1820) {
    imageHeight = (1820 / thenNowRatio);
    imageWidth = 1820;
  }

  var imageLeftMargin = ((sizes.screenWidth - imageWidth) / 2);

  // Define the Then image
  var $thenImage = $('<img/>')
    .attr('height', imageHeight)
    .addClass('then-zoom-image')
    .addClass('then-now-zoom-image')
    .attr('draggable', false)
    .attr('src', 'images/then-now/' + selectedThenNow.thenFilename);
  const imageMiddle = (imageWidth / 2);
  var $nowImage = $('<img/>')
    .attr('height', imageHeight)
    .addClass('now-zoom-image')
    .addClass('then-now-zoom-image')
    .attr('draggable', false)
    .css('clip', `rect(0px, ${imageWidth}px, ${imageHeight}px, ${imageMiddle}px)`)
    .attr('src', 'images/then-now/' + selectedThenNow.nowFilename);

  var $thenDate = $('<div/>')
    .addClass('then-date')
    .html(selectedThenNow.thenYear);

  var $nowDate = $('<div/>')
    .addClass('now-date')
    .html(selectedThenNow.nowYear);

  // Define close button
  let $thenNowZoomClose = $('<i/>')
    .addClass('fa fa-times ')
    .attr('aria-hidden', 'true');

  let $thenNowZoomCloseContainer = $('<div/>')
    .addClass('then-now-zoom-image-close-container')
    .attr('id', 'then-now-zoom-slider')
    .css('margin-left', imageLeftMargin)
    .css('margin-top', imageTopMargin)
    .css('width', imageWidth)
    .css('height', imageHeight);

  // Add image to page
  var $thenNowImageContainer = $('<div/>')
    .addClass('then-now-zoom-image-container')
    .hide();
  $($thenNowZoomCloseContainer)
    .append($thenImage)
    .append($nowImage)
    .append($thenDate)
    .append($nowDate)
    .append($thenNowZoomClose);
  $($thenNowImageContainer)
    .append($thenNowZoomCloseContainer);
  $('#then-now')
    .append($thenNowImageContainer);
  $($thenNowImageContainer)
    .fadeIn(dur.default);

  document.getElementById('then-now-zoom-slider');
  document.addEventListener('mousemove', function(e) {
    const $test = $(e.target);
    if (($test).is('.then-now-zoom-image')) {
      const mouseX = e.pageX - $test.offset().left;

      const imgW = $('.now-zoom-image').outerWidth();
      const imgH = $('.now-zoom-image').outerHeight();

      $('.now-zoom-image')
        .css('clip', `rect(0px, ${imgW}px, ${imgH}px, ${mouseX}px)`);
    }
  });
}

/**
 * Hide the zoom then now
 */
export function hideZoomThenNow(clicked, state) {
  $('.then-now-zoom-image-container')
    .fadeOut(dur.default, function () {
      $(this)
        .remove();
    });
}

/**
 * Play Dakota audio content
 */
export function playDakota(clicked, state) {
  const $clickedLabel = $(clicked).closest('.dakota-label-text');

  const selectedDakota = _.find(state.dakota, (dakotaPlace) => {
    return dakotaPlace._id === $clickedLabel[0].id.replace('dakota-', '');
  });

  const $dakotaContainer = $('<div/>')
    .addClass('dakota-container');

  const $dakotaStage = $('<div/>')
    .attr('id', `dakota-stage-${selectedDakota.slug}`)
    .addClass('dakota-stage');

  const $close = $('<i/>')
    .addClass('fa fa-times ')
    .attr('aria-hidden', 'true');

  const $dakotaVideoTag = $('<video/>')
    .attr('id', `dak-vid-${selectedDakota._id}`)
    .attr('src', `video/${selectedDakota.nameFilename}`)
    .css('transform', 'rotateY(180deg)')
    .attr('width', 640)
    .attr('height', 480);

  const $englishVideoTag = $('<video/>')
    .attr('id', `eng-vid-${selectedDakota._id}`)
    .attr('src', `video/${selectedDakota.explainFilename}`)
    .attr('width', 640)
    .attr('height', 480);

  const $dakotaVideoStage = $('<div/>')
    .addClass('dakota-video-stage');

  const $dakotaWord = $('<div/>')
    .addClass('dakota-title-word')
    .addClass('dakota-title')
    .html(selectedDakota.dakotaPlaceName);

  $dakotaVideoStage
    .append($dakotaVideoTag);

  const $englishVideoStage = $('<div/>')
    .addClass('english-video-stage');

  const $englishWord = $('<div/>')
    .addClass('dakota-title-word')
    .html(selectedDakota.englishPlaceName);

  const $englishDesc = $('<p/>')
    .addClass('dakota-description')
    .html(selectedDakota.description);

  $englishVideoStage
    .append($englishVideoTag);

  const $stageTitle = $('<div/>')
    .addClass('dakota-stage-title')
    .html('What do the Dakota people call these places along the Mississippi?');

  $dakotaStage
    .append($stageTitle)
    .append($dakotaVideoStage)
    .append($englishVideoStage)
    .append($dakotaWord)
    .append($englishWord)
    .append($englishDesc)
    .append($close);

  $dakotaContainer
    .append($dakotaStage);

  $('#dakota-place-names')
    .append($dakotaContainer);

  // Play Dakota word
  $(`#dak-vid-${selectedDakota._id}`)[0].play();

  // When that ends play the English explanation
  const dakVideo = document.getElementById(`dak-vid-${selectedDakota._id}`);
  dakVideo.onended = function() {
    console.log('playing english');
    const $posterImage = $('<img/>')
      .attr('src', 'video/name.jpg');
    $('.dakota-video-stage')
      .children()
      .fadeOut(dur.default);
    $('.dakota-video-stage')
      .append($posterImage)
      .hide()
      .fadeIn(dur.default);
    $(`#eng-vid-${selectedDakota._id}`)[0].play();
  };

}

export function hideDakota(clicked, state) {
  $('.dakota-container')
    .fadeOut(dur.default, function () {
      $(this)
        .remove();
    });
}

