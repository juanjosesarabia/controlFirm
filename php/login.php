<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");


$conn = ConexionBaseDatos();
$usuario = $_GET['usuario'];
$password = $_GET['password'];

$resultados = array();


$query = 'SELECT * FROM usuarios WHERE correo ="' . $usuario . '" AND contrasena = "'. $password . '"';
$result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error($conn));

if (!($row = mysqli_fetch_array($result, MYSQLI_ASSOC))) {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "error al ingresar usuario o clave";

} else {

    $resultados["validacion"] = "ok";
    $resultados["mensaje"] = "Bienvenido";

}
mysqli_close($conn);

/* convierte a json */
$resultadosJson = json_encode($resultados);

echo '' . $resultadosJson . '';
?>
