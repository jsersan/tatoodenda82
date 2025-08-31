<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$id = $_POST['id'] ?? 0;
$img = $_POST['img'] ?? '';

if ($id > 0 && !empty($img)) {
    $sql = "UPDATE producto SET imagen = '" . $img . "' WHERE id=" . $id;

    $res = Database::ejecutar_idu($sql);
    $respuesta = [
        'error' => false,
        'sql' => $sql,
        'resultado' => $res
    ];
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'ID de producto o imagen no válidos'
    ];
}

echo json_encode($respuesta);
?>