<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conn = ConexionBaseDatos();

$codigo = $_GET['codigo'];
$nombre = $_GET['nombre'];
$observaciones = $_GET['observaciones'];
$usuario1 = $_GET['id'];


$query = 'SELECT * FROM curso WHERE codigo ="' . $codigo. '"';
$result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

if (!($row = mysqli_fetch_array($result, MYSQLI_ASSOC))) {

$resultados = array();

	$query = 'UPDATE curso SET `codigo`= "'.$codigo.'" , `nombre`= "'.$nombre.'", `observaciones` ="'.$observaciones.'" WHERE `codigo` ="'.$usuario1.'"';
	$result = mysqli_query($conn, $query) or die('Consulta fallida'. mysqli_error());

	$n = mysqli_affected_rows($conn);

//////validacion de respuesta de
	if ($n!=0) {

    $resultados["validacion"] = "ok";
    $resultados["mensaje"] = "Los datos se han modificado";

} else {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "Algo salio mal, intenta de nuevo";


}


mysqli_close($conn);

/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

echo '' . $resultadosJson . '';


}else{
   		if ($codigo == $usuario1) {

   			$resultados = array();


$query = 'UPDATE curso SET `nombre`= "'.$nombre.'", `observaciones` ="'.$observaciones.'" WHERE `codigo` ="'.$usuario1.'"';
	$result = mysqli_query($conn, $query) or die('Consulta fallida');

	$n = mysqli_affected_rows($conn);


	if ($n!=0) {

    $resultados["validacion"] = "ok";
    $resultados["mensaje"] = "Los datos se han actualizado con exito";

} else {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "no se pudo actualizar los datos";


}


mysqli_close($conn);

/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

echo '' . $resultadosJson . '';

}else{

  $resultados["validacion"] = "error";
  $resultados["mensaje"] = "Registro duplicado";

    		$resultadosJson = json_encode($resultados);
			     echo '' . $resultadosJson . '';

}
}
?>
