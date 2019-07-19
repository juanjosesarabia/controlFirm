<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
include("conexion.php");

$conn = ConexionBaseDatos();



$envio = array();
$resultados = array();

$query ='SELECT nombre,nombreI,ngerente,fechaFinal, dias FROM municipio, firma, institucion where municipio.id_institucion = institucion.id_institucion AND institucion.id_firma = firma.id_firma and dias<=30';
$result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

if (!($row = mysqli_fetch_array($result, MYSQLI_ASSOC))) {

    $resultados["validacion"] = "error";
    $resultados["mensaje"] = "Correo no Enviado";

} else {

    $resultados["validacion"] = "ok";

    mysqli_data_seek($result, 0);
    while( $row = mysqli_fetch_array($result)){

          $info = array("nombre" => $row[0], "nombreI" => $row[1] ,"ngerente" => $row[2],"fechaFinal" => $row[3],"dias" => $row[4]);
          $mensaje = implode(" , ", $info);
  				array_push($envio, $mensaje);
  				}


 //Liberas el resultado
mysqli_free_result($result);
}
mysqli_close($conn);

$mensaje2 = implode(";", $envio);
//print_r( $mensaje2);



//mail("jujosaca2013@hotmail.com","PROXIMAS FIRMAS A VENCER ",$mensaje2 );


//$resultados["entidad"] = $envio;
/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo '' . $resultadosJson . '';



?>
