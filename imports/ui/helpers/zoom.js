import { appSizes, appDurations } from '/imports/ui/helpers/settings';

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
  var imageHeight = selectedHighlightImage.height;
  var imageTopMargin = sizes.zoomTopMargin;
  var maxZoomHeight = (sizes.screenHeight - (sizes.zoomTopMargin * 2));
  console.log(maxZoomHeight);
  console.log('----^ ^ ^ ^ ^ maxZoomHeight ^ ^ ^ ^ ^----');
  if (selectedHighlightImage.height >= maxZoomHeight) {
    imageHeight = maxZoomHeight;
  } else {
    imageTopMargin = ((sizes.screenHeight - imageHeight) / 2);
  }

  // Define image
  var $zoomImage = $('<img/>')
    .attr('height', imageHeight)
    .css('margin-top', imageTopMargin)
    .addClass('zoom-image')
    .attr('src', 'images/collection/' + selectedHighlightImage.filename);

  // Add image to page
  var $zoomImageContainer = $('<div/>')
    .addClass('zoom-image-container')
    .hide();
  $($zoomImageContainer)
    .append($zoomImage);
  $('body')
    .append($zoomImageContainer);
  $($zoomImageContainer)
    .fadeIn(dur.default);

}
