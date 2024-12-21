<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

    $date = date('Y-m-d', time());

    $sql = "INSERT INTO pedido VALUES (null,".$_POST['iduser'].", '".$date."', ".$_POST['total'].")";
    $idpedido = Database::ejecutar_idu($sql);

    $pedido = json_decode($_POST['pedido']);
    foreach ($pedido as $idprod => $prodstr) {
        $prod = json_decode($prodstr);
        foreach ($prod as $car => $info) {
           if ($car != "precio" && $car != "nombre" && !endsWith($car, 'img')) {
                $sql = "INSERT INTO lineapedido VALUES (null,".$idpedido.", ".$idprod.", '".$car."', ".$info.")";
                Database::ejecutar_idu($sql);
           }
        }
    }

    $respuesta = array(
        'error' => false,
        'date' => $date
    );


echo json_encode( $respuesta );

function endsWith($haystack, $needle)
{
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }

    return (substr($haystack, -$length) === $needle);
}

?>