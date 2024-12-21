<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

//Los colores llegan en un string así: color;imagen/color2;imagen2/
$strcolor = $_POST['colores'];
$art = $_POST['id'];
$colores = explode("/",$strcolor);
unset($colores[count($colores)-1]);
foreach($colores as $color) {
    $arrcolor = explode(";",$color);
    $sql = "INSERT INTO color VALUES (".$art.",'".$arrcolor[0]."', '".$arrcolor[1]."')";
    $res = Database::ejecutar_idu($sql);
}


    $respuesta = array(
        'error' => false,
        'color' => $colores
    );


echo json_encode( $respuesta );