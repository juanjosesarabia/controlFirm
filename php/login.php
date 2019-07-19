<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");


$conn = ConexionBaseDatos();
$usuario = $_GET['usuario'];
$password = $_GET['password'];

$info = array();
$envio = array();
$resultados = array();


$query = 'SELECT nombreU FROM usuarios WHERE correo ="' . $usuario . '" AND contrasena = "'. $password . '"';
$result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());


if (!($row = mysqli_fetch_array($result, MYSQLI_ASSOC))) {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "error al ingresar usuario o clave";

} else {

	$resultados["validacion"] = "ok";

    $resultados["mensaje"] = "Bienvenido";

      mysqli_data_seek($result, 0);
      $row = mysqli_fetch_row($result);
      $_SESSION["nombre"]= $row[0];


          //Liberas la memoria del resultado
    mysqli_free_result($result);

}
mysqli_close($conn);
$resultados["datos"] = $envio;

/* convierte a json */
$resultadosJson = json_encode($resultados);

echo '' . $resultadosJson . '';
?>
