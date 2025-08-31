<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$username = $_POST['username'] ?? '';
$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$direccion = $_POST['direccion'] ?? '';
$ciudad = $_POST['ciudad'] ?? '';
$cp = $_POST['cp'] ?? '';

$sql = "INSERT INTO user VALUES (null, '" .
       $username . "', '" .
       $nombre . "', '" .
       $email . "', '" .
       $password . "', '" .
       $direccion . "', '" .
       $ciudad . "', '" .
       $cp . "')";

$res = Database::ejecutar_idu($sql);
$respuesta = [
    'error' => false,
    'resultado' => $res
];

echo json_encode($respuesta);
?>