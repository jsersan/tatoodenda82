<?php
header('Access-Control-Allow-Origin: *');

$directorio = '../../img/banner';
$files = scandir($directorio);

// Filtrar los directorios . y .. 
$files = array_diff($files, ['.', '..']);

// Reiniciar los índices del array
$files = array_values($files);

$respuesta = [
    'error' => false,
    'imagenes' => $files
];

echo json_encode($respuesta);
?>