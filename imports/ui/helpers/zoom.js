import { appSizes, appDurations } from '/imports/ui/helpers/settings';

const sizes = appSizes();
const dur = appDurations();

export function hideZoomImage(clicked, state) {
  $('.zoom-image-container')
    .remove();
}

export function zoomImage(clicked, state) {

  let selectedHighlightImage = _.find(state.images, function (image) {
    return image.slug == clicked.id.replace('highlighted-', '');
  });

  // Fit the image on the screen by max height
  var imageHeight = selectedHighlightImage.height;
  var maxZoomHeight = (sizes.screenHeight - (sizes.zoomTopMargin * 2));
  console.log(maxZoomHeight);
  console.log('----^ ^ ^ ^ ^ maxZoomHeight ^ ^ ^ ^ ^----');
  if (selectedHighlightImage.height > maxZoomHeight) {
    imageHeight = maxZoomHeight;
  }

  // Define image
  var $zoomImage = $('<img/>')
    .attr('height', imageHeight)
    .css('margin-top', sizes.zoomTopMargin)
    .addClass('zoom-image')
    .attr('src', 'images/collection/' + selectedHighlightImage.filename);

  // Add image to page
  var $zoomImageContainer = $('<div/>')
    .addClass('zoom-image-container');
  $($zoomImageContainer)
    .append($zoomImage);
  $('body')
    .append($zoomImageContainer);

}
