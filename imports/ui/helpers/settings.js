/**
 * Constants for the application
 */

/**
 * Animation durations
 */
export function appDurations() {
  const dur = {};

  // Stagger base duration, to make the animations happen in delayed sequence
  dur.stagger = 30;

  // Default animation, used in various short item show and hides
  dur.default = 300;
  // dur.default = 900;

  // Slide the sidebar out quickly to make the app feel snappy.
  dur.sidebarSlide = 800;

  // Zoom the map slightly slower so that your eye catches the location translation.
  dur.bgZoom = 1200;

  // Timing for circle bounce
  dur.bounce = 300;

  // Screensaver timeout
  dur.screensaver = 300000;

  return dur;
}

/**
 * Element sizes
 *
 * Returns and object with global sizes and pixel dimensions for animation
 * and positioning.
 */
export function appSizes() {
  const sizes = {};

  // Screen dimensions
  sizes.screenWidth = 1920;
  sizes.screenHeight = 1080;
  sizes.infoWidthCollapsed = 560;
  sizes.infoWidthExpanded = sizes.screenWidth * (19 / 24);

  // Map X translate
  // Fudge factor for the distance to move all the map points
  sizes.zoomTranslate = 400;

  // Image sizes
  sizes.dockLeftPadding = 50;
  sizes.dockWidth = sizes.infoWidthExpanded - sizes.dockLeftPadding;
  sizes.maxWidth = 200;
  sizes.dockHeight = 200;
  sizes.dockMargin = 20;
  sizes.thumbHieght = 220;
  sizes.highlightMaxHeight = 550;
  sizes.zoomTopMargin = 60;

  sizes.highlightedDockImageMargin = -60;
  sizes.defaultDockMargin = -80;
  sizes.smallerDockMargin = -140;

  return sizes;
}

