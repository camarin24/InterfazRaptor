        <style>
            <?php include APP."view/main/style.css"; ?>
            #reproductor{
                width: 228px;
                height: 270px;
                position: fixed;
                top:59%;
                left:0px;
            }
        </style>
        <div class="row container-width" id="bar">
			<div class="col s2 backgroud-izq z-depth-2"> <!--Menu de la izquierda-->
				<div class="">
					<div class="center-align">
						<h3 class="center-align white-text logo-font">Raptor</h3>
					</div>
				</div>
				<div class="row padding">
			          <input id="txt_search" type="text" placeholder="Buscar" class="input-search"/>	    	
				</div>
				<div class="row">
                    <table id="taks">
                        <tr>
                            <td class="white-text">Canciones favoritas</td>
                        </tr>
                        <tr>
                            <td class="white-text">Listas</td>
                        </tr>
                        <tr>
                            <td class="white-text">Álbumes</td>
                        </tr>
                    </table>
				</div>
                <!--  <div id="reprodutor">
                    <?php 
                        //include "view/reproductor.html";
                     ?>
                 </div> -->
                <iframe id="reproductor" src="<?php echo URL ?>view/reproductor.html" frameborder="0" scrolling="no"></iframe>
			</div>
            
            <div id="panelSearch" class="z-depth-2">
                <div id="cancion">
                    <span class="title">Canciones</span>
                    <div class="cont" id="cont_cancion">
                        
                    </div>
                </div>
                <div id="album">
                    <span class="title">Albumes</span>
                    <div class="cont" id="cont_album">
                        
                    </div>
                </div>
                <div id="artista">
                    <span class="title">Artistas</span>
                    <div class="cont" id="cont_artista">
                        
                    </div>
                </div>
            </div>
        
        </div>    
    </div>