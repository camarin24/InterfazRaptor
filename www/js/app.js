var myApp = new Framework7();

var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

$$("#txt_busqueda").focus(function () {
    app.home.up();
    app.home.enable = false;
});

$$("#txt_busqueda").blur(function () {
    app.home.down();
});

$$("#btn_show_detail").on("click", function () {    
  app.reproductor.showDetail();
});

var can_do_search = true;
$$("#txt_busqueda").keyup(function () {
    if (can_do_search) {
        app.search(this.value);
        can_do_search = false;
        setTimeout(function () {
            if ($("#txt_busqueda").val() != app.result.lastQuerySearch) {
                app.search($("#txt_busqueda").val());
            }
            can_do_search = true;
        }, 500, "Time out from search function");
    }
});

$$("#btn_cancel").on("click", function () {
    if ($$("#txt_busqueda").val().trim() === "") {
        app.home.enable = true;
        app.home.down();
    } else {
        $$("#txt_busqueda").val("");
    }
});

$$(".modal-overlay").on("click", function () {
    app.modal.closeModal('.popover-menu');
})

var app = {
    load: function () {
        $$(".background_img")[0].style.backgroundColor = app.paletteColor.getColor();
        app.untils.toServer("POST", { id: app.untils.user_id }, "user/insertUser", function (data) { });

        app.untils.toServer("POST", { id_user: app.untils.user_id }, "track/getSuggested", function (data) {
            data = data.data.data;
            var lon = data.length;
            if (lon === 0) {
                $$("#div_state").text("Descarga musica gratis");
            }
            var template = "";
            for (var i = 0; i < lon; i++) {
                template += app.result.getItem(data[i].id, data[i].title, data[i].artist.name, data[i].album.title, data[i].preview, data[i].album.cover, data[i].album.cover_big);
            }
            $$("#objecto_resultado").html(template);
            app.result.startContextMenu();
        });
    },
    paletteColor: {
        palette: ['fff', 'fff', 'fff', 'fff', 'fff'],
        getColor: function () {
            return "#" + (app.paletteColor.palette[parseInt(Math.random() * (5 - 0) + 0)]).toString();
        }
    },
    untils: {
        isPurchase : true,
        user_id: "fromweb",
        serviceURL: "http://192.168.10.104:8080/raptor/post/",
        host: "http://192.168.10.104:8080/",
        toServer: function (method, data, url, fn) {
            try {
                app.loader.show()
                var postdata = data;
                $.ajax({
                    url: app.untils.serviceURL + url,
                    type: method,
                    dataType: 'json',
                    data: postdata,
                }).done(function (datos) {
                    fn(datos);
                }).fail(function (wx, data, ww) {
                    //myApp.alert('No es posible conectar con el servidor.', '<img src="img/ic_error_black_24px.svg">');
                    //console.log({ url: app.untils.serviceURL + url, data: postdata });
                    console.log(ww);
                }).always(function () {
                    app.loader.hide()
                })
            } catch (err) {
                console.error(err);
            }
        }
    },
    loader: {
        selector: $("#lbl_titulo"),
        hide: function () {
            app.loader.selector.hide();
        },
        show: function () {
            app.loader.selector.show();
        }
    },
    home: {
        isHomeUp: false,
        enable: true,
        up: function () {
            if (app.home.enable) {
                $("#contenido").show("slow");
                offset = ($$(".navbar")[0].clientHeight - $$("#objecto_buscar")[0].clientHeight).toString() + "px";
                $$("#objecto_buscar")[0].style.marginTop = offset;
                // $$("#objecto_buscar")[0].style.marginBottom = "0%";
                $$(".navbar")[0].style.backgroundColor = "black";
                $$("#border_content").removeClass("border");
                $$(".background_img")[0].style.backgroundColor = "#F8F8F9";
                $$("#btn_cancel")[0].style.visibility = "visible";
                app.home.isHomeUp = true;
            }
        },
        down: function () {
            if (app.home.enable) {
                $("#contenido").hide("slow");
                app.result.clearPanel();
                $$("#btn_cancel")[0].style.visibility = "hidden";
                $$("#objecto_buscar")[0].style.marginTop = "0px";
                // $$("#objecto_buscar")[0].style.marginBottom = "100%";
                $$(".navbar")[0].style.backgroundColor = "rgb(0, 0, 0)";
                $$("#border_content").addClass("border");
                $$(".background_img")[0].style.backgroundColor = app.paletteColor.getColor();
                app.home.isHomeUp = false;
            }
        }
    },
    result: {
        clearPanel: function () {
            $$("#div_state").text("Escribe para iniciar una busqueda");
            $$("#objecto_resultado").html("");
        },
        items: {},
        itemSeleted: "",
        clearItems: function () {
            app.result.items = {};
        },
        getItem: function (id, titulo, artista, album, link_preview, img, img_alt,index) {
            app.result.items[id] = { titulo: titulo, artista: artista, album: album, link_preview: link_preview, img: img, img_alt: img_alt, index: index };
            //app.reproductor.playClick(this)
            return '<div class="card_result" onclick=";">\
      <div class="row">\
      <div class="col-20">\
      <img class="cover lazy" src="' + img + '" onerror="app.result.imgLoadError(this);" alt=""/>\
      </div>\
      <div class="col-70">\
      <span class="title">' + titulo.substring(0, 27) + '</span>\
      <br />\
      <span class="artist">De ' + artista + '</span>\
      <span class="album">- ' + album.substring(0, 23) + '</span>\
      \
      </div>\
      <div class="col-10">\
      <span class="btn">\
      <a href="#" class="color-black link icon-only open-menu" track="' + id + '">\
      <img src="img/ic_more_vert_black_24px.svg" alt="Menu icon" />\
      </a>\
      </span>\
      </div>\
      </div>\
      </div>';
        },
        startContextMenu: function () {
            $$('.open-menu').on('click', function () {
                var clickedLink = this;
                app.result.itemSeleted = this.getAttribute("track");
                app.modal.openModal('.popover-menu', this);
                // myApp.closeModal(".popover-menu") // Para cerrar
            });
        },
        imgLoadError: function (obj) {
            setTimeout(function () {
                temp = obj.src;
                obj.src = "";
                obj.src = temp;
            }, 200, "Time out from imgLoadError")
        },
        lastQuerySearch: ""
    },
    search: function (query) {
        $$("#div_state").text("Resultados de '" + query + "'");
        app.untils.toServer("POST", { query: query }, "track/search", function (data) {
            app.result.lastQuerySearch = query;
            if (data === undefined) {
                $$("#div_state").text("Cargando...");
                return;
            }
            data = data.data.data;
            var lon = data.length;
            if (lon === 0) {
                $$("#div_state").text("No hay resultados para '" + query + "'");
            }
            app.result.items = {};
            var template = "";
            for (var i = 0; i < lon; i++) {
                template += app.result.getItem(data[i].id, data[i].title, data[i].artist.name, data[i].album.title, data[i].preview, data[i].album.cover, data[i].album.cover_big, i);
            }
            $$("#objecto_resultado").html(template);
            app.result.startContextMenu();
        });
    },
    reproductor: {
        selector: document.getElementsByTagName("audio")[0],
        playList: {},
        itemPlaying: "",
        getTrack: function (id) {
            app.untils.toServer("POST", { id: id, id_user: app.untils.user_id }, "track/download", function (data) {
                if (typeof data.data.trackURL == "undefined") {
                    app.reproductor.getTrack(id);
                }
                else {
                    app.reproductor.play(app.untils.host + data.data.trackURL);
                }
            });
        },
        play: function (src) {
            if (src === undefined) { //El usuario pauso la cancion y ahora retorna la reproducion
                $("#btn_play_pause").attr("src", "img/ic_pause_white_24px.svg");
                if (app.reproductor.colorControlsPlayer === "blanco") {
                    $("#btn_play_pause_detail").attr("src", "img/ic_pause_white_24px.svg");
                } else {
                    $("#btn_play_pause_detail").attr("src", "img/ic_pause_black_24px.svg");
                }
                //MusicControls.updateIsPlaying(true);
                app.reproductor.selector.play();
                return;
            }//Se reproduce una nueva cancion

            /// Actulizar playList
            if (app.reproductor.playList !== app.result.items) {
                app.reproductor.playList = {};
                app.reproductor.playList = app.result.items;
            }

            app.reproductor.itemPlaying = app.result.itemSeleted;

            app.reproductor.selector.src = src;
            app.reproductor.selector.load();
            data_controls = {
                track: app.reproductor.playList[app.result.itemSeleted].titulo,
                artist: app.reproductor.playList[app.result.itemSeleted].artista,
                cover: app.reproductor.playList[app.result.itemSeleted].img,

                isPlaying: true,
                dismissable: false,

                hasPrev: true,
                hasNext: true,
                hasClose: false,

                ticker: 'Escuchando ' + app.reproductor.playList[app.result.itemSeleted].titulo
            };

            $("#cover_alt")[0].src = app.reproductor.playList[app.result.itemSeleted].img;
            $("#title_alt").text(app.reproductor.playList[app.result.itemSeleted].titulo);
            $("#art_alt").text(app.reproductor.playList[app.result.itemSeleted].artista);
            $("#reproductor")[0].style.opacity = "1";

            $("#btn_play_pause").attr("src", "img/ic_pause_white_24px.svg");
            if (app.reproductor.colorControlsPlayer === "blanco") {
                $("#btn_play_pause_detail").attr("src", "img/ic_pause_white_24px.svg");
            } else {
                $("#btn_play_pause_detail").attr("src", "img/ic_pause_black_24px.svg");
            }
            app.reproductor.selector.play();
            app.reproductor.isFirtTime();
            //start_remote_controls(data_controls);
        },
        pausa: function () {
            $("#btn_play_pause").attr("src", "img/ic_play_arrow_white_24px.svg");
            if (app.reproductor.colorControlsPlayer === "blanco") {
                $("#btn_play_pause_detail").attr("src", "img/ic_play_arrow_white_24px.svg");
            } else {
                $("#btn_play_pause_detail").attr("src", "img/ic_play_arrow_black_24px.svg");
            }

            //MusicControls.updateIsPlaying(false);
            app.reproductor.selector.pause();
        },
        next: function () {
            var currentIndex = app.reproductor.playList[app.result.itemSeleted].index + 1;
            for (item in app.reproductor.playList) 
              {
                if ( app.reproductor.playList[item].index == currentIndex )
                {
                  app.result.itemSeleted = item;
                  app.reproductor.playSeleted();
                  app.reproductor.showDetail(true);
                  return;
                }
              }
        },
        back: function () {
            var currentIndex = app.reproductor.playList[app.result.itemSeleted].index - 1;
            for (item in app.reproductor.playList) 
              {
                if ( app.reproductor.playList[item].index == currentIndex )
                {
                  app.result.itemSeleted = item;
                  app.reproductor.playSeleted();
                  app.reproductor.showDetail(true);
                  return;
                }
              }
        },
        showDetail: function (isButton=false) {
          $("#lbl_title_alt").text(app.result.items[app.result.itemSeleted].titulo);
          $('#lbl_artist_alt').text(app.result.items[app.result.itemSeleted].artista);
          //$('#totalTime').text("");       ///>>>>>>>>>Falta obtener la duracion de la cancion!

          var temp = $(".background-detail")[0].style.backgroundImage.split(',')[0].replace('url("', "").replace('")', "");
          if (temp != app.result.items[app.result.itemSeleted].img_alt) {
              $("#img_cover_detail")[0].src = app.result.items[app.result.itemSeleted].img_alt;
              $(".background-detail")[0].style.backgroundImage = "URL(" + app.result.items[app.result.itemSeleted].img_alt + "),URL(img/background.png)";
              app.reproductor.getColorPalette();
          }
          if (!isButton) {
            myApp.popup('.popup-detail');
          }          
        },
        playSeleted: function () {
            app.reproductor.getTrack(app.result.itemSeleted);
            app.modal.closeModal('.popover-menu');
        },
        playClick: function (element) {
          app.result.itemSeleted = element.childNodes[1].childNodes[5].childNodes[1].childNodes[1].getAttribute("track");
          app.reproductor.playSeleted();
        },
        error: function () {
            src = app.reproductor.selector.src
            app.reproductor.selector.src = "";
            app.reproductor.selector.src = src;
            app.reproductor.selector.load();
            app.reproductor.selector.play();
        },
        playPause: function () {
            if (app.reproductor.selector.paused) {
                app.reproductor.play();
            } else {
                app.reproductor.pausa();
            }
        },
        setSongPosition: function (event) {
            var x = event.clientX - (document.querySelector(".dummy-space").clientWidth + 15);
            var mousePositions = document.getElementById('song-progress');
            var por = (100 * x) / mousePositions.clientWidth
            var totalTime = app.reproductor.selector.duration;
            //console.log((100 * por) / totalTime);
            app.reproductor.selector.currentTime = (por * totalTime) / 100;
            $(".progress-bar").css({ "width": por + "%" });
        },
        getSongDuration: function () {
            var duration = app.reproductor.selector.duration;
            var currentTime = app.reproductor.selector.currentTime;
            $("#currentTime").text(app.reproductor.calculateTime(currentTime));
            $("#totalTime").text(app.reproductor.calculateTime(duration));
        },
        calculateTime: function (time) {
            var minutes = Math.floor(time / 60);
            var seconds = parseInt(time - minutes * 60);
            return (minutes.toString().length == 1 ? "0" + minutes : minutes) + ":" + (seconds.toString().length == 1 ? "0" + seconds : seconds);
        },
        currentTimeToProgressBar: function () {
            var currentTime = app.reproductor.selector.currentTime;
            var duration = app.reproductor.selector.duration;
            var width = document.getElementById('song-progress').clientWidth;
            var por = (100 * currentTime) / duration;
            $(".progress-bar").css({ "width": por + "%" });
            app.reproductor.getSongDuration();
        },
        getColorPalette: function () {
            var img = document.getElementById('img_cover_detail');
            RGBaster.colors(img, {
                exclude: ['rgb(255,255,255)', 'rgb(0,0,0)', 'rgb(233, 233, 233)',
                            "rgb(234,234,234)", "rgb(235,235,235)", "rgb(232,232,232)",
                            "rgb(236,236,236)", "rgb(237,237,237)", "rgb(228,228,228)",
                            "rgb(230,230,230)", "rgb(229,229,229)", "rgb(238,238,238)", "rgb(238,238,238)"],
                success: function (payload) {
                    $(".song-detail").css({ "background-color": payload.dominant });
                    $("#_reproductor_").css({ "background-color": payload.dominant });
                    app.reproductor.changeControlsColors(payload.dominant);
                }
            });
        },
        colorControlsPlayer: "",
        changeControlsColors: function (rgb) {
            rgb = rgb.replace("rgb(", "").replace(")", "");
            rgb = rgb.split(',')
            rgb = eval(rgb.join("+")) / 3;
            if (rgb <= 127) {
                $("#lbl_title_alt").css({ color: "#fff" });
                $("#lbl_artist_alt").css({ color: "#fff" });
                $("#currentTime").css({ color: "#fff" });
                $("#totalTime").css({ color: "#fff" });
                $(".progress-bar").css({ "background-color": "#fff" });
                $(".progress-bar-inverse").css({ "background-color": "#2b2b2b" });
                $("#btn_back_detail")[0].src = "img/ic_skip_previous_white_24px.svg";
                $("#btn_play_pause_detail")[0].src = "img/ic_pause_white_24px.svg";
                $("#btn_next_detail")[0].src = "img/ic_skip_next_white_24px.svg";
                app.reproductor.colorControlsPlayer = "blanco";
            } else {
                $("#lbl_title_alt").css({ color: "#000" });
                $("#lbl_artist_alt").css({ color: "#000" });
                $("#currentTime").css({ color: "#000" });
                $("#totalTime").css({ color: "#000" });
                $(".progress-bar").css({ "background-color": "#000" });
                $(".progress-bar-inverse").css({ "background-color": "#CCCCCC" }) ;
                $("#btn_back_detail")[0].src = "img/ic_skip_previous_black_24px.svg";
                $("#btn_play_pause_detail")[0].src = "img/ic_pause_black_24px.svg";
                $("#btn_next_detail")[0].src = "img/ic_skip_next_black_24px.svg";
                app.reproductor.colorControlsPlayer = "negro";
            }

        },
        isFirtTime: function () {
            if (app.reproductor.interval === undefined) {
                var intervalTrack = setInterval(function () {
                    if (!app.reproductor.selector.paused) {
                        app.reproductor.currentTimeToProgressBar()
                    }
                }, 1000);
                app.reproductor.interval = true;
            }
        }
    },
    playList : {
      create : function ( name ) {
        app.untils.toServer("POST",{ id : app.untils.user_id , nombre : name }, "playlist/newPlaylist", function (data) { 
          console.log(data)
        });
      },
      addItem : function (  ) {
        app.untils.toServer("POST",{ id :"3" , track: JSON.stringify( app.result.items[app.result.itemSeleted] ).replace(/"/g,';')}, "playlist/addItem", function (data) { 
          //console.log(data)
        });
      },
      listPlaylist : function ( ) {
        app.untils.toServer("POST",{ id :app.untils.user_id }, "playlist/listByUser", function (data) { 
          console.log(data)
        });
      } 
    },
    modal: {
        openModal: function (selector, elem) {
            if ($(selector).length === 0) return false;
            var $selector = $(selector);
            $(".modal-overlay").addClass("modal-overlay-visible");
            $selector.find(".card-header").css({ "background-image": "url(" + app.result.items[app.result.itemSeleted].img_alt + "),URL(img/background.png)" });
            $selector.find(".titulo").text(app.result.items[app.result.itemSeleted].titulo);
            $selector.find(".artist").text(app.result.items[app.result.itemSeleted].artista);
            $selector.find(".album").text(app.result.items[app.result.itemSeleted].album);
            $selector.css({ "top": "18%" }).show()
            app.elem = $(elem).offset().top;
        },
        closeModal: function (selector) {
            $(".modal-overlay").removeClass("modal-overlay-visible")
            $(selector).hide();
        }
    }
};



$(document).ready(function () { // Init everywhere
    app.loader.hide()
    app.load();
});


document.addEventListener("deviceready", onDeviceReady, false);// Init solo en el movil
function onDeviceReady() {
    app.untils.user_id = typeof (device) === "undefined" ? "undefined" : device.uuid;
    $("#lbl_id").text("id:" + app.untils.user_id);
    initAdmob();
    app.loader.hide()
    app.load();
    StatusBar.backgroundColorByHexString("#000");
}

var obj = $(".page-content");
var obj_top = obj.scrollTop()
obj.scroll(function () {
    var obj_act_top = $(this).scrollTop();
    if (obj_act_top > obj_top) {
        $("#objecto_buscar").css({ "position": "fixed" })
        if (obj_act_top >= 200)
            $("#objecto_buscar").css({ "opacity": "0" });
    } else {
        $("#div_state").css({ "margin-top": "49px" })
        $("#objecto_buscar").css({ "opacity": "1", "position": "fixed" });
    }
    obj_top = obj_act_top;
});

app.reproductor.selector.onended = app.reproductor.pausa();
