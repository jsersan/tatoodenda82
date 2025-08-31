<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$nombre = $_POST['nombre'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$precio = $_POST['precio'] ?? 0;
$categoria = $_POST['categoria'] ?? 0;
$carpetaimg = $_POST['carpetaimg'] ?? '';

$sql = "INSERT INTO producto VALUES (null, '" . $nombre . "', '" . $descripcion . "', " . $precio . ", '" . $carpetaimg . "', '', " . $categoria . ")";

$contenidoimg = scandir('../../img');
$existe = in_array($carpetaimg, $contenidoimg);

if (!$existe) {
    mkdir('../../img/' . $carpetaimg, 0755, true);
}

$res = Database::ejecutar_idu($sql);
$respuesta = [
    'error' => false,
    'id' => $res
];

echo json_encode($respuesta);
?>