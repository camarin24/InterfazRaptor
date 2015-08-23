<?php 
	class dash extends Controller
{
    function __construct(){
        parent::__construct("modelMain");
    }
    public function index()
    {
        require APP . 'view/_template/head.php';
        require APP . 'view/dash/index.php';
        require APP . 'view/_template/footer.php';
    }
}
 ?>