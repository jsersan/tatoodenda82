<?php
header('Access-Control-Allow-Origin: *');

$carpeta = $_POST['carpetaimg'] ?? '';
$id = $_POST['id'] ?? 0;
$strFiles = '';

if (!empty($carpeta) && $id > 0 && isset($_FILES['files'])) {
    $total = count($_FILES['files']['name']);
    
    // Asegúrate de que el directorio existe
    $directorio = "../../img/" . $carpeta;
    if (!is_dir($directorio)) {
        mkdir($directorio, 0755, true);
    }
    
    for ($i = 0; $i < $total; $i++) {
        // Ruta temporal
        $tmpFilePath = $_FILES['files']['tmp_name'][$i];
        
        if (!empty($tmpFilePath)) {
            // Nueva ruta (servidor)
            $newFilePath = $directorio . "/" . $_FILES['files']['name'][$i];
            
            // Subir el archivo al servidor
            if (move_uploaded_file($tmpFilePath, $newFilePath)) {
                // Añadirlo al string con los nombres
                $strFiles .= $_FILES['files']['name'][$i] . ";";
            }
        }
    }
    
    echo $id;
} else {
    echo json_encode([
        'error' => true,
        'mensaje' => 'Parámetros no válidos o archivos no enviados'
    ]);
}
?>