<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conn = ConexionBaseDatos();

$identificacion = $_GET['identificacion']; // se toman los valores que mando el json de los datos de estudiantes
$nombres = $_GET['nombres'];
$apellidos = $_GET['apellidos'];
$genero = $_GET['genero'];

$resultados = array();

$query1 = 'SELECT * FROM estudiante WHERE identificacion ="' . $identificacion . '"';
$result1 = mysqli_query($conn, $query1) or die('Consulta fallida: ' . mysqli_error());

if (!($row = mysqli_fetch_array($result1, MYSQLI_ASSOC))) {

    $query = 'INSERT INTO estudiante(identificacion, nombres, apellidos, genero) VALUES ("' . $identificacion . '","' . $nombres . '","' . $apellidos . '","' . $genero . '")';
$result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

if (!($result)) {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "no se pudo registrar";

} else {
	  $resultados["validacion"] = "ok";
    $resultados["mensaje"] = "Se registró correctamente";

}
mysqli_close($conn);

$resultadosJson = json_encode($resultados);

echo '' . $resultadosJson . '';

} else {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "Identificacion Duplicada";

    $resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo '' . $resultadosJson . '';

}
?>
