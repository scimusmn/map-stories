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

  console.log(selectedHighlightImage);
  console.log('----^ ^ ^ ^ ^ selectedHighlightImage ^ ^ ^ ^ ^----');

  console.log(state);
  console.log('----^ ^ ^ ^ ^ state ^ ^ ^ ^ ^----');

  var $zoomImageContainer = $('<div/>')
    .addClass('zoom-image-container');

  var $zoomImage = $('<img/>')
    .addClass('zoom-image')
    .attr('src', 'images/collection/' + selectedHighlightImage.filename);

  $($zoomImageContainer)
    .append($zoomImage);
  $('body')
    .append($zoomImageContainer);

  //
  // $('.container')
  //   .append($overlayShade)
  //   .animate({
  //     opacity: .5,
  //   }, dur.default);
  //
  // $($overlayShade)
  //   .append($zoomImage);

}
