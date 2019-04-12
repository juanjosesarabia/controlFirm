<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conn = ConexionBaseDatos();

$codigo = $_GET['codigo'];
$nombre = $_GET['nombre'];
$observaciones = $_GET['observaciones'];
$resultados = array();

$query1 = 'SELECT * FROM curso WHERE codigo ="' . $codigo . '"';
$result1 = mysqli_query($conn, $query1) or die('Consulta fallida: ' . mysqli_error());

if (!($row = mysqli_fetch_array($result1, MYSQLI_ASSOC))) {



$query = 'INSERT INTO curso(codigo, nombre, observaciones) VALUES ("' . $codigo . '","' . $nombre . '","' . $observaciones . '")';
$result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

if (!($result)) {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "no";

} else {
	$resultados["validacion"] = "ok";
    $resultados["mensaje"] = "Se registró correctamente";

}
mysqli_close($conn);

/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo '' . $resultadosJson . '';

}else{

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "El código Duplicado";

    $resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo '' . $resultadosJson . '';

}



?>
