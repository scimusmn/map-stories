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
    .append($thenDate)
    .append($nowImage)
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
    // if (!($test).is('.then-now-zoom-image')) {
    //   hideZoomThenNow(this, state);
    // }
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

