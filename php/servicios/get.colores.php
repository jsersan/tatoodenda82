<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

if (isset($_POST['articulo'])) {
    $sql = "SELECT color, imagen FROM color WHERE idprod=".$_POST['articulo'];
    $colores = Database::get_arreglo( $sql );
    $respuesta = array(
			'error' => false,
			'colores' => $colores 
		);

} else {
    $respuesta = array(
        'error' => true
    );
}


echo json_encode( $respuesta );


?>