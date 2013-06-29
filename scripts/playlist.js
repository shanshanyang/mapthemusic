require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';

  // Initialize the list
  var initPlaylist = function() {
    var album = models.Album.fromURI('spotify:album:5rCCCernTo6IwFwEZM4H53');
    var list = List.forAlbum(album);
    document.getElementById('playlistContainer').appendChild(list.node);
    list.init();
  };
  
  exports.initPlaylist = initPlaylist;
});