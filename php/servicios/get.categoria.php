<?php
header( "Access-Control-Allow-Origin: *" );

// Incluir la clase de base de datos
include_once("../classes/class.database.php");

if (isset($_POST['id'])) {
    $sql = "SELECT id, nombre, padre FROM categoria WHERE id=".$_POST['id'];

    $cat = Database::get_arreglo( $sql );

    $respuesta = array(
                'error' => false,
                'categoria' => $cat 
            );
} else {
    $respuesta = array(
        'error' => true
    );
}


echo json_encode( $respuesta );

?>