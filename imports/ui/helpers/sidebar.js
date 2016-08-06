import { appSizes, appDurations } from '/imports/ui/helpers/settings';

const sizes = appSizes();
const dur = appDurations();

export function expandSidebar(state, selectedPlace, selectedPlaceImageId) {
  let $mapSidebar = $('#map-sidebar');

  let selectedPlaceImage = _.find(state.images, function (image) {
    return image.slug == selectedPlaceImageId;
  });

  // Fade out default heading
  $mapSidebar.find('h3#default-heading')
    .fadeOut(dur.default, function () {

      // Populate place heading
      $mapSidebar.find('h3#place-heading')
        .html(selectedPlace.name);

      // Populate main image
      let $highlightImg = $('<img/>')
        .addClass('image-highlight')
        .attr('height', sizes.highlightMaxHeight)
        .attr('src', 'images/collection/' + selectedPlaceImage.filename);
      $('#highlighted-image')
        .prepend($highlightImg);

      // Populate image caption
      $('#caption-content')
        .html(selectedPlaceImage.caption);

      // Populate image credit
      $('#credit-content')
        .html(selectedPlaceImage.credit);

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
          left: (sizes.screenWidth - sizes.infoWidthExpanded),
        }, dur.default, function () {
          $('#dock')
            .animate({
              bottom: 0,
            }, dur.default);
        });

    });

  // Thumbnails bar - Dock
  let placeImages = _.filter(state.images, function (o) {
    return o.place == selectedPlace.name;
  });

  _.each(placeImages, function (image) {


    // Random rotation for dock images
    let randomRotation = _.random(0, 2, true) -1;

    let $thumbDiv = $('<div/>')
      .empty()
      .css('transform', 'rotate(' + randomRotation + 'deg)');

    let $thumbImg = $('<img/>')
      .empty()
      .attr('id', 'dock-' + image.slug)
      .addClass('image-thumbnail')
      .attr('height', sizes.thumbHieght)
      .attr('src', 'images/collection/' + image.filename);

    // Identify the active image in the dock
    if (image.slug == selectedPlaceImage.slug) {
      $thumbDiv
        .addClass('active');
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
      $('#image-content img')
        .remove();

      $('#dock')
        .animate({
          bottom: ((sizes.dockHeight) * -1),
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
    .css('bottom', (sizes.dockHeight) * -1)
    .css('height', (sizes.dockHeight))
    .addClass('other');

}
