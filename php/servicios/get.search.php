<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

if (isset($_POST['search'])) {
    $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen FROM producto WHERE nombre LIKE '%".$_POST['search']."%'";
    $prod = Database::get_arreglo( $sql );

    $respuesta = array(
                'error' => false,
                'consulta' => $sql,
                'prods' => $prod 
            );
    
    echo json_encode( $respuesta );
    
}




?>