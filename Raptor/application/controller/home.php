<?php

/**
 * Class Home
 *
 * Please note:
 * Don't use the same name for class and method, as this might trigger an (unintended) __construct of the class.
 * This is really weird behaviour, but documented here: http://php.net/manual/en/language.oop5.decon.php
 *
 */
class Home extends Controller
{
    public function index()
    {
        require APP . 'view/home/index.php';
    }
    public function Agenda()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/agenda/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function bodega()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/bodega/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function clientes()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/clientes/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function compra()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/compra/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function config_user()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/config_user/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function controlbodega()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/controlbodega/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function insumos()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/insumos/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function kardex_compra()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/kardex_compra/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function kardex_venta()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/kardex_venta/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function MoviInsumos()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/MoviInsumos/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function GestionInvenatrioProductos()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/GestionInvenatrioProductos/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function Productos()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/productos/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function TipoProductos()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/tipoproductos/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function venta()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/venta/index.php';
        require APP . 'view/_templates/footer.php';
    }
    public function ConfigUnidadMedida()
    {
        require APP . 'view/_templates/header.php';
        require APP . 'view/unidadmedida/index.php';
        require APP . 'view/_templates/footer.php';
    }
}
