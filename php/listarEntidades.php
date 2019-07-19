<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conn = ConexionBaseDatos();

	$envio = array();
  $n;

$resultados = array();

///
$query = 'SELECT nombreI FROM institucion';
$respuesta = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

if (!($row = mysqli_fetch_array($respuesta, MYSQLI_ASSOC))) {
     $resultados["validacion"] = "error";
     $resultados["mensaje"] = "No se pueden cargar los datos";

} else {
	$n = mysqli_num_rows($respuesta);// retorna un numero de filas de la bd
	$resultados["validacion"] = "ok";
	$resultados["n"] = $n;

	if (isset($_SESSION['nombre'])){
	$resultados["sesion"] = $_SESSION["nombre"];
}


  mysqli_data_seek($respuesta, 0);// esta parte para ver si carga todo
	while( $row = mysqli_fetch_array($respuesta)){
					$nomE = $row['nombreI'];

				$info = array("nombreI" => $nomE);
				array_push($envio, $info);
				}



//Liberas la memoria del resultado
mysqli_free_result($respuesta);
}
mysqli_close($conn);

$resultados["datos"] = $envio;
/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

echo '' . $resultadosJson . '';
?>
