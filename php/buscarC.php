<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conn = ConexionBaseDatos();

$usuario = $_GET['id'];

$envio = array();
$resultados = array();


$query = 'SELECT * FROM curso WHERE codigo ="' . $usuario . '"';
$result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

if (!($row = mysqli_fetch_array($result, MYSQLI_ASSOC))) {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "El curso no esta registrado";

} else {

    $resultados["validacion"] = "ok";

    mysqli_data_seek($result, 0);
     $row = mysqli_fetch_array($result);
     $curso = array("codigo"=>$row[0], "nombre" => $row[1] ,"observaciones" => $row[2]);

		array_push($envio, $curso);



 //Liberas el resultado
mysqli_free_result($result);
}

mysqli_close($conn);



$resultados["curso"] = $envio;
/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo '' . $resultadosJson . '';




?>
