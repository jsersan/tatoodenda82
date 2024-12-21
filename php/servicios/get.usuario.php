<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

if (isset($_POST['user']) && isset($_POST['pass'])) {
    $sql = "SELECT id, username, nombre, email, direccion, cp, ciudad FROM user 
            WHERE username='".$_POST['user']."' AND password='".$_POST['pass']."'";

    $user = Database::get_arreglo( $sql );

    $respuesta = array(
                'error' => false,
                'user' => $user 
            );
} else if (isset($_POST['user']) && !isset($_POST['password'])) {
    $sql = "SELECT id FROM user WHERE username='".$_POST['user']."'";
    $user = Database::get_arreglo( $sql );

    $respuesta = array(
                'error' => false,
                'user' => $user 
            );
} else {
    $respuesta = array(
        'error' => true
    );
}


echo json_encode( $respuesta );

?>