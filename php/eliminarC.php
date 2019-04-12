<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conn =  ConexionBaseDatos();
$codigo = $_GET['codigo'];

$resultados = array();

$query = 'DELETE FROM curso WHERE `codigo` ="'.$codigo.'"';

$result = mysqli_query($conn , $query) or die('Consulta fallida: ' . mysqli_error());

$n = mysqli_affected_rows($conn);

if ($n!=0) {

	$resultados["validacion"] = "ok";
    $resultados["mensaje"] = "El curso se ha eliminado";

}else{
	$resultados["validacion"] = "error";
    $resultados["mensaje"] = "Algo salió mal";
}


mysqli_close($conn);

/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo '' . $resultadosJson . '';





?>
