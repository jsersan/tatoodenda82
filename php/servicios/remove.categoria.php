<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$id = $_POST['id'] ?? 0;

if ($id > 0) {
    $sql = "DELETE FROM categoria WHERE id=" . $id;

    $res = Database::ejecutar_idu($sql);
    $respuesta = [
        'error' => false,
        'resultado' => $res
    ];
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'ID de categoría no válido'
    ];
}

echo json_encode($respuesta);
?>