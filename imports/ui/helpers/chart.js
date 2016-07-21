var d3Chart = {};

/**
 * Create the D3 chart object
 */
d3Chart.create = function (el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  // Add a group for the map
  svg.append('g')
      .attr('class', 'd3-map');

  // Add a group for the points
  svg.append('g')
      .attr('class', 'd3-points');

  this._drawMap(el, state);
};

/**
 * Update the D3 chart when the React props change
 */
d3Chart.update = function (el, state) {
  const mapPath = d3.select('path.states');
  mapPath.remove();
  this._drawMap(el, state);
};

d3Chart.destroy = function (el) {
  // Clean up chart
};

d3Chart._drawMap = function (el, state) {
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
    drawCounties(el, projection);
  }

  _.each(places, function (place) {
    // Find the images for this location
    const placeImages = _.filter(images, function (o) {
      if (o.place == place.name) {
        return true;
      }
    });

    // Select a random image
    const placeImage = _.sample(placeImages);

    // Draw map dots, for each location
    drawDot(el, projection, place);

    // Draw the location labels and images
    drawPlace(el, projection, place, placeImage);
  });

};

/**
 * Draw individual location dot
 *
 * We draw this seperately since we don't want any other transformations to
 * move the lat/long based map dot.
 *
 * @param  {object} el Top level react DOM parent for our SVG elements
 * @param  {object} projection D3 map projection object
 * @param  {object} place Place object data from Meteor
 */
function drawDot(el, projection, place) {
  var placeGroup = d3.select(el).selectAll('.d3-points')
    .append('g')
    .classed('place-dot', true);
  placeGroup.append('circle')
    .attr('r', '10px')
    .classed('map-dot', true);
  translateX = projection([place.long, place.lat])[0];
  translateY = projection([place.long, place.lat])[1];
  placeGroup.attr('transform', 'translate(' + translateX + ',' + translateY + ')');
}

/**
 * Draw individual location label group
 *
 * Draw the text label, picture, and clickable box near each location dot
 *
 * @param  {object} el Top level react DOM parent for our SVG elements
 * @param  {object} projection D3 map projection object
 * @param  {object} place Place object data from Meteor
 */
function drawPlace(el, projection, place, placeImage) {
  groupWidth = 300;
  groupHeight = 100;
  var placeGroup = d3.select(el).selectAll('.d3-points')
    .append('g')
    .classed('place-group', true);

  // Drop shadow
  placeGroup.append('defs')
    .append('filter')
    .attr('id', 'blur')
    .append('feGaussianBlur')
    .attr('stdDeviation', 5);
  placeGroup.append('rect')
    .attr('width', groupWidth)
    .attr('height', groupHeight)
    .attr('opacity', '1')
    .attr('x', 3)
    .attr('y', 3)
    .style('fill', '#000')
    .attr('filter', 'url(#blur)');

  var defs = placeGroup.append('svg:defs');

  defs.append('svg:pattern')
    .attr('id', placeImage.slug)
    .attr('width', 400)
    .attr('height', 200)
    .attr('patternUnits', 'userSpaceOnUse')
    .append('svg:image')
    .attr('xlink:href', '/images/collection/' + placeImage.filename)
    .attr('width', 400)
    .attr('height', 200)
    .attr('x', 0)
    .attr('y', 0);

  // White box
  var placeGroupRect = placeGroup.append('rect')
    .attr('width', groupWidth + 'px')
    .attr('height', groupHeight + 'px')
    // .classed('map-box', true)
    .attr('fill', 'url(#' + placeImage.slug + ')');

  // Apply the background image as a pattern for the rectangle

  // Label
  placeGroup.append('text')
    .text(place.name)
    .attr('x', '20px')
    .attr('y', '40px')
    .attr('font-family', 'national-medium')
    .attr('font-size', '40px')
    .attr('fill', 'black')
    .attr('stroke-width', 1.5)
    .attr('stroke', '#000');

  // Move group into position
  let translateX = projection([place.long, place.lat])[0] + place.offsetX;
  let translateY = projection([place.long, place.lat])[1] + place.offsetY;
  if (place.alignH == 'right') {
    translateX = translateX - groupWidth;
  }

  placeGroup.attr('transform', 'translate(' + translateX + ',' + translateY + ')');
}

function oldPlace() {

  var point = pointG.selectAll('dot')
  .data(places)
  .enter().append('circle')
  .attr('cx', function (d) { return projection([d.long, d.lat])[0]; })
  .attr('cy', function (d) { return projection([d.long, d.lat])[1]; })
  .attr('r', '8px')
  .attr('fill', 'red');

  var squares = pointG.selectAll('squares')
  .data(places)
  .enter().append('rect')
  .attr('x', function (d) {
    var x = projection([d.long, d.lat])[0];
    return x + d.offsetX;
  })
  .attr('y', function (d) {
    return 0;
  })
  .attr('width', '40px')
  .attr('height', '40px')
  .attr('fill', function (d) {
    if (d.color) {
      return d.color;
    } else {
      return 'orange';
    }
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
function drawCounties(el, projection) {
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
