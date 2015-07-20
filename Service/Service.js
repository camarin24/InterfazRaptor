var service = {
	infoTrack: this.infoTrack = function(artist, track) {
		var result=2;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=0fbca00bcc89957dd5075f8c9661fe71&artist="+artist+"&track="+track+"&format=json"
		})
		.done(function(data){
			result = data["track"];
		})
		return result;
	},
	infoAlbum: this.infoAlbum = function(artist, album) {
		var result=2;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=0fbca00bcc89957dd5075f8c9661fe71&artist="+artist+"&album="+album+"&format=json"
		})
		.done(function(data){
			result = data["album"];
		})
		return result;
	},
	searchByTrack: this.searchByTrack = function(searchTerms) {
		var result=2;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track="+searchTerms+"&api_key=0fbca00bcc89957dd5075f8c9661fe71&format=json"
		})
		.done(function(data){
			result = data['results']['trackmatches'];
		})
		return result;
	},
	getTrackByMbid: this.getTrackByMbid = function(mbid) {
		var result=2;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=0fbca00bcc89957dd5075f8c9661fe71&mbid="+mbid+"&format=json"
		})
		.done(function(data){
			result = data['track'];
		})
		return result;
	}
}