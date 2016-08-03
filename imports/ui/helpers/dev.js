/**
 * Draw county boundaries on map
 *
 * We use this in development to align the raster and vector layers.
 *
 * @param  {object} el Top level react DOM parent for our SVG elements
 * @param  {object} props React component properties, contains chart details
 * @param  {object} projection D3 map projection object
 */
export function drawCounties(el, props, projection) {

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
    //noinspection JSUnresolvedVariable
    mapG.append('path')
      .datum(topojson.feature(counties, counties.objects.counties))
      .attr('d', path)
      .attr('class', 'states');
  });
}

