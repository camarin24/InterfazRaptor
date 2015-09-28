<?php 
class login extends Controller
{
	private $mdlModel=null; 

    function __construct(){
        parent::__construct("mdlLogin");
    } 
    public function index()
    {
        require APP . 'view/_template/login/header.php';
        require APP . 'view/login/index.php';
        require APP . 'view/_template/login/footer.php';
    }
    public function login(){
    	if (isset($_POST["btnLogin"])){

            $flag = $this->model->login($_POST["txtCorreo"],$_POST["txtContrasenia"]);
            var_dump($flag);
            if ($flag != false){
                
               header('location: '.URL.'main/index');
               $_SESSION['nombre']= $flag['nombre']; 
               $_SESSION['urlImagen']= $flag['urlImagen']; 
            }else{
                echo '<script language="javascript">alert("Datos incorrectos");</script>';  
                header('location: '.URL.'sesion/index');
            }
    	}
    }
    public function authentication(){
        if (isset($_POST['email']) && isset($_POST['password'])) {
            $flag = $this->model->login($_POST["email"],$_POST["password"]);
            if ($flag != false){                
               echo json_encode(array( "id" =>  $flag['id'], "name" => $flag['name'], "email" => $flag['email'], "img" => $flag['img'])); 
            }else{
                 echo json_decode(array("type" => "error", "message" => "user no found"));
            }
        }else{
            echo json_decode(array("type" => "error", "message" => "set all values"));
        }
    }
}
 ?>
