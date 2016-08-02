var d3Chart = {};

/**
 * Create the D3 chart object
 */
d3Chart.create = function (el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  // Add a group for the points
  svg.append('g')
      .attr('class', 'd3-points');

  this._drawMap(el, props, state);
};

/**
 * Update the D3 chart when the React props change
 */
d3Chart.update = function (el, props, state) {
  const mapPath = d3.select('path.states');
  mapPath.remove();
  this._drawMap(el, props, state);
};

d3Chart.destroy = function (el) {
  // Clean up chart
};

d3Chart._drawMap = function (el, props, state) {
  var places = state.places;
  var images = state.images;
  var settings = state.settings;

  // Set up map projection
  var projection = d3.geo.mercator()
      .scale(settings.mapScale)
      .center([settings.mapX, settings.mapY])
      .precision(0.1);

  // Draw county boundaries in dev mode
  if (Meteor.settings.public.dev == 'true') {
    drawCounties(el, props, projection);
  }

  _.each(_.shuffle(places), function (place, i) {
    setTimeout(
      function () {
        // Find the images for this location
        const placeImages = _.filter(images, function (o) {
          if (o.place == place.name) {
            return true;
          }
        });

        // Select a random image
        const placeImage = _.sample(placeImages);

        // Image width
        const maxWidth = 200;

        // Line delay
        // Time for the image to fade in, before drawing line
        const picDur = 400;

        // Line animation duration
        const lineDur = 1200;

        // Draw the location labels and images
        drawPlace(projection, place, placeImage, maxWidth, picDur);

        // Wait for the images to load before drawing map points
        setTimeout(function () {
          // Draw map dots, for each location
          drawLine(el, projection, place, maxWidth, i, lineDur);

          // Draw map dots, for each location
          drawDot(el, projection, place, maxWidth, i, lineDur);

        }, picDur);
      },
    1000 * i);

  });

  $('.place-label').click(function (e) {
    var $clickedId = $(this).attr('id');
    window.location.href = '/place/' + $clickedId;
  });

  var items = document.getElementsByClassName('place-label')[0];
};

/**
 * Draw a line between the dot and the picture
 *
 * This helps people know which picture goes with which spot
 *
 * @param el Parent SVG element
 * @param projection
 * @param place
 * @param maxWidth
 */
function drawLine(el, projection, place, maxWidth, i, dur) {
  var placeGroup = d3.select(el).selectAll('.d3-points')
    .append('g')
    .classed('place-line', true);
  var line = linePoints(projection, place, maxWidth);

  placeGroup.append('line')
    .attr('x1', line.x2)
    .attr('y1', line.y2)
    .attr('x2', line.x2)
    .attr('y2', line.y2)
    .classed('map-line', true)
      .transition()
        .duration(dur)
        .delay(i * 30)
        .attr('x1', line.x1)
        .attr('y1', line.y1);
}

function linePoints(projection, place, maxWidth) {
  var line = {};
  line.x1 = projection([place.long, place.lat])[0];
  line.y1 = projection([place.long, place.lat])[1];
  line.x2 = line.x1 + place.offsetX + (maxWidth / 2);
  line.y2 = line.y1 + place.offsetY + (maxWidth / 2);
  return line;
}

/**
 * Draw individual location dot
 *
 * We draw this separately since we don't want any other transformations to
 * move the lat/long based map dot.
 *
 * @param  {object} el Top level react DOM parent for our SVG elements
 * @param  {function} projection D3 map projection object
 * @param  {object} place Place object data from Meteor
 */
function drawDot(el, projection, place, maxWidth, i, dur) {
  var placeGroup = d3.select(el).selectAll('.d3-points')
    .append('g')
    .classed('place-dot', true);
  placeGroup.append('circle')
    .attr('r', '5px')
    .classed('map-dot', true);

  var line = linePoints(projection, place, maxWidth);
  placeGroup.attr('transform', 'translate(' + line.x2 + ',' + line.y2 + ')');
  placeGroup
    .transition()
    .duration(dur)
    .delay(i * 30)
    .attr('transform', 'translate(' + line.x1 + ',' + line.y1 + ')');

}

/**
 * Draw individual location label group
 *
 * Draw the text label, picture, and click-able box near each location dot
 *
 * @param  {function} projection D3 map projection object
 * @param  {object} place Place object data from Meteor
 * @param  {object} placeImage TODO: add description
 * @param  {object} maxWidth Maximum width for the image
 * @param  {int} picDur Miliseconds for the fade in animation
 */
function drawPlace(projection, place, placeImage, maxWidth, picDur) {
  let translateX = projection([place.long, place.lat])[0] + place.offsetX;
  let translateY = projection([place.long, place.lat])[1] + place.offsetY;

  // Parent group div for picture and the labels
  var xStyle = ['left', translateX + 'px'];
  var yStyle = ['top', translateY + 'px'];

  var $newDiv = $('<div/>')
   .attr('id', place.slug)
   .addClass('place-label')
   .css(yStyle[0], yStyle[1])
   .css(xStyle[0], xStyle[1]);

  var backgroundImage = '/images/collection/' + placeImage.filename;

  let displayDimension = placeImage.width;
  if (placeImage.width >= maxWidth) {
    displayDimension = maxWidth;
  }

  var $placeLabelBackground = $('<div/>')
    .addClass('place-label-background')
    .css('background-image', 'url(' + backgroundImage + ')')
    .css('width', displayDimension + 'px')
    .css('height', displayDimension + 'px');

  var $placeLabelText = $('<div/>')
    .addClass('place-label-text')
    .html(place.name);

  $placeLabelBackground.append($placeLabelText);
  $newDiv.append($placeLabelBackground);
  $('.Chart').append($newDiv);

  $newDiv.animate({
    opacity: 1,
  }, picDur, function() {
    console.log('Animation complete');
  });
}

/**
 * Draw county boundaries on map
 *
 * We use this in development to align the raster and vector layers.
 *
 * @param  {object} el Top level react DOM parent for our SVG elements
 * @param  {object} projection D3 map projection object
 */
function drawCounties(el, props, projection) {

  var svg = d3.select(el).append('svg')
    .attr('class', 'd3-dev')
    .attr('width', props.width)
    .attr('height', props.height);

  // Add a group for the map
  svg.append('g')
    .attr('class', 'd3-map');

  var path = d3.geo.path().projection(projection);
  var mapG = d3.select(el).selectAll('.d3-map');
  d3.json('/data/counties.json', function (error, counties) {
    mapG.append('path')
    .datum(topojson.feature(counties, counties.objects.counties))
    .attr('d', path)
    .attr('class', 'states');
  });
}

export default d3Chart;
