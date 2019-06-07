
localStorage["host"] = "http://192.168.1.54/controlFirm/"

$('#login').submit(function () {// vaidacion del login

    // recolecta datos ingresados por el usuario en el login
    var datosUsuario = $("#login-nombre").val();
    var datosPassword = $("#login-clave").val();

    $.getJSON(localStorage["host"] + "php/login.php", {usuario: datosUsuario, password: datosPassword})
          .done(function (respuestaServer) {

              if (respuestaServer.validacion == "ok") {

                  window.location.href = 'vista/inicio.html';

              } else {

                  alert("Datos ingresados Incorrectos, ingresar nuevamente");
              }
          })
  return false;
});




function listarDatosFirmas() {

  $.getJSON(localStorage["host"] + "php/listarDatos.php")
            .done(function (respuestaServ) {

                if (respuestaServ.validacion=="ok") {

                 arreglo = respuestaServ.datos;
   					     cantidad = respuestaServ.n;

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
                                    if(a<15){
                                      newB7.setAttribute("class","text-danger");
                                      //newTd7.setAttribute("class","bg-danger");
                                      //  $(newb7).css("background-color", "red");
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

$('#registroCurso').submit(function () {// registro de curso
              // Toma los valores del form de cursos
          var codigo = $("#codigo").val();
          var nombre = $("#nombre").val();
          var observaciones = $("#observaciones").val();

         $.getJSON(localStorage["host"] + "php/registroC.php", {codigo: codigo, nombre: nombre, observaciones: observaciones, })
                        .done(function (respuestaServer) {

                          if (respuestaServer.validacion == "ok") {
                            	alert(respuestaServer.mensaje);

                                window.location.href = 'inicio.html';

                            } else {

                                alert(respuestaServer.mensaje);
                            }
                        })


                return false;
            });

function mostrarCursos() {// mostrar cursos registrados en la base de datos
  $.getJSON(localStorage["host"] + "php/listarC.php")
            .done(function (respuestaServ) {

                if (respuestaServ.validacion=="ok") {

                  arreglo = respuestaServ.curso;
            cantidad = respuestaServ.n;

            for (var i = 0; i < cantidad; i++) {
                  codigo = arreglo[i].codigo;
                  nombre = arreglo[i].nombre;
                  observaciones = arreglo[i].observaciones;

  //aqui escribimos dinamicamente en la pagina web con la informacion obtenida de la base de datos
                                    var newTr= document.createElement("tr");
                                    var newTd1 = document.createElement("td");
                                    var newB1 = document.createElement("b");
                                    newB1.setAttribute("class","ui-table-cell-label");
                                    newB1.innerHTML=codigo;

                                    var newTd2 = document.createElement("td");
                                    var newB2 = document.createElement("b");
                                    newB2.setAttribute("class","ui-table-cell-label");
                                    newB2.innerHTML=nombre;

                                    var newTd3 = document.createElement("td");
                                    var newB3 = document.createElement("b");
                                    newB3.setAttribute("class","ui-table-cell-label");
                                    newB3.innerHTML=observaciones;


                                    // añade los elementos creados y su contenido
                                    var currentDiv = document.getElementById("tbody");
                                      currentDiv.appendChild(newTr);
                                      newTr.appendChild(newTd1);
                                      newTd1.appendChild(newB1);

                                      newTr.appendChild(newTd2);
                                      newTd2.appendChild(newB2);

                                      newTr.appendChild(newTd3);
                                      newTd3.appendChild(newB3);

          }//fin del for


                }else{

                  alert(respuestaServ.mensaje);
                }

               });

            };



function buscar(){// buscar estudiante si esta registrado // validar estudiante
  var datosUsuario = document.getElementById("id_est").value;

   $.getJSON(localStorage["host"] + "php/buscarE.php",{id:datosUsuario})
            .done(function (respuestaServer) {

                if (respuestaServer.validacion == "ok") {
                  estu = respuestaServer.estudiante;
                  id = document.getElementById("identificacion");
                  id.value =estu[0].identificacion;
                  nom = document.getElementById("nombres");
                  nom.value =estu[0].nombres;
                  ap = document.getElementById("apellidos");
                  ap.value =estu[0].apellidos;
                  gen = document.getElementById("genero");
                  gen.value =estu[0].genero;
                } else {
                    alert(respuestaServer.mensaje);
                }
            })

}

function buscarDocente(){// Buscar docente en los formularios de eliminar y modificar
  var datosUsuario = document.getElementById("iddoc").value;

   $.getJSON(localStorage["host"] + "php/buscarD.php",{id:datosUsuario})
            .done(function (respuestaServer) {
                if (respuestaServer.validacion == "ok") {
                  doc = respuestaServer.docente;
                  id = document.getElementById("identificacion");
                  id.value =doc[0].identificacion;
                  nom = document.getElementById("nombres");
                  nom.value =doc[0].nombres;
                  ap = document.getElementById("apellidos");
                  ap.value =doc[0].apellidos;
                  gen = document.getElementById("genero");
                  gen.value =doc[0].genero;

                } else {
                    alert(respuestaServer.mensaje);
                }
            })
}

function buscarCurso(){// validar curso exiteen los formulario de eliminar y modificar cursos
  var datosUsuario = document.getElementById("idCurso").value;

   $.getJSON(localStorage["host"] + "php/buscarC.php",{id:datosUsuario})
            .done(function (respuestaServer) {

                if (respuestaServer.validacion == "ok") {
                  curso = respuestaServer.curso;
                  cod = document.getElementById("codigo");
                  cod.value =curso[0].codigo;
                  nom = document.getElementById("nombre");
                  nom.value =curso[0].nombre;
                  obs = document.getElementById("observaciones");
                  obs.value =curso[0].observaciones;
                } else {
                    alert(respuestaServer.mensaje);
                }
            })
}


$('#modificarEstudiante').submit(function () {// Jquery para modificar estudiante

    // recolecta los valores que inserto el usuario
    var identificacion = $("#identificacion").val();
    var nombres = $("#nombres").val();
    var apellidos = $("#apellidos").val();
    var genero = $("#genero").val();
    var id = $("#id_est").val();

         $.getJSON(localStorage["host"] + "php/modificarE.php", {identificacion: identificacion, nombres: nombres, apellidos: apellidos, genero: genero, id: id})
            .done(function (respuestaServer) {
                if (respuestaServer.validacion== "ok") {
                  alert(respuestaServer.mensaje);
                    window.location.href = 'inicio.html';

                } else {

                    alert(respuestaServer.mensaje);
                }
            })

    return false;
});

$('#modificarDocente').submit(function () {//jquery para modificar docente

    // recolecta los valores que inserto el usuario
    var identificacion = $("#identificacion").val();
    var nombres = $("#nombres").val();
    var apellidos = $("#apellidos").val();
    var genero = $("#genero").val();
    var id = $("#iddoc").val();

         $.getJSON(localStorage["host"] + "php/modificarD.php", {identificacion: identificacion, nombres: nombres, apellidos: apellidos, genero: genero, id: id})
            .done(function (respuestaServer) {

                if (respuestaServer.validacion== "ok") {
                  alert(respuestaServer.mensaje);

                    window.location.href = 'inicio.html';

                } else {

                    alert(respuestaServer.mensaje);
                }
            })

    return false;
});

$('#modificarCurso').submit(function () {// Jquery para modificar curso

    // recolecta los valores que inserto el usuario
    var codigo = $("#codigo").val();
    var nombre = $("#nombre").val();
    var observaciones = $("#observaciones").val();
    var id = $("#idCurso").val();

         $.getJSON(localStorage["host"] + "php/modificarC.php", {codigo: codigo, nombre: nombre, observaciones: observaciones, id: id})
            .done(function (respuestaServer) {

                if (respuestaServer.validacion== "ok") {
                  alert(respuestaServer.mensaje);

                    window.location.href = 'inicio.html';

                } else {

                    alert(respuestaServer.mensaje);
                }
            })

    return false;
});



$('#eliminarEstudiante').submit(function () { // jquery para eliminar estudiantes
    // recolecta los valores que inserto el usuario
    var identificacion = $("#identificacion").val();
   var mensaje = confirm("¿Estas seguro que deseas borrar los datos?");

  if (mensaje) {

           $.getJSON(localStorage["host"] + "php/eliminarE.php", {identificacion: identificacion,})
            .done(function (respuestaServer) {
                if (respuestaServer.validacion== "ok") {
                  alert(respuestaServer.mensaje);
                    window.location.href = 'inicio.html';
                } else {
                    alert(respuestaServer.mensaje);
                }
            });
  }
  //
  else {
  limpiarCamposEstudiante();
  alert("No se realizaron cambios");
  }

    return false;
});


$('#eliminarDocente').submit(function () {// jquery para modificar docentes
    // recolecta los valores que inserto el usuario
    var identificacion = $("#identificacion").val();

  var mensaje = confirm("¿Estas seguro que deseas borrar al Docente?");

  if (mensaje) {
           $.getJSON(localStorage["host"] + "php/eliminarD.php", {identificacion: identificacion,})
            .done(function (respuestaServer) {
                if (respuestaServer.validacion== "ok") {
                  alert(respuestaServer.mensaje);
                    window.location.href = 'inicio.html';

                } else {

                    alert(respuestaServer.mensaje);
                }
            });
  }
  else {
  limpiar();
  alert("No se realizaron cambios");
  }
    return false;
});


$('#eliminarCurso').submit(function () {// jquery para eliminar cursos

    // recolecta los valores que inserto el usuario
    var codigo = $("#codigo").val();
  var mensaje = confirm("¿Estas seguro que deseas borrar los datos?");
  if (mensaje) {

           $.getJSON(localStorage["host"] + "php/eliminarC.php", {codigo: codigo})
            .done(function (respuestaServer) {

                if (respuestaServer.validacion== "ok") {
                  alert(respuestaServer.mensaje);
                    window.location.href = 'inicio.html';
                } else {
                    alert(respuestaServer.mensaje);
                }
            });
  }

  else {
  limpiar();
  alert("No se realizaron cambios");
  }
    return false;
});

function limpiarCamposCurso(){//limpiar campos ingresados a los imput de fromularios referentes a cursos
                  id = document.getElementById("codigo");
                  id.value ="";
                  nom = document.getElementById("nombre");
                  nom.value ="";
                  ap = document.getElementById("observaciones");
                  ap.value ="";
}

function limpiarCamposEstudiante(){ //limpiar campos ingresados a los imput
                  id = document.getElementById("identificacion");
                  id.value ="";
                  nom = document.getElementById("nombres");
                  nom.value ="";
                  ap = document.getElementById("apellidos");
                  ap.value ="";
                  gen = document.getElementById("genero");
                  gen.value ="";
}

function limpiarCamposDocente(){////limpiar campos ingresados a los imput de fromularios referentes a docentes
                  id = document.getElementById("identificacion");
                  id.value ="";
                  nom = document.getElementById("nombres");
                  nom.value ="";
                  ap = document.getElementById("apellidos");
                  ap.value ="";
                  gen = document.getElementById("genero");
                  gen.value ="";
}
