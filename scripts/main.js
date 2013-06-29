require([
  '$api/models',
  // 'scripts/lib/jquery-1.10.1.min',
  // 'scripts/lib/backbone',
  'scripts/cover-example',
  'scripts/button-example',
  'scripts/playlist-example'
], function(models, coverExample, buttonExample, playlistExample) {
  'use strict';
  	
  // coverExample.doCoverForAlbum();
  // buttonExample.doShareButtonForArtist();
  // buttonExample.doPlayButtonForAlbum();
  playlistExample.doPlaylistForAlbum();

});
