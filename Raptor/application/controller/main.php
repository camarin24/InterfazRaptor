<?php
class Main extends Controller
{
    function __construct(){
        parent::__construct("modelMain");
    }
    public function index()
    {
    	if (isset($_SESSION['nombre'])) {
        require APP . 'view/_template/head.php';
        require APP . 'view/main/index.php';
        require APP . 'view/_template/footer.php';
        }else{
            header('location: ' . URL . 'login/index');
        }
    }
}
