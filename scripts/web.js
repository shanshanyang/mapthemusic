function getSpotifyApi(){
	return {
		require: function(){
			return {
				player: null
			};
		}
	};
}

var exports = {};