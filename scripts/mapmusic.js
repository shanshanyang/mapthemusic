require(['$api/models','$views/list#List'], function(models, List) {
	'use strict';

  var mapmusic = {
  	w: null,
  	h: null,
  	svg: null,
    limits: {
        x: [-800, 1000],
        y: [-600, 600]
    },
    current: {
        scale: 0,
        translate: 0
    },
  	init: function() {
  		mapmusic.w = window.innerWidth;
        mapmusic.h = window.innerHeight;
        // var scale = Math.max(geo.w * 0.9, geo.proj.scale());
        var translateX = mapmusic.w / 4;
        var translateY = mapmusic.h / 4;

        if(mapmusic.w === 0 && mapmusic.h === 0){
            mapmusic.w = window.innerWidth;
            mapmusic.h = window.innerHeight;
            setTimeout(function(){
            	mapmusic.init();
            },200);
        }else{
			console.log("init");
			// geo.proj.scale(scale).translate(translate);
			exports.getPlayAlbum = mapmusic.getPlayAlbum;
			exports.getPlayList = mapmusic.getPlayList;
			exports.getPlayTrack = mapmusic.getPlayTrack;
        }
  	},
  	getPlayAlbum: function() {
  		var album = models.Album.fromURI('spotify:album:2mCuMNdJkoyiXFhsQCLLqw');
		var list = List.forAlbum(album);
		document.getElementById('albumContainer').appendChild(list.node);
		// Call the init method after it has been added to the DOM
		list.init();
  	},
  	getPlayTrack: function() {

  	},
  	getPlayList: function() {
  		var playlist = models.Playlist.fromURI('spotify:user:spotify:playlist:2lusnaAIIckVJJFKM2upOe');
		var list = List.forPlaylist(playlist);
		document.getElementById('playlistContainer').appendChild(list.node);

		// Call the init method after it has been added to the DOM
		list.init();
  	}
  };

  mapmusic.init();

});