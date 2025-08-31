<?php
header("Access-Control-Allow-Origin: *");

// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$id = $_POST['id'] ?? 0;

if ($id > 0) {
    $sql = "SELECT id, nombre, padre FROM categoria WHERE id=" . $id;

    $cat = Database::get_arreglo($sql);

    $respuesta = [
        'error' => false,
        'categoria' => $cat
    ];
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'ID de categoría no válido'
    ];
}

echo json_encode($respuesta);
?>