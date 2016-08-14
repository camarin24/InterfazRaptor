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


var can_do_search = true;

$$("#txt_busqueda").keyup(function () {
  if (can_do_search) {
    app.search(this.value);
    can_do_search = false;
    setTimeout(function(){
      can_do_search = true;
    },500,"Time out from search function");
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

$$(".modal-overlay").on("click",function(){
  app.modal.closeModal('.popover-menu');
})

var app = {
  load: function () {
    $$(".background_img")[0].style.backgroundColor = app.paletteColor.getColor();

    app.untils.toServer("POST", { id : app.untils.user_id }, "user/insertUser", function (data) { });

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
    user_id: "fromweb",
    serviceURL: "http://192.168.1.12/raptor/post/",
    host : "http://192.168.1.12/",
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
          console.log({ url : app.untils.serviceURL + url , data : postdata });
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
    getTrack: function (id) {
      app.untils.toServer("POST", { id : id , id_user : app.untils.user_id }, "track/download", function (data) {
        if (typeof data.data.trackURL == "undefined")
        {
          app.reproductor.getTrack(id);
        }
        else
        {
          app.reproductor.play(app.untils.host + data.data.trackURL);
        }
      });
    },
    play: function (src) {
      if (src === undefined) { //El usuario pauso la cancion y ahora retorna la reproducion
        $("#btn_play_pause").attr("src","img/ic_pause_white_24px.svg");
        MusicControls.updateIsPlaying(true);
        app.reproductor.selector.play();
        return;
      }//Se reproduce una nueva cancion
      app.reproductor.selector.src = src;
      app.reproductor.selector.load();

      data_controls = {
        track       : app.result.items[app.result.itemSeleted].titulo,
        artist      : app.result.items[app.result.itemSeleted].artista,
        cover       : app.result.items[app.result.itemSeleted].img,

        isPlaying   : true,
        dismissable : false,

        hasPrev   : true,
        hasNext   : true,
        hasClose  : false,

        ticker    : 'Escuchando ' + app.result.items[app.result.itemSeleted].titulo
      };

      $("#cover_alt")[0].src = app.result.items[app.result.itemSeleted].img;
      $("#title_alt").text(app.result.items[app.result.itemSeleted].titulo);
      $("#art_alt").text(app.result.items[app.result.itemSeleted].artista);
      $("#reproductor")[0].style.opacity = "1";

      $("#btn_play_pause").attr("src","img/ic_pause_white_24px.svg");
      app.reproductor.selector.play();
      start_remote_controls(data_controls);
    },
    pausa: function () {
      $("#btn_play_pause").attr("src","img/ic_play_arrow_white_24px.svg");
      MusicControls.UpdateIsPlaying(false);
      app.reproductor.selector.pause();
    },
    playSeleted : function () {
      //app.reproductor.play(app.result.items[app.result.itemSeleted].link_preview);
      app.reproductor.getTrack(app.result.itemSeleted);
    },
    error : function () {
      src = app.reproductor.selector.src
      app.reproductor.selector.src = "";
      app.reproductor.selector.src = src;
      app.reproductor.selector.load();
      app.reproductor.selector.play();
    },
    playPause:function(){
      debugger;
      if(app.reproductor.selector.paused){
        app.reproductor.play();
      }else{
        app.reproductor.pausa();
      }
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

      $selector.css({"top":"18%"}).show()
      app.elem = $(elem).offset().top;
    },
    closeModal:function(selector){
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
  $("#lbl_id").text("id:"+app.untils.user_id);
  initAdmob();
  app.loader.hide()
  app.load();
  StatusBar.backgroundColorByHexString("#000");
}

var obj = $(".page-content");
var obj_top = obj.scrollTop()
obj.scroll(function(){
  var obj_act_top = $(this).scrollTop();
  if(obj_act_top > obj_top){
    $("#objecto_buscar").css({"position":"fixed"})
    if(obj_act_top >= 200)
    $("#objecto_buscar").css({"opacity":"0"});
  }else{
    $("#div_state").css({"margin-top":"49px"})
    $("#objecto_buscar").css({"opacity":"1","position":"fixed"});
  }
  obj_top = obj_act_top;
});
app.reproductor.selector.onended = app.reproductor.pausa();
