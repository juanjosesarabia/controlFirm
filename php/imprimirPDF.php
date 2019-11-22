<?php
require '../vendor/autoload.php';

require ('conexion.php');
// recoger el contenido del otro fichero
ob_start();


?>

 <page backtop="0.2%" backbottom="5%" backleft="0,2%"backright="5%"> 
<h4 style="text-align:center; padding:0; margin:0;"><img src="../img/controlfirm.png" alt="logo" height="50" width="60" style="padding:0; margin:0;">  </h4>
<h4 style="text-align:center;margin-top:0;"> CONTROL DE FIRMAS </h4>
 <style>
 table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
    <table  style="width=100%; border:1px">
              <tr >
                <th >Zodes</th>
                <th >Municipio</th>
                <th >Nombre de Instituci&#243;n de Salud </th>
				<th >Gerente </th>
                <th >Teléfono </th>
                <th >Fecha final</th>
                <th >Días Restantes</th>
              </tr>
             <?php
			 $conn = ConexionBaseDatos();
///
$query = 'SELECT zode,nombre,nombreI,ngerente, telefono, fechaFinal, dias FROM institucion, municipio, firma where municipio.id_institucion = institucion.id_institucion AND institucion.id_firma = firma.id_firma';
$respuesta = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysqli_error());

mysqli_data_seek($respuesta, 0);// esta parte para ver si carga todo
	while( $row = mysqli_fetch_array($respuesta)){
       
	   ?>
	   <tr>
			<td style="font-size:12px;" style=" border: 1px solid black; border-collapse: collapse;"><?php	echo $row['zode'];?></td>
			<td style="font-size:12px;"><?php	echo $row['nombre'];?></td>
			<td style="font-size:12px;"><?php	echo $row['nombreI'];?></td>
			<td style="font-size:12px;"><?php	echo $row['ngerente'];?></td>
			<td style="font-size:12px;"><?php	echo $row['telefono'];?></td>
			<td style="font-size:12px;"><?php	echo  $row['fechaFinal'];?></td>
			<?php
			 if($row['dias']<=30){?>
				 <td style="font-size:12px; text-align:center;color:red;"><?php	echo  $row['dias'];?></td>
				 <?php
			 }else{ ?>
				 <td style="font-size:12px; text-align:center;"><?php	echo  $row['dias'];?></td>
				  <?php
					}
					?>
				
				 
				 
			

	   </tr>	
          <?php
				}
           ?>		  
			             
			</table><br>
			<div class="footer-copyright text-center py-3">Copyright© Ing. Juan José Sarabia Caffroni<br>
			
		 </div>
		 <?php echo date("l jS \of F Y h:i:s A") . "<br>";?>
 </page> 





<?php
require '../vendor/autoload.php';

use Spipu\Html2Pdf\Html2Pdf;


$html = ob_get_clean();

$html2pdf = new Html2Pdf('L','LEGAL','es','true','UTF-8');
$html2pdf->writeHTML($html);
$html2pdf->output('Proximas firmas a vencer.pdf');

?>