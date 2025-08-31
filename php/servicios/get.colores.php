<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$articulo = $_POST['articulo'] ?? 0;

if ($articulo > 0) {
    $sql = "SELECT color, imagen FROM color WHERE idprod=" . $articulo;
    $colores = Database::get_arreglo($sql);
    
    $respuesta = [
        'error' => false,
        'colores' => $colores
    ];
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'ID de artículo no válido'
    ];
}

echo json_encode($respuesta);
?>