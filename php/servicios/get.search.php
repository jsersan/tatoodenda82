<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$search = $_POST['search'] ?? '';

if (!empty($search)) {
    // Escapar el término de búsqueda para prevenir inyección SQL
    $search = htmlspecialchars($search, ENT_QUOTES, 'UTF-8');
    
    $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen 
            FROM producto 
            WHERE nombre LIKE '%" . $search . "%'";
            
    $prod = Database::get_arreglo($sql);

    $respuesta = [
        'error' => false,
        'consulta' => $sql,
        'prods' => $prod
    ];
    
    echo json_encode($respuesta);
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'Término de búsqueda no especificado'
    ];
    
    echo json_encode($respuesta);
}
?>