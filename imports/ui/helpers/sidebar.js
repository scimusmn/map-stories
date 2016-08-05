import { appSizes, appDurations } from '/imports/ui/helpers/settings';

const sizes = appSizes();
const dur = appDurations();

export function expandSidebar(state, selectedPlace, selectedPlaceImageId) {
  // Sidebar heading
  let $mapSidebar = $('#map-sidebar');
  $mapSidebar.find('h3#place-heading')
    .html(selectedPlace.name)
    .show();
  $mapSidebar.find('h3#default-heading')
    .hide();

  // Expand the sidebar width
  $('#map-sidebar, #map-sidebar-background')
    .css('width', sizes.infoWidthExpanded);

  $('#location-content')
    .animate({
      opacity: 100,
    });

  // Main image
  let selectedPlaceImage = _.find(state.images, function(image) {
    return image.slug == selectedPlaceImageId;
  });

  let $highlightImg = $('<img/>')
    .empty()
    .addClass('image-highlight')
    .attr('height', sizes.highlightHieght)
    .attr('src', 'images/collection/' + selectedPlaceImage.filename);
  $('#image-content')
    .append($highlightImg);

  let $highlightText = $('<p/>')
    .empty()
    .addClass('text-highlight')
    .html('Lorem ipsum');
  $('#text-content')
    .append($highlightText);

  // Thumbnails bar
  let placeImages = _.filter(state.images, function(o) {
    return o.place == selectedPlace.name;
  });

  _.each(placeImages, function(image) {

    let $thumbDiv = $('<img/>')
      .empty()
      .addClass('image-thumbnail')
      .attr('height', sizes.thumbHieght)
      .attr('src', 'images/collection/' + image.filename);

    $('#image-thumbnails')
      .append($thumbDiv);

  });
}

export function collapseSidebar() {
  // Fade out sidebar content
  $('#location-content')
    .animate({
      opacity: 0,
    }, 200, function () {
      $('#image-content, #image-thumbnails, #text-content')
        .empty();
    });

  // Resize the sidebar
  $('#map-sidebar, #map-sidebar-background')
    .css('width', sizes.infoWidthCollapsed);

}

/**
 * Set up the sidebar on the initial render
 *
 * Start with sidebar collapsed. Set sizes and animation durations
 */
export function drawSidebar() {
  $('#map-sidebar, #map-sidebar-background')
    .animate({
      width: sizes.infoWidthCollapsed,
    }, dur.sidebarSlide);

  $('#image-thumbnails')
    .css('height', (sizes.thumbHieght + 100));
}
