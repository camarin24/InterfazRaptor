var service = {
	/*
	 /$$$$$$$$                           /$$      
	|__  $$__/                          | $$      
	   | $$  /$$$$$$  /$$$$$$   /$$$$$$$| $$   /$$
	   | $$ /$$__  $$|____  $$ /$$_____/| $$  /$$/
	   | $$| $$  \__/ /$$$$$$$| $$      | $$$$$$/ 
	   | $$| $$      /$$__  $$| $$      | $$_  $$ 
	   | $$| $$     |  $$$$$$$|  $$$$$$$| $$ \  $$
	   |__/|__/      \_______/ \_______/|__/  \__/
	*/                                                                                                                                     
	infoTrack: this.infoTrack = function(artist, track) {
		var result=-1;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=0fbca00bcc89957dd5075f8c9661fe71&artist="+artist+"&track="+track+"&format=json"
		})
		.done(function(data){
			result = data["track"];
		})
		return result;
	},
	searchByTrack: this.searchByTrack = function(searchTerms) {
		var result=-1;
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
		var result=-1;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=0fbca00bcc89957dd5075f8c9661fe71&mbid="+mbid+"&format=json"
		})
		.done(function(data){
			result = data['track'];
		})
		return result;
	},
	getLinkToPlay: this.getLinkToPlay = function(searchTerms){
		var result=-1;
		$.ajax({
			async: false,
	 		url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+searchTerms+"&type=video&key=AIzaSyAfXxWUUZ1nxII62vg-XR0Shuv_ikuVT2A"
		})
		.done(function(data) {
			$.ajax({
				async: false,
	 			url: "http://youtubeinmp3.com/fetch/?api=advanced&format=JSON&video=http://www.youtube.com/watch?v="+data['items'][0]['id']['videoId']
			})
			.done(function(data){
				data = JSON.parse(data);
				result = data['link'];
			})
		})
		return result;
	},
	/*
	  /$$$$$$  /$$ /$$                              
	 /$$__  $$| $$| $$                              
	| $$  \ $$| $$| $$$$$$$  /$$   /$$ /$$$$$$/$$$$ 
	| $$$$$$$$| $$| $$__  $$| $$  | $$| $$_  $$_  $$
	| $$__  $$| $$| $$  \ $$| $$  | $$| $$ \ $$ \ $$
	| $$  | $$| $$| $$  | $$| $$  | $$| $$ | $$ | $$
	| $$  | $$| $$| $$$$$$$/|  $$$$$$/| $$ | $$ | $$
	|__/  |__/|__/|_______/  \______/ |__/ |__/ |__/
	*/                                                                                                                                               
	infoAlbum: this.infoAlbum = function(artist, album) {
		var result=-1;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=0fbca00bcc89957dd5075f8c9661fe71&artist="+artist+"&album="+album+"&format=json"
		})
		.done(function(data){
			result = data["album"];
		})
		return result;
	},
	searchByAlbum: this.searchByAlbum = function(searchTerms) {
		var result=-1;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=album.search&album="+searchTerms+"&api_key=0fbca00bcc89957dd5075f8c9661fe71&format=json"
		})
		.done(function(data){
			result = data['results']['albummatches'];
		})
		return result;
	},
	getAlbumByMbid: this.getAlbumByMbid = function(mbid) {
		var result=-1;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=0fbca00bcc89957dd5075f8c9661fe71&mbid="+mbid+"&format=json"
		})
		.done(function(data){
			result = data['album'];
		})
		return result;
	},
	/*
	  /$$$$$$              /$$     /$$             /$$    
	 /$$__  $$            | $$    |__/            | $$    
	| $$  \ $$  /$$$$$$  /$$$$$$   /$$  /$$$$$$$ /$$$$$$  
	| $$$$$$$$ /$$__  $$|_  $$_/  | $$ /$$_____/|_  $$_/  
	| $$__  $$| $$  \__/  | $$    | $$|  $$$$$$   | $$    
	| $$  | $$| $$        | $$ /$$| $$ \____  $$  | $$ /$$
	| $$  | $$| $$        |  $$$$/| $$ /$$$$$$$/  |  $$$$/
	|__/  |__/|__/         \___/  |__/|_______/    \___/  
	*/                                                     	                                                      	                                                      
	infoArtist: this.infoArtist = function(artist) {
		var result=-1;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+artist+"&api_key=0fbca00bcc89957dd5075f8c9661fe71&format=json"
		})
		.done(function(data){
			result = data['artist'];
		})
		return result;
	},
	searchByArtist: this.searchByArtist = function(searchTerms) {
		var result=-1;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+searchTerms+"&api_key=0fbca00bcc89957dd5075f8c9661fe71&format=json"
		})
		.done(function(data){
			result = data['results']['artistmatches']['artist'];
		})
		return result;
	},
	getArtistByMbid: this.getArtistByMbid = function(mbid) {
		var result=-1;
		$.ajax({
			async: false,
			url: "http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=0fbca00bcc89957dd5075f8c9661fe71&mbid="+mbid+"&format=json"
		})
		.done(function(data){
			result = data['artist'];
		})
		return result;
	}
}