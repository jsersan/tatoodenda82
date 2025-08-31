<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$color = $_POST['color'] ?? '';
$articulo = $_POST['articulo'] ?? 0;

if (!empty($color) && $articulo > 0) {
    $sql = "SELECT color, imagen FROM color WHERE idprod=" . $articulo . " AND color='" . $color . "'";
    $colores = Database::get_arreglo($sql);
    
    $respuesta = [
        'error' => false,
        'colores' => $colores
    ];
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'Parámetros no válidos'
    ];
}

echo json_encode($respuesta);
?>