<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

if (isset($_POST['articulo'])) {
    $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen, categoria FROM producto WHERE id=".$_POST['articulo'];

    $art = Database::get_arreglo( $sql );

    $respuesta = array(
                'error' => false,
                'articulo' => $art 
            );
} else {
    $respuesta = array(
        'error' => true
    );
}


echo json_encode( $respuesta );

?>