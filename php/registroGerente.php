<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conn = ConexionBaseDatos();

$nombreI = $_GET['nombreI'];
$nombreG = $_GET['nombre'];
$telefono = $_GET['telefono'];
$firma = $_GET['firma'];

$resultados = array();

$query = 'UPDATE municipio, institucion, firma SET `fechaFinal` = "'.$firma.'", `ngerente`= "' . $nombreG . '", `telefono` ="' . $telefono . '" WHERE `nombreI` = "' . $nombreI . '" and  municipio.id_institucion = institucion.id_institucion AND institucion.id_firma = firma.id_firma';


$result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

if (!($result)) {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "No se pudo actualizar";

} else {
	$resultados["validacion"] = "ok";
    $resultados["mensaje"] = "Se actualizó correctamente";

}

mysqli_close($conn);

/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo '' . $resultadosJson . '';


?>
