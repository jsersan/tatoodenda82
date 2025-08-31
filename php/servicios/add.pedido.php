<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

$date = date('Y-m-d', time());
$iduser = $_POST['iduser'] ?? 0;
$total = $_POST['total'] ?? 0;

$sql = "INSERT INTO pedido VALUES (null, " . $iduser . ", '" . $date . "', " . $total . ")";
$idpedido = Database::ejecutar_idu($sql);

$pedidoStr = $_POST['pedido'] ?? '{}';
$pedido = json_decode($pedidoStr);

foreach ($pedido as $idprod => $prodstr) {
    $prod = json_decode($prodstr);
    foreach ($prod as $car => $info) {
        if ($car != "precio" && $car != "nombre" && !str_ends_with($car, 'img')) {
            $sql = "INSERT INTO lineapedido VALUES (null, " . $idpedido . ", " . $idprod . ", '" . $car . "', " . $info . ")";
            Database::ejecutar_idu($sql);
        }
    }
}

$respuesta = [
    'error' => false,
    'date' => $date
];

echo json_encode($respuesta);

// Función para verificar si una cadena termina con otra - ya no es necesaria en PHP 8
// function endsWith($haystack, $needle) {
//     $length = strlen($needle);
//     if ($length == 0) {
//         return true;
//     }
//     return (substr($haystack, -$length) === $needle);
// }
?>