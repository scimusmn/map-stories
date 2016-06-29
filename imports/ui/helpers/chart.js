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

  this._drawMap(el, state.settings, state.data);

  // this.update(el, state);
};

/**
 * Update the D3 chart when the data changes
 */
d3Chart.update = function (el, state) {
  // Re-compute the scales, and render the data points
  // var scales = this._scales(el, state.domain);
  // this._drawMap(el, scales, state.settings, state.data);
  // this._drawPoints(el, scales, state.data);
  const mapPath = d3.select('path.states');
  mapPath.remove();
  this._drawMap(el, state.settings, state.data);
};

d3Chart._scales = function (el, domain) {
  if (!domain) {
    return null;
  }

  var width = el.offsetWidth;
  var height = el.offsetHeight;

  var x = d3.scale.linear()
    .range([0, width])
    .domain(domain.x);

  var y = d3.scale.linear()
    .range([height, 0])
    .domain(domain.y);

  var z = d3.scale.linear()
    .range([5, 20])
    .domain([1, 10]);

  return { x: x, y: y, z: z };
};

d3Chart.destroy = function (el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};

d3Chart._drawMap = function (el, settings, data) {
  var projection = d3.geo.mercator()
      .scale(settings.mapScale)
      .center([settings.mapX, settings.mapY])
      .precision(0.1);
  var path = d3.geo.path()
    .projection(projection);

  var g = d3.select(el).selectAll('.d3-map');

  /**
   * Solid state polygon.
   * Only really useful for positioning the wiggly part of the Colorado
   * River in Mexico.
   */
  d3.json('/data/states.json', function (error, states) {
    g.append('path')
    .datum(topojson.feature(states, states.objects.counties))
    .attr('d', path)
    .attr('class', 'states');
  });

};

d3Chart._drawPoints = function (el, scales, data) {
  var g = d3.select(el).selectAll('.d3-points');

  var point = g.selectAll('.d3-point')
    .data(data, function (d) { return d.id; });

  // ENTER
  point.enter().append('rect')
    .attr('class', 'd3-point');

  // ENTER & UPDATE
  point.attr('x', function (d) { return scales.x(d.x); })
    .attr('y', function (d) { return scales.y(d.y); })
    .attr('width', 50)
    .attr('height', 50);

  // EXIT
  point.exit()
    .remove();
};

export default d3Chart;
