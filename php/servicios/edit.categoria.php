<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$id = $_POST['id'] ?? 0;
$nombre = $_POST['nombre'] ?? '';
$padre = $_POST['padre'] ?? 0;

if ($id > 0) {
    $sql = "UPDATE categoria SET nombre = '" . $nombre . "', padre=" . $padre . " WHERE id=" . $id;

    $res = Database::ejecutar_idu($sql);
    $respuesta = [
        'error' => false,
        'sql' => $sql,
        'resultado' => $res
    ];

    echo json_encode($respuesta);
}
?>