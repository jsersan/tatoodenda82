<?php
header('Access-Control-Allow-Origin: *');
$allfiles = scandir ( "../../".$_POST['folder']);

$files = array_values(array_diff($allfiles, array('.', '..')));

$respuesta = array(
			'error' => false,
			'imagenes' => $files 
		);

echo json_encode( $respuesta );

?>