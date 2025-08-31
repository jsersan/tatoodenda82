<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$id = $_POST['id'] ?? 0;
$nombre = $_POST['nombre'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$precio = $_POST['precio'] ?? 0;
$categoria = $_POST['categoria'] ?? 0;

if ($id > 0) {
    $sql = "UPDATE producto SET nombre = '" . $nombre . "', descripcion='" . $descripcion .
        "', precio=" . $precio . ", categoria=" . $categoria .
        " WHERE id=" . $id;

    $res = Database::ejecutar_idu($sql);
    $respuesta = [
        'error' => false,
        'sql' => $sql,
        'resultado' => $res
    ];

    echo json_encode($respuesta);
}
?>