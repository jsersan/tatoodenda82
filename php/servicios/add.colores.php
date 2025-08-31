<?php
header('Access-Control-Allow-Origin: *');
// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

// Los colores llegan en un string así: color;imagen/color2;imagen2/
$strcolor = $_POST['colores'] ?? '';
$art = $_POST['id'] ?? 0;
$colores = explode("/", $strcolor);
// Eliminar el último elemento que es vacío después del último "/"
array_pop($colores);

foreach ($colores as $color) {
    $arrcolor = explode(";", $color);
    
    if (count($arrcolor) === 2) {
        $sql = "INSERT INTO color VALUES (" . $art . ",'" . $arrcolor[0] . "', '" . $arrcolor[1] . "')";
        $res = Database::ejecutar_idu($sql);
    }
}

$respuesta = [
    'error' => false,
    'color' => $colores
];

echo json_encode($respuesta);
?>