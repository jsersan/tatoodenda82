<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

    if (isset($_POST['username']) && trim($_POST['username']) != ''){
        $sql = "UPDATE user SET username = '".$_POST['username']."' WHERE id=".$_POST['id'];
        $res = Database::ejecutar_idu($sql);
    }
    if (isset($_POST['pass']) && trim($_POST['pass']) != ''){
        $sql = "UPDATE user SET password = '".$_POST['pass']."' WHERE id=".$_POST['id'];
        $res = Database::ejecutar_idu($sql);
    }
    if (isset($_POST['email']) && trim($_POST['email']) != ''){
        $sql = "UPDATE user SET email = '".$_POST['email']."' WHERE id=".$_POST['id'];
        $res = Database::ejecutar_idu($sql);
    }
    if (isset($_POST['nombre']) && trim($_POST['nombre']) != ''){
        $sql = "UPDATE user SET nombre = '".$_POST['nombre']."' WHERE id=".$_POST['id'];
        $res = Database::ejecutar_idu($sql);
    }
    if (isset($_POST['direccion']) && trim($_POST['direccion']) != ''){
        $sql = "UPDATE user SET direccion = '".$_POST['direccion']."' WHERE id=".$_POST['id'];
        $res = Database::ejecutar_idu($sql);
    }
    if (isset($_POST['ciudad']) && trim($_POST['ciudad']) != ''){
        $sql = "UPDATE user SET ciudad = '".$_POST['ciudad']."' WHERE id=".$_POST['id'];
        $res = Database::ejecutar_idu($sql);
    }
    if (isset($_POST['cp']) && trim($_POST['cp']) != ''){
        $sql = "UPDATE user SET cp = '".$_POST['cp']."' WHERE id=".$_POST['id'];
        $res = Database::ejecutar_idu($sql);
    }

    $sql = "SELECT id, username, nombre, email, direccion, cp, ciudad FROM user WHERE id=".$_POST['id'];

    $user = Database::get_arreglo( $sql );

    $respuesta = array(
                'error' => false,
                'user' => $user 
            );

     echo json_encode( $respuesta );