<?php
header( "Access-Control-Allow-Origin: *" );

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(0);
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$sql = "SELECT id, nombre, padre FROM categoria";

$cat = Database::get_arreglo( $sql );

$respuesta = array(
			'error' => false,
			'categorias' => $cat 
		);


echo json_encode( $respuesta );

?>