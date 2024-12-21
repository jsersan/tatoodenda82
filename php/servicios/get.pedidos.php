<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

if (isset($_POST['id'])) {
    $sql = "SELECT idpedido, nombre, color, cant  FROM pedido, lineapedido, producto WHERE idpedido = pedido.id AND idprod = producto.id AND iduser = ".$_POST['id'];
    $lineas = Database::get_arreglo( $sql );
    $sql = "SELECT distinct(id), fecha, total FROM pedido WHERE iduser = ".$_POST['id']." ORDER BY fecha desc";
    $pedidos = Database::get_arreglo($sql);
    $respuesta = array(
			'error' => false,
            'pedidos' => $pedidos,
            'lineas' => $lineas
		);

} else {
    $respuesta = array(
        'error' => true
    );
}


echo json_encode( $respuesta );


?>