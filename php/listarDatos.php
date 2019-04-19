<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conne = ConexionBaseDatos();

	$envio = array();
  $n;

$resultados = array();

$actualizarFechaA = 'UPDATE firma SET fechaActual= curdate()';// actualizar fecha actual en la base de datos
$respuestaF = mysqli_query($conne, $actualizarFechaA) or die('Consulta fallida: ' . mysqli_error());
////
$n1=50;
for ($i=0; $i <$n1 ; $i++) {/// actualizar dias restantes en la base de datos
	$diasRestantes = 'UPDATE firma SET dias= datediff(fechaFinal,fechaActual) where id_firma="'.$i.'"';
	$respuestaD = mysqli_query($conne, $diasRestantes) or die('Consulta fallida: ' . mysqli_error());
}
mysqli_close($conne);
$conn = ConexionBaseDatos();
///
$query = 'SELECT zode,nombre,nombreI,ngerente, telefono, fechaFinal, dias FROM institucion, municipio, firma where municipio.id_institucion = institucion.id_institucion AND institucion.id_firma = firma.id_firma';
$respuesta = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

if (!($row = mysqli_fetch_array($respuesta, MYSQLI_ASSOC))) {
     $resultados["validacion"] = "error";
     $resultados["mensaje"] = "No se pueden cargar los datos";

} else {

	$n = mysqli_num_rows($respuesta);// retorna un numero de filas de la bd
	$resultados["validacion"] = "ok";
	$resultados["n"] = $n;


	while($row = mysqli_fetch_array($respuesta)) {

					$zo = $row['zode'];
					$nomM = $row['nombre'];
					$nomE = $row['nombreI'];
					$ngere = $row['ngerente'];
					$tel = $row['telefono'];
					$fecha = $row['fechaFinal'];
					$dia = $row['dias'];

				$info = array("zode"=>$zo, "nombre" => $nomM,"nombreI" => $nomE,"ngerente" => $ngere,"telefono" => $tel,"fechaFinal" => $fecha, "dias" => $dia);
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
