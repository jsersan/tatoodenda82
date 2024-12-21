<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

//if (isset($_POST['username']) && isset($_POST['password'])) {
    $sql = "INSERT INTO user VALUES (null,'"
           .$_POST['username']."', '"
           .$_POST['nombre']."','"
           .$_POST['email']."','"
           .$_POST['password']."','"
           .$_POST['direccion']."','"
           .$_POST['ciudad']."','"
           .$_POST['cp']."')";

    $res = Database::ejecutar_idu($sql);
    $respuesta = array(
        'error' => false,
        'resultado' => $res
    );


echo json_encode( $respuesta );

?>