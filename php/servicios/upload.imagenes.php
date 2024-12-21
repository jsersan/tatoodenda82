<?php
header('Access-Control-Allow-Origin: *');
$carpeta = $_POST['carpetaimg'];

if (isset($_FILES['files'])) {
    $total = count($_FILES['files']['name']);
    $strfiles;

    for( $i=0 ; $i < $total ; $i++ ) {

        //Ruta temporal
        $tmpFilePath = $_FILES['files']['tmp_name'][$i];

        if ($tmpFilePath != ""){
            //Nueva ruta (servidor)
            $newFilePath = "../../img/".$carpeta."/". $_FILES['files']['name'][$i];

            //Subir el archivo al servidor
            move_uploaded_file($tmpFilePath, $newFilePath);

            //Añadirlo al string con los nombres 
            $strfiles += $_FILES['files']['name'][$i].";";

        }
    }

}

echo $_POST['id'];