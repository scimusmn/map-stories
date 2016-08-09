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

      // Populate image caption
      if (selectedPlaceImage.caption != '') {
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
      _.each(selectedPlaceImage.desc, function (paragraph) {
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
  if (sumWidths > sizes.dockWidth) {
    thumbHeight = Math.floor(sizes.thumbHieght * dimensionMultiplier);
  }

  _.each(placeImages, function (image) {

    // If we're going to shrink images, push them down so that they still
    // hit the bottom of the dock
    var marginTop = 0;
    if (dimensionMultiplier < 1) {
      marginTop = Math.floor(40 * (1 / dimensionMultiplier));
    }

    // Dock Image container
    let $thumbDiv = $('<div/>')
      .css('margin-left', Math.floor(sizes.dockMargin * dimensionMultiplier))
      .css('margin-right', Math.floor(sizes.dockMargin * dimensionMultiplier))
      .css('margin-top', marginTop)
      .css('margin-bottom', 0)
      .empty();

    // Thumbnail image
    let $thumbImg = $('<img/>')
      .empty()
      .attr('id', 'dock-' + image.slug)
      .addClass('image-thumbnail')
      .attr('height', thumbHeight)
      .attr('src', 'images/collection/' + image.filename);

    // Identify the active image in the dock
    if (image.slug == selectedPlaceImage.slug) {
      $thumbImg
        .addClass('active')
        .css('opacity', .5);
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
    .css('padding-left', (sizes.dockLeftPadding))
    .addClass('other');

}

export function highlightImage(clicked, state) {
  let selectedDockImage = _.find(state.images, function (image) {
    return image.slug == clicked.id.replace('dock-', '');
  });

  $('#image-content, #text-content')
    .fadeOut((dur.default / 2), function () {

      // Replace image and text content
      $('#text-content')
        .empty();
      _.each(selectedDockImage.desc, function (paragraph) {
        let $paragraph = $('<p/>')
          .html(paragraph);
        $('#text-content')
          .append($paragraph);
      });

      $('#credit-content')
        .html(selectedDockImage.credit);

      if (selectedDockImage.caption != '') {
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
      opacity: '1',
    }, dur.default, function () {
      $(this)
        .css('opacity', '1');
    });

  $('#dock-' + selectedDockImage.slug)
    .addClass('active')
    .css('opacity', 1)
    .animate({
      opacity: '.5',
    }, dur.default);

  // TODO: Figure out a way to animate box-shadow
  // Changing the box shadow without an animated transition is distracting
  // None of the jquery plugins seem to work properly.
  // .css('box-shadow', '6px 6px 20px #222222')
  // .css('box-shadow', 'none');

}
