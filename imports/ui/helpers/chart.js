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

  this._drawMap(el, state.places, state.settings, state.data);
  // this._drawPoints(el, state.places, state.settings, state.data);

  // this.update(el, state);
};

/**
 * Update the D3 chart when the React props change
 */
d3Chart.update = function (el, state) {
  const mapPath = d3.select('path.states');
  mapPath.remove();
  this._drawMap(el, state.places, state.settings, state.data);
};

d3Chart.destroy = function (el) {
  // Clean up chart
};

d3Chart._drawMap = function (el, places, settings, data) {
  var projection = d3.geo.mercator()
      .scale(settings.mapScale)
      .center([settings.mapX, settings.mapY])
      .precision(0.1);
  var path = d3.geo.path()
    .projection(projection);

  var g = d3.select(el).selectAll('.d3-map');

  d3.json('/data/counties.json', function (error, counties) {
    g.append('path')
    .datum(topojson.feature(counties, counties.objects.counties))
    .attr('d', path)
    .attr('class', 'states');
  });

  var point = g.selectAll('.d3-points')
    .data(places, function (d) { return d.id; });

  point.enter().append('circle')
    .attr('cx', function (d) {
      const latLong = [d.long, d.lat];
      return projection(latLong)[0];
    })
    .attr('cy', function (d) {
      const latLong = [d.long, d.lat];
      return projection(latLong)[1];
    })
    .attr('r', '8px')
    .attr('fill', 'red');
};

export default d3Chart;
