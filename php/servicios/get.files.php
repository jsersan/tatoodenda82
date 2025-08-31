<?php
header('Access-Control-Allow-Origin: *');

$folder = $_POST['folder'] ?? '';

if (!empty($folder)) {
    $ruta = "../../" . $folder;
    
    if (is_dir($ruta)) {
        $allfiles = scandir($ruta);
        
        // Filtrar los directorios . y ..
        $files = array_values(array_diff($allfiles, ['.', '..']));
        
        $respuesta = [
            'error' => false,
            'imagenes' => $files
        ];
    } else {
        $respuesta = [
            'error' => true,
            'mensaje' => 'El directorio no existe'
        ];
    }
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'Parámetro folder no especificado'
    ];
}

echo json_encode($respuesta);
?>