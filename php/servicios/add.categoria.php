<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$padre = $_POST['padre'] ?? '';
if ($_POST['padre'] == 'sin') {
    $stm = "SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'bdshop' AND TABLE_NAME = 'categoria'";
    $padre = Database::get_row($stm)["AUTO_INCREMENT"] ?? 1;
}

$nombre = $_POST['nombre'] ?? '';
$sql = "INSERT INTO categoria VALUES (null, '" . $nombre . "', " . $padre . ")";

$res = Database::ejecutar_idu($sql);
$respuesta = [
    'error' => false,
    'padre' => $padre,
    'resultado' => $res
];

echo json_encode($respuesta);
?>
