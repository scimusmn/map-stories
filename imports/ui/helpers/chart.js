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

  // Set up map projection
  var projection = d3.geo.mercator()
      .scale(settings.mapScale)
      .center([settings.mapX, settings.mapY])
      .precision(0.1);

  // Draw county boundaries
  var path = d3.geo.path().projection(projection);
  var mapG = d3.select(el).selectAll('.d3-map');
  d3.json('/data/counties.json', function (error, counties) {
    mapG.append('path')
    .datum(topojson.feature(counties, counties.objects.counties))
    .attr('d', path)
    .attr('class', 'states');
  });

  // Draw points at each location
  var pointG = d3.select(el).selectAll('.d3-points');
  var point = pointG.selectAll('dot')
      .data(places)
    .enter().append('circle')
      .attr('cx', function (d) { return projection([d.long, d.lat])[0]; })
      .attr('cy', function (d) { return projection([d.long, d.lat])[1]; })
      .attr('r', '8px')
      .attr('fill', 'red');
};

export default d3Chart;
