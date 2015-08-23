<style>
	body{
		background-image: url(<?php echo URL; ?>image/motor.png);
		background-size: cover;
	}
	#block{
		padding: 30px;
		background-color: rgba(255,255,255,0.9) !important;
	}
	.responsive-img{
		padding-left: 15% !important;
	}
	.s11{
		top: 10% !important;
	}
	.black{
		color:white;
	}
</style>

<div class="center-align container row">
		<div class="col s11">.</div>
		<div class="col s3">.</div>
		<div id="block" class="col s6 card-panel white z-depth-3">
			<img class="responsive-img col s10" src="<?php echo URL; ?>image/Raptor logo.png" alt="">
			<form action="<?php echo URL ?>login/login" method="post">
			<div class="row">
				<div class="input-field col s12">
					<input id="txtemail" type="email" class="validate" name="txtCorreo">
					<label for="email" >Correo eletrónico</label>
				</div>
			</div>
			<div class="row">
				<div class="input-field col s12">
					<input id="txtpassword" type="password" class="validate" name="txtContrasenia">
					<label for="password">Contraseña</label>
				</div>
			</div>
			<div class="row">
				<div class="input-field col s12">
				<div class="col s12 l6">
					<a href="#" class="waves-effect waves-black btn-flat">Registrarse</a>
				</div>
				<div class="col s12 l6">
					<button type="submit" name="btnLogin" class="waves-effect waves-amber btn-flat black">Ingresar</button>
				</div>
					
				</div>
			</div>
			</form>

		
	</div>
</div>
