<?php
header( "Access-Control-Allow-Origin: *" );

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(0);
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

if (!isset($_POST['categoria'])) {
    $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen FROM producto ORDER BY id DESC LIMIT 8";
} else {
    $categoria = $_POST['categoria'];
    if ($categoria == 0) {
        $sql = "SELECT producto.id, producto.nombre as nombre, descripcion, precio, carpetaimg, imagen, categoria.nombre as categoria 
                FROM producto, categoria WHERE producto.categoria = categoria.id ORDER BY id DESC";
    } else {
        //Comprobar si es categoria padre
        $stm = "SELECT id, padre FROM categoria WHERE id=".$categoria;
        $row = Database::get_Row($stm);
        if ($row['id'] == $row['padre']) {
            //Obtener todas las categorías cuyo padre es la categoría deseada;
            $cursor = Database::get_Cursor("SELECT id FROM categoria WHERE padre=".$categoria);

            //Crear la consulta con cada categoria añadida en $array
            $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen FROM producto WHERE ";
            while ($cat = $cursor->fetch_assoc()){
                $sql = $sql."categoria=".$cat["id"]." OR ";
            }
            $sql = substr($sql, 0, strrpos($sql, " OR "));
        } else {
            $sql = "SELECT id, nombre, descripcion, precio, carpetaimg, imagen FROM producto WHERE categoria=".$categoria;
        }
    }
    
}

$prod = Database::get_arreglo( $sql );


$respuesta = array(
            'error' => false,
            'consulta' => $sql,
			'prods' => $prod 
		);


echo json_encode( $respuesta );


?>