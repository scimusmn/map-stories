
// Set up map projection
export function mapProjection(settings) {
  return d3.geo.mercator()
    .scale(settings.mapScale)
    .center([settings.mapX, settings.mapY])
    .precision(0.1);
}
