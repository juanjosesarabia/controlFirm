<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conn =  ConexionBaseDatos();
$identificacion = $_GET['identificacion'];

$resultados = array();

$query = 'DELETE FROM estudiante WHERE `identificacion` ="'.$identificacion.'"';

$result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

$n = mysqli_affected_rows($conn);

if ($n!=0) {

	$resultados["validacion"] = "ok";
    $resultados["mensaje"] = "Se ha eliminado el estudiante";

}else{
	$resultados["validacion"] = "error";
    $resultados["mensaje"] = "Algo salio mal, no se realizó la eliminación";
}


mysqli_close($conn);

/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);


echo '' . $resultadosJson . '';





?>
