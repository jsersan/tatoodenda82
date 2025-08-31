<?php
header("Access-Control-Allow-Origin: *");

// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$categoria = $_POST['categoria'] ?? null;

if ($categoria === null) {
    // Si no se especifica categoría, muestra los 8 últimos productos
    $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen 
            FROM producto ORDER BY id DESC LIMIT 8";
} else {
    $categoria = (int)$categoria;
    
    if ($categoria === 0) {
        // Mostrar todos los productos con su categoría
        $sql = "SELECT producto.id, producto.nombre as nombre, descripcion, precio, 
                carpetaimg, imagen, categoria.nombre as categoria 
                FROM producto, categoria 
                WHERE producto.categoria = categoria.id 
                ORDER BY id DESC";
    } else {
        // Comprobar si es categoría padre
        $stm = "SELECT id, padre FROM categoria WHERE id=" . $categoria;
        $row = Database::get_Row($stm);
        
        if (!empty($row) && $row['id'] == $row['padre']) {
            // Obtener todas las categorías cuyo padre es la categoría deseada
            $cursor = Database::get_Cursor("SELECT id FROM categoria WHERE padre=" . $categoria);
            
            if ($cursor && $cursor->num_rows > 0) {
                // Crear la consulta con cada categoria añadida
                $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen 
                        FROM producto WHERE ";
                        
                $condiciones = [];
                while ($cat = $cursor->fetch_assoc()) {
                    $condiciones[] = "categoria=" . $cat["id"];
                }
                
                $sql .= implode(" OR ", $condiciones);
            } else {
                // Si no hay subcategorías
                $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen 
                        FROM producto WHERE categoria=" . $categoria;
            }
        } else {
            // Es una subcategoría
            $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen 
                    FROM producto WHERE categoria=" . $categoria;
        }
    }
}

$prod = Database::get_arreglo($sql);

$respuesta = [
    'error' => false,
    'consulta' => $sql,
    'prods' => $prod
];

echo json_encode($respuesta);
?>