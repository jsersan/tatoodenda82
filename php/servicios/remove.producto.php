<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

    if (isset($_POST['id'])){
        $sql = "DELETE FROM producto WHERE id=".$_POST['id'];

        $res = Database::ejecutar_idu($sql);
        $respuesta = array(
			'error' => false,
			'resultado' => $res
		);

        echo json_encode( $respuesta );
    }