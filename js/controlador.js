$(document).ready(function(){

    });

localStorage["host"] = "http://192.168.1.54/controlFirm/"
var nombreUsuario;

$('#login').submit(function () {// vaidacion del login

    // recolecta datos ingresados por el usuario en el login
    var datosUsuario = $("#login-nombre").val();
    var datosPassword = $("#login-clave").val();

    $.getJSON(localStorage["host"] + "php/login.php", {usuario: datosUsuario, password: datosPassword})
          .done(function (respuestaServer) {

              if (respuestaServer.validacion == "ok") {
                    arreglo = respuestaServer.datos;

                  window.location.href = 'vista/inicio.html';

              } else {

                  alert("Datos ingresados Incorrectos, ingresar nuevamente");
              }
          })
  return false;
});

var vencer=0;


function listarDatosFirmas() {

  $.getJSON(localStorage["host"] + "php/listarDatos.php")
            .done(function (respuestaServ) {

                if (respuestaServ.validacion=="ok") {

                 arreglo = respuestaServ.datos;
   					     cantidad = respuestaServ.n;
                 nombreUsuario = respuestaServ.sesion;

                 if (nombreUsuario!==undefined) {
                     document.getElementById('nombreUsuario').innerHTML=nombreUsuario ;
                  }

   					for (var i = 0; i < cantidad; i++) {

                zode = arreglo[i].zode;
                nombre = arreglo[i].nombre;
                nombreI = arreglo[i].nombreI;
                ngerente = arreglo[i].ngerente;
                telefono = arreglo[i].telefono;
                fechaFinal = arreglo[i].fechaFinal;
                dias= arreglo[i].dias;


                                    var newTr= document.createElement("tr");
                                    var newTd1 = document.createElement("td");
                                    var newB1 = document.createElement("span");
                                    newB1.setAttribute("class","ui-table-cell-label");
                                    newB1.innerHTML=zode;

                                    var newTd2 = document.createElement("td");
                                    var newB2 = document.createElement("span");
                                    newB2.setAttribute("class","ui-table-cell-label");
                                    newB2.innerHTML=nombre;

                                    var newTd3 = document.createElement("td");
                                    var newB3 = document.createElement("span");
                                    newB3.setAttribute("class","ui-table-cell-label");
                                    newB3.innerHTML=nombreI;

                                    var newTd4 = document.createElement("td");
                                    var newB4 = document.createElement("span");
                                    newB4.setAttribute("class","ui-table-cell-label");
                                    newB4.innerHTML=ngerente;

                                    var newTd5 = document.createElement("td");
                                    var newB5 = document.createElement("span");
                                    newB5.setAttribute("class","ui-table-cell-label");
                                    newB5.innerHTML=telefono;

                                    var newTd6 = document.createElement("td");
                                    var newB6 = document.createElement("span");
                                    newB6.setAttribute("class","ui-table-cell-label");
                                    newB6.innerHTML=fechaFinal;

                                    var newTd7 = document.createElement("td");
                                    var newB7 = document.createElement("span");
                                    newB7.setAttribute("class","ui-table-cell-label");
                                    newB7.innerHTML=dias;
                                    var a = parseInt(dias);

                                    if(a<=15){
                                      newB7.setAttribute("class","text-danger");
                                      //newTd7.setAttribute("class","bg-danger");
                                      //  $(newb7).css("background-color", "red");
                                      vencer++;
                                      document.getElementById("notificacion").innerHTML=vencer;
                                      $('#iconoInactivo').hide();
                                      $('#iconoActivo').show();

                                      //prueba para modals
                                      var p, completo;
                                      p=ngerente;
                                      var a;
                                      a=nombre;
                                      completo = nombre.bold()+" : "+ngerente+"<strong> Días</strong> : "+dias ;
                                      var algo = document.createElement("p");
                                      algo.innerHTML=completo;
                                      $( "#cuerpoModal" ).append(algo);

                                    }else{
                                      newB7.setAttribute("class","text-success");
                                    //  newB7.setAttribute("class","text-white");
                                    //  newTd7.setAttribute("class","bg-success");
                                    }


                                    // añade los elementos creados y su contenido
                                    var currentDiv = document.getElementById("tbody");
                                      currentDiv.appendChild(newTr);
                                      newTr.appendChild(newTd1);
                                      newTd1.appendChild(newB1);

                                      newTr.appendChild(newTd2);
                                      newTd2.appendChild(newB2);

                                      newTr.appendChild(newTd3);
                                      newTd3.appendChild(newB3);

                                      newTr.appendChild(newTd4);
                                      newTd4.appendChild(newB4);

                                      newTr.appendChild(newTd5);
                                      newTd5.appendChild(newB5);

                                      newTr.appendChild(newTd6);
                                      newTd6.appendChild(newB6);

                                      newTr.appendChild(newTd7);
                                      newTd7.appendChild(newB7);



          }//fin del for
          nombreUsuario = respuestaServ.sesion;

          if (nombreUsuario!==undefined) {
              document.getElementById('nombreUsuario').innerHTML=nombreUsuario ;
           }

                }else{

                  alert(respuestaServ.mensaje);
                }


               });

            };

 function listarEntidades(){

   $.getJSON(localStorage["host"] + "php/listarEntidades.php")
             .done(function (respuestaServ) {
                   var nombreI;
                 if (respuestaServ.validacion=="ok") {
                      arreglo = respuestaServ.datos;
                      cantidad = respuestaServ.n;
					  
					    nombreUsuario = respuestaServ.sesion;

                 if (nombreUsuario!==undefined) {
                     document.getElementById('nombreUsuario').innerHTML=nombreUsuario ;
                  }

                      for (var i = 0; i < cantidad; i++) {
                         nombreI = arreglo[i].nombreI;

                                     var x = document.createElement("OPTION");
                                     var t = document.createTextNode(nombreI);
                                     //x.setAttribute("value", i);
                                     x.appendChild(t);
                                     document.getElementById("listaEse").appendChild(x);
           }//fin del for
                 }else{
                   alert(respuestaServ.mensaje);
                 }
                });

             };



function validarEntidad(){// Validar la entidad
  var datoEntidad = document.getElementById("entidad").value;

    if (datoEntidad.length == 0) {
       alert("Debes seleccionar una entidad");
          } else {
                    $.getJSON(localStorage["host"] + "php/buscarEntidad.php",{id:datoEntidad})
                                         .done(function (respuestaServer) {
                                             if (respuestaServer.validacion == "ok") {
                                               doc = respuestaServer.entidad;
                                               zode = document.getElementById("Zodes");
                                               zode.value =doc[0].zode;
                                               nom = document.getElementById("Municipio");
                                               nom.value =doc[0].nombre;
                                               ap = document.getElementById("nombreI");
                                               ap.value =doc[0].nombreI;
                                               geren = document.getElementById("nombreG");
                                               geren.value =doc[0].ngerente;
                                               tel = document.getElementById("telefono");
                                               tel.value =doc[0].telefono;
                                               fech = document.getElementById("firmaF");
                                               fech.value =doc[0].fechaFinal;
                                              document.getElementById("nombreG").removeAttribute("disabled");
                                              document.getElementById("telefono").removeAttribute("disabled");
                                              document.getElementById("firmaF").removeAttribute("disabled");
                                              document.getElementById("botonGuardar").removeAttribute("disabled");


                                             } else {
                                                 alert(respuestaServer.mensaje);
                                             }
                                         })

                    }
             }

function actualizarGerente(){//Actualizar gerente
              // se recolectan los datos ingresados al formulario
            var nombreIs= $("#nombreI").val();
            var nombreG = $("#nombreG").val();
            var telefono = $("#telefono").val();
            var firmaF = $("#firmaF").val();

             $.getJSON(localStorage["host"] + "php/registroGerente.php", {nombreI: nombreIs, nombre: nombreG, telefono: telefono, firma: firmaF,})
                      .done(function (respuestaServer) {

                            if (respuestaServer.validacion == "ok") {
                            	alert(respuestaServer.mensaje);
                              window.location.href = 'modificarG.html';
                            } else {
                                alert(respuestaServer.mensaje);
                            }
                        })
                return false;
            }



/////////////////////////////////////////////////////////////////codigo sin utilizacion este proyecto

function enviarCorreo(){

  $.getJSON(localStorage["host"] + "php/enviarCorreo.php")
                       .done(function (respuestaServer) {
                           if (respuestaServer.validacion == "ok") {
                                 console.log(" Se envío correo");
                           } else {
                               alert(respuestaServer.mensaje);
                           }
                       })
}

function extraerPdf(){
  window.open(localStorage["host"] + "php/imprimirPDF.php","Nueva ventana");

  
}