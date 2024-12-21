<?php
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");
header('Access-Control-Allow-Origin: *');

if (isset($_POST['color']) && isset($_POST['articulo'])) {
    $sql = "SELECT color, imagen FROM color WHERE idprod=".$_POST['articulo']."AND color=\'".$_POST['color']"\'";
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