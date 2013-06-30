require(['$api/models','$views/list#List', '$views/image#Image'], function(models, List, Image) {
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
    playNextTrack: false,
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
  	getPlayTracks: function() {
  		var track = models.Track.fromURI('spotify:track:0blzOIMnSXUKDsVSHpZtWL'),
		    image = Image.forTrack(track, {player: true});
    
  	},
  	getPlayList: function() {
  		var playlist = models.Playlist.fromURI('spotify:user:1218163278:playlist:6vWt40sZKHdo0s9MrEwPRA');
		var list = List.forPlaylist(playlist);
		document.getElementById('albumContainer').appendChild(list.node);
		console.log(playlist);
		// Call the init method after it has been added to the DOM
		list.init();
  	}
  };

  mapmusic.init();

});