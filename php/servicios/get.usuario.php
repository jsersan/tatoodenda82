<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$username = $_POST['user'] ?? '';
$password = $_POST['pass'] ?? null;

if (!empty($username)) {
    if ($password !== null) {
        // Caso de login: buscar usuario y contraseña
        $sql = "SELECT id, username, nombre, email, direccion, cp, ciudad 
                FROM user 
                WHERE username='" . $username . "' 
                AND password='" . $password . "'";
    } else {
        // Caso de verificación: buscar solo por username
        $sql = "SELECT id FROM user WHERE username='" . $username . "'";
    }

    $user = Database::get_arreglo($sql);

    $respuesta = [
        'error' => false,
        'user' => $user
    ];
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'Nombre de usuario no especificado'
    ];
}

echo json_encode($respuesta);
?>