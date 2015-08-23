<?php

class mdlLogin
{
    private $db=null;
    private $email;
    private $pass;

    function __construct($db){
        try {
            $this->db = $db;
        } catch (PDOException $e) {
            exit('Database connection could not be established.');
        }
    }

    public function login($correo,$contrasenia){
        $sql ="SELECT * FROM user WHERE `email` = ? and `pass` = ?";
        $query = $this->db->prepare($sql);
        $query->bindValue(1,$correo,PDO::PARAM_STR);
        $query->bindValue(2,$contrasenia,PDO::PARAM_STR);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);

        return $result;
    }
}
