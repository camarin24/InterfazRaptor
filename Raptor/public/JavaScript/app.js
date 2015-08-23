$(document).ready(function(){
    $('ul.tabs').tabs();
    load_image(url);
  });

function load_image(url){
	document.getElementById("imagen_perfil").style.backgroundImage='url('+url+')';
}

