<?php
header('Access-Control-Allow-Origin: *');
$files = scandir ( "../../img/banner");
unset($files[0]);
unset($files[1]);

$respuesta = array(
			'error' => false,
			'imagenes' => $files 
		);

echo json_encode( $respuesta );


?>