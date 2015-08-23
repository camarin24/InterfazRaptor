var txt_search = document.getElementById('txt_search');
$("#txt_search").on('keyup', function(){
        if (txt_search.value != "") {
            $("#panelSearch").show(150);
            searchTrack();
            searchAlbum();
            searchArtist();
        }else if (txt_search.value == "") {
            $("#panelSearch").hide(150);
        }
    }).keyup();
function searchTrack() {
        $.ajax({
            url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + txt_search.value + "&api_key=0fbca00bcc89957dd5075f8c9661fe71&format=json"
        })
        .done(function (data) {   
            var template = "";         
            for (var i = 0; i < 5; i++) {
                if (data['results']['trackmatches']['track'][i]['mbid'] != "") {
                    template += "<div class='result'>\
                                    <img id='cover' width='60' src='"+data['results']['trackmatches']['track'][i]['image'][1]['#text']+"' alt=''>\
                                    <div id='contec'>\
                                        <div id='title' onclick='play(this)' datayoutube='"+data['results']['trackmatches']['track'][i]['name']+" - "+data['results']['trackmatches']['track'][i]['artist']+"' dataimg='"+data['results']['trackmatches']['track'][i]['image'][3]['#text']+"' class='truncate'>"+data['results']['trackmatches']['track'][i]['name']+"</div>\
                                        <a href='#' id='art'>"+data['results']['trackmatches']['track'][i]['artist']+"</a>\
                                    </div>\
                                </div>";
                };
            };
            document.getElementById("cont_cancion").innerHTML = template;
        })
}
function searchAlbum() {
        $.ajax({
            url: "http://ws.audioscrobbler.com/2.0/?method=album.search&album=" + txt_search.value + "&api_key=0fbca00bcc89957dd5075f8c9661fe71&format=json"
        })
        .done(function (data) {   
            var template = "";         
            for (var i = 0; i < 5; i++) {
                if (data['results']['albummatches']['album'][i]['mbid'] != "") {
                    template += "<div class='result'>\
                                    <img id='cover' width='60' src='"+data['results']['albummatches']['album'][i]['image'][1]['#text']+"' alt=''>\
                                    <div id='contec'>\
                                        <div id='title' class='truncate'>"+data['results']['albummatches']['album'][i]['name']+"</div>\
                                        <span id='art'>de "+data['results']['albummatches']['album'][i]['artist']+"</span>\
                                    </div>\
                                </div>";
                };
            };
            document.getElementById("cont_album").innerHTML = template;
        })
}
function searchArtist() {
        $.ajax({
            url: "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + txt_search.value + "&api_key=0fbca00bcc89957dd5075f8c9661fe71&format=json"
        })
        .done(function (data) {   
            var template = "";         
            for (var i = 0; i < 5; i++) {
                if (data['results']['artistmatches']['artist'][i]['mbid'] != "") {
                    template += "<div class='result'>\
                                    <img id='cover' width='60' src='"+data['results']['artistmatches']['artist'][i]['image'][1]['#text']+"' alt=''>\
                                    <div id='contec'>\
                                        <div id='title' class='truncate'>"+data['results']['artistmatches']['artist'][i]['name']+"</div>\
                                        <span id='art'>"+data['results']['artistmatches']['artist'][i]['listeners']+" oyentes</span>\
                                    </div>\
                                </div>";
                };
            };
            document.getElementById("cont_artista").innerHTML = template;
        })
}
function play(obj){
    //console.log(obj.attributes.data.value);
    var link = service.getLinkToPlay(obj.attributes.datayoutube.value);
    document.getElementById("reproductor").contentWindow.document.getElementById("audio").src = link;
    document.getElementById("reproductor").contentWindow.document.getElementById("img_cover").src = obj.attributes.dataimg.value;
    link = obj.attributes.datayoutube.value.split("-");
    document.getElementById("reproductor").contentWindow.document.getElementById("track").innerHTML = link[0];
    document.getElementById("reproductor").contentWindow.document.getElementById("art").innerHTML = link[1];
}