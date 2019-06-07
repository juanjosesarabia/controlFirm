<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conn = ConexionBaseDatos();

$usuario = $_GET['id'];

$envio = array();
$resultados = array();

$query ='SELECT zode,nombre,nombreI,ngerente,telefono,fechaFinal FROM municipio, firma, institucion where municipio.id_institucion = institucion.id_institucion AND institucion.id_firma = firma.id_firma and nombreI = "' . $usuario . '"';
$result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

if (!($row = mysqli_fetch_array($result, MYSQLI_ASSOC))) {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "Entidad no registrada";

} else {

    $resultados["validacion"] = "ok";


        mysqli_data_seek($result, 0);
         $row = mysqli_fetch_array($result);
		     $aliados = array("zode"=>$row[0],"nombre" => $row[1], "nombreI" => $row[2] ,"ngerente" => $row[3] ,"telefono" => $row[4],"fechaFinal" => $row[5]);

		array_push($envio, $aliados);


 //Liberas el resultado
mysqli_free_result($result);
}
mysqli_close($conn);


$resultados["entidad"] = $envio;
/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo '' . $resultadosJson . '';



?>
