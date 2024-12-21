<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

    if (isset($_POST['id'])){
        $sql = "UPDATE producto SET imagen = '".$_POST['img']."' WHERE id=".$_POST['id'];

        $res = Database::ejecutar_idu($sql);
        $respuesta = array(
            'error' => false,
            'sql' => $sql,
			'resultado' => $res
		);

        echo json_encode( $respuesta );
    }