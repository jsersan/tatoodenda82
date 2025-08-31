<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$id = $_POST['id'] ?? 0;

if ($id > 0) {
    $campos_actualizados = false;
    
    // Actualizamos solo los campos que vienen en la petición y no están vacíos
    if (isset($_POST['username']) && trim($_POST['username']) !== '') {
        $sql = "UPDATE user SET username = '" . $_POST['username'] . "' WHERE id=" . $id;
        Database::ejecutar_idu($sql);
        $campos_actualizados = true;
    }
    
    if (isset($_POST['pass']) && trim($_POST['pass']) !== '') {
        $sql = "UPDATE user SET password = '" . $_POST['pass'] . "' WHERE id=" . $id;
        Database::ejecutar_idu($sql);
        $campos_actualizados = true;
    }
    
    if (isset($_POST['email']) && trim($_POST['email']) !== '') {
        $sql = "UPDATE user SET email = '" . $_POST['email'] . "' WHERE id=" . $id;
        Database::ejecutar_idu($sql);
        $campos_actualizados = true;
    }
    
    if (isset($_POST['nombre']) && trim($_POST['nombre']) !== '') {
        $sql = "UPDATE user SET nombre = '" . $_POST['nombre'] . "' WHERE id=" . $id;
        Database::ejecutar_idu($sql);
        $campos_actualizados = true;
    }
    
    if (isset($_POST['direccion']) && trim($_POST['direccion']) !== '') {
        $sql = "UPDATE user SET direccion = '" . $_POST['direccion'] . "' WHERE id=" . $id;
        Database::ejecutar_idu($sql);
        $campos_actualizados = true;
    }
    
    if (isset($_POST['ciudad']) && trim($_POST['ciudad']) !== '') {
        $sql = "UPDATE user SET ciudad = '" . $_POST['ciudad'] . "' WHERE id=" . $id;
        Database::ejecutar_idu($sql);
        $campos_actualizados = true;
    }
    
    if (isset($_POST['cp']) && trim($_POST['cp']) !== '') {
        $sql = "UPDATE user SET cp = '" . $_POST['cp'] . "' WHERE id=" . $id;
        Database::ejecutar_idu($sql);
        $campos_actualizados = true;
    }
    
    if ($campos_actualizados) {
        $sql = "SELECT id, username, nombre, email, direccion, cp, ciudad FROM user WHERE id=" . $id;
        $user = Database::get_arreglo($sql);
        
        $respuesta = [
            'error' => false,
            'user' => $user
        ];
    } else {
        $respuesta = [
            'error' => true,
            'mensaje' => 'No se proporcionaron campos para actualizar'
        ];
    }
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'ID de usuario no válido'
    ];
}

echo json_encode($respuesta);
?>