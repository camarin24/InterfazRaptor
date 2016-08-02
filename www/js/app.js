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

$$("#txt_busqueda").keyup(function () {
    app.search(this.value);
});

$$("#btn_cancel").on("click", function () {
    if ($$("#txt_busqueda").val().trim() === "") {
        app.home.enable = true;
        app.home.down();
    } else {
        $$("#txt_busqueda").val("");
    }
});

$$(".modal-overlay").on("click",function(){
    app.modal.closeModal('.popover-menu');
})

var app = {
    load: function () {
        $$(".background_img")[0].style.backgroundColor = app.paletteColor.getColor();

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
        palette: ['C63D0F', '007AFF', '7D1935', 'DF3E82', '3B6378','000','DB4437','4285F4'],
        getColor: function () {
            return "#" + (app.paletteColor.palette[parseInt(Math.random() * (8 - 0) + 0)]).toString();
        }
    },
    untils: {
        user_id: "-1",
        serviceURL: "https://raptor-speakerblack.c9users.io/server/post/",
        toServer: function (method, data, url, fn) {
            try {
                app.loader.show()
                $.ajax({
                    url: app.untils.serviceURL + url,
                    type: method,
                    dataType: 'json',
                    data: data,
                }).done(function (datos) {
                    fn(datos);
                }).fail(function (wx, data, ww) {
                    myApp.alert('No es posible conectar con el servidor.', '<img src="img/ic_error_black_24px.svg">');
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
                $$(".navbar")[0].style.backgroundColor = "rgba(0, 0, 0, 0.6)";
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
        getItem: function (id, titulo, artista, album, link_preview, img, img_alt) {
            app.result.items[id] = { titulo: titulo, artista: artista, album: album, link_preview: link_preview, img: img, img_alt: img_alt };
            return '<div class="card_result">\
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
                app.modal.openModal('.popover-menu',this);
                // myApp.closeModal(".popover-menu") // Para cerrar 
            });
        },
        imgLoadError: function (obj) {
            temp = obj.src;
            obj.src = "";
            obj.src = temp;
        }
    },
    search: function (query) {
        $$("#div_state").text("Resultados de '" + query + "'");
        app.untils.toServer("POST", { query: query }, "track/search", function (data) {
            data = data.data.data;
            var lon = data.length;
            if (lon === 0) {
                $$("#div_state").text("No hay resultados para '" + query + "'");
            }
            var template = "";
            for (var i = 0; i < lon; i++) {
                template += app.result.getItem(data[i].id, data[i].title, data[i].artist.name, data[i].album.title, data[i].preview, data[i].album.cover, data[i].album.cover_big);
            }
            $$("#objecto_resultado").html(template);
            app.result.startContextMenu();
        });
    },
    reproductor: {
        selector: document.getElementsByTagName("audio")[0],
        play: function (src) {
            if (src === undefined) {
                app.reproductor.selector.play();
                return;
            }
            app.reproductor.selector.src = src;
            app.reproductor.selector.load();
            app.reproductor.selector.play();
        },
        pausa: function () {
            app.reproductor.selector.pause();
        },
        playSeleted : function () {
        	app.reproductor.play(app.result.items[app.result.itemSeleted].link_preview);
        },
        error : function () {
        	src = app.reproductor.selector.src
        	app.reproductor.selector.src = "";
        	app.reproductor.selector.src = src;
            app.reproductor.selector.load();
            app.reproductor.selector.play();
        }
    },
    modal: {
    	openModal: function(selector,elem){
	        if($(selector).length === 0) return false;
	        var $selector = $(selector);
	        $(".modal-overlay").addClass("modal-overlay-visible");
	        $selector.find(".card-header").css({"background-image":"url("+app.result.items[app.result.itemSeleted].img_alt+")"});
	        $selector.find(".titulo").text(app.result.items[app.result.itemSeleted].titulo);
	        $selector.find(".artist").text(app.result.items[app.result.itemSeleted].artista);
	        $selector.find(".album").text(app.result.items[app.result.itemSeleted].album);

            if(($(elem).offset().top + $(selector).height()) > $('body').height()){
                var top = parseFloat($(elem).offset().top) - parseFloat($(selector).height());
                 $selector.css({"top": top + 30 + "px"}).show()
            }else{
                 $selector.css({"top":$(elem).offset().top + "px"}).show()
            }
	        app.elem = $(elem).offset().top;
	    },
	    closeModal:function(selector){
	        $(".modal-overlay").removeClass("modal-overlay-visible")
	        $(selector).hide();
	    }
    }
};



$(document).ready(function () {
    app.loader.hide()
    app.load();
    // $('audio')[0].addEventListener('error', function failed(e) {
	// 	app.reproductor.error();
	// }, true);
});
