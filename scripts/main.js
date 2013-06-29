require([
  '$api/models',
  'scripts/region-playlist',
  'scripts/lib/geochart'
], function(models, regionPlaylist, geochart) {
  'use strict';

  regionPlaylist.initRegionPlaylist();
  geochart.drawRegionsMap();
});


