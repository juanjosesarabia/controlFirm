<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");

function ConexionBaseDatos()
{

   $host = "localhost";
   $usuario = "root";
   $password = "";
   $BaseDatos = "gobernacion";

   $conn = new mysqli($host,$usuario,$password,$BaseDatos);

    if (!$conn) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    exit;
}

   return $conn;
}


?>
