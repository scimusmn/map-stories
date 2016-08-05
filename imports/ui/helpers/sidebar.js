import { appSizes, appDurations } from '/imports/ui/helpers/settings';

const sizes = appSizes();
const dur = appDurations();

export function expandSidebar(state, selectedPlace, selectedPlaceImageId) {
  let $mapSidebar = $('#map-sidebar');

  // Fade out default heading
  $mapSidebar.find('h3#default-heading')
    .fadeOut(dur.default, function () {

      // Populate place heading
      $mapSidebar.find('h3#place-heading')
        .html(selectedPlace.name);

      // Populate main image
      let selectedPlaceImage = _.find(state.images, function (image) {
        return image.slug == selectedPlaceImageId;
      });

      let $highlightImg = $('<img/>')
        .addClass('image-highlight')
        .attr('height', sizes.highlightHieght)
        .attr('src', 'images/collection/' + selectedPlaceImage.filename);
      $('#image-content')
        .append($highlightImg);

      // Populate main text block
      let desc = _.each(selectedPlaceImage.desc, function (paragraph) {
        let $paragraph = $('<p/>')
          .html(paragraph);
        $('#text-content')
          .append($paragraph);
      });

      // Fade in location content
      $('#location-content')
        .fadeIn(dur.default);

      // Expand the sidebar width
      $('#map-sidebar, #map-sidebar-background')
        .animate({
          width: sizes.infoWidthExpanded,
        }, dur.default, function () {
          $('#image-thumbnails')
            .animate({
              bottom: 0,
            }, dur.default);
        });

    });


  // Thumbnails bar
  let placeImages = _.filter(state.images, function (o) {
    return o.place == selectedPlace.name;
  });

  _.each(placeImages, function (image) {

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
    .fadeOut((dur.default / 2), function () {

      // After fade out empty all the divs
      $('#place-heading, #image-content, #text-content, #image-thumbnails')
        .empty();

      $('#image-thumbnails')
        .animate({
          bottom: ((sizes.thumbHieght + 100) * -1),
        });

      // Slide the sidebar back to homepage default
      $('#map-sidebar, #map-sidebar-background')
        .animate({
          width: sizes.infoWidthCollapsed,
        }, (dur.default / 2), function () {
          // Fade back in the default heading
          let $mapSidebar = $('#map-sidebar');
          $mapSidebar
            .find('h3#default-heading')
            .fadeIn(dur.default);
        });

    });
}

/**
 * Set up the sidebar on the initial render
 *
 * Start with sidebar collapsed. Set sizes and animation durations
 */
export function drawSidebar() {
  // Set sidebar to default homepage width
  $('#map-sidebar, #map-sidebar-background')
    .css('width', sizes.infoWidthCollapsed);

  // Hide the div that we will place our detail content into
  // This make it easier to fade in on transition
  $('#location-content')
    .hide();

  $('#image-thumbnails')
    .css('bottom', (sizes.thumbHieght + 100) * -1)
    .css('height', (sizes.thumbHieght + 100));
}
