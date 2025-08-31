<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$id = $_POST['id'] ?? 0;

if ($id > 0) {
    $sql = "SELECT idpedido, nombre, color, cant FROM pedido, lineapedido, producto 
            WHERE idpedido = pedido.id AND idprod = producto.id AND iduser = " . $id;
    $lineas = Database::get_arreglo($sql);
    
    $sql = "SELECT DISTINCT(id), fecha, total FROM pedido 
            WHERE iduser = " . $id . " ORDER BY fecha DESC";
    $pedidos = Database::get_arreglo($sql);
    
    $respuesta = [
        'error' => false,
        'pedidos' => $pedidos,
        'lineas' => $lineas
    ];
} else {
    $respuesta = [
        'error' => true,
        'mensaje' => 'ID de usuario no válido'
    ];
}

echo json_encode($respuesta);
?>