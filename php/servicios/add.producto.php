<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $categoria = $_POST['categoria'];
    $carpetaimg = $_POST['carpetaimg'];

    $sql = "INSERT INTO producto VALUES (null,'".$nombre."', '".$descripcion."', ".$precio.", '".$carpetaimg."', '', ".$categoria.")";

    $contenidoimg = scandir('../../img');
    $existe = false;
    foreach ($contenidoimg as $cont) {
        if ($cont == $carpetaimg) {
            $existe = true;
        }
    }
    if (!$existe) {
        mkdir('../../img/'.$carpetaimg);
    }

    $res = Database::ejecutar_idu($sql);
    $respuesta = array(
        'error' => false,
        'id' => $res
    );


echo json_encode( $respuesta );

?>