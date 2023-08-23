<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\AdminController;
use Controllers\APIController;
use Controllers\LoginController;
use Controllers\CitaController;
use Controllers\ServicioController;
use MVC\Router;

$router = new Router();


$router -> get('/',[LoginController::class,'login']);
$router -> post('/',[LoginController::class,'login']);
$router -> get('/logout',[LoginController::class,'logout']);

$router -> get('/recuperarPassword',[LoginController::class,'recuperarPassword']);
$router -> post('/recuperarPassword',[LoginController::class,'recuperarPassword']);
$router -> get('/recuperar',[LoginController::class,'recuperar']);
$router -> post('/recuperar',[LoginController::class,'recuperar']);

$router -> get('/crearCuenta',[LoginController::class,'crearCuenta']);
$router -> post('/crearCuenta',[LoginController::class,'crearCuenta']);


$router -> get('/confirmarCuenta',[LoginController::class,'confirmarCuenta']);


$router -> get('/mensaje',[LoginController::class,'mensaje']);

//AREA PRIVADA

$router -> get('/cita',[CitaController::class,'index']);

$router -> get('/admin',[AdminController::class,'index']);

// admin
$router -> get('/api/servicios',[APIController::class,'index']);
$router -> post('/api/citas',[APIController::class,'guardar']);

$router -> post('/api/eliminar',[APIController::class,'eliminar']);

//CRUD de servicios

$router -> get('/servicios',[ServicioController::class,'index']);
$router -> get('/servicios/crear',[ServicioController::class,'crear']);
$router -> post('/servicios/crear',[ServicioController::class,'crear']);

$router -> get('/servicios/actualizar',[ServicioController::class,'actualizar']);
$router -> post('/servicios/actualizar',[ServicioController::class,'actualizar']);


$router -> post('/servicios/eliminar',[ServicioController::class,'eliminar']);



// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();




?>