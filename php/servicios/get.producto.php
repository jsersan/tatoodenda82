<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$articulo = $_POST['articulo'] ?? 0;

if ($articulo > 0) {
    $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen, categoria 
            FROM producto WHERE id=" . $articulo;

    $art = Database::get_arreglo($sql);

    $respuesta = [
        'error' => false,
        'articulo' => $art
    ];
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'ID de artículo no válido'
    ];
}

echo json_encode($respuesta);
?>