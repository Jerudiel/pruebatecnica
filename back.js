//https://us-central1-platzimaster-329503.cloudfunctions.net/function-1

//variables globales
var numeroMaterias = 0;
var contador = 0;
var numeroPreguntas = 0;
var resCorrectas = 0;
var resIncorrectas = 0;
var preguntas;
var respuestaActual;

function obtenerCuestionarios() {
    var requestOptions = {
        method: "GET",
        mode: "cors",
    }

    fetch(
        "https://us-central1-platzimaster-329503.cloudfunctions.net/function-1/?modo=cuestionarios",
        requestOptions
    )
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        //aqui guardar los cuestionarios y mandarlos a mostrar al div correspondiente
        numeroMaterias = Object.keys(result).length;
        console.log("Número de materias: ");
        console.log(numeroMaterias);
        //eliminar boton comenzar
        var contenedor = document.getElementById("contenedor");
        if(existeElemento("btnComenzar")){
            var btnComenzar = document.getElementById("btnComenzar");
        contenedor.removeChild(btnComenzar);
        }
        //crear los radio button de las materias
        for(var materia in result){
            if(result.hasOwnProperty(materia)){
                //console.log("La clave es " + materia + " y el valor es " + result[materia]);
                crearOpcion(result[materia]);
            }
        }
        //crear el boton de continuar
        var btnIniciarCuestionario = document.createElement('button');
        btnIniciarCuestionario.innerHTML = "CONTINUAR";
        btnIniciarCuestionario.onclick = seleccionarMateria;
        btnIniciarCuestionario.id = 'btnContinuar';
        contenedor.appendChild(btnIniciarCuestionario);    
    })
    .catch((error) => console.log("error", error));
}

function recargarCuestionario(){
    //borrar preguntas
    borrarPreguntas();
    //llamar a obtenerCuestionarios
    obtenerCuestionarios();
}

function obtenerPreguntas(materia) {
    var requestOptions = {
        method: "GET",
        mode: "cors",
    }

    fetch(
        "https://us-central1-platzimaster-329503.cloudfunctions.net/function-1/?modo="+materia,
        requestOptions
    )
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        //aqui guardar los cuestionarios y mandarlos a mostrar al div correspondiente
        numeroPreguntas = Object.keys(result).length;
        console.log("Número de preguntas: ");
        console.log(numeroPreguntas);

        var contenedor = document.getElementById("contenedor");
        for(i = 0; i < numeroMaterias; i++){
            var radios = document.getElementById("materiaOpcion");
            var label = document.getElementById("label");
            contenedor.removeChild(radios);
            contenedor.removeChild(label);
        }
        var btnContinuar = document.getElementById("btnContinuar");
        contenedor.removeChild(btnContinuar);
        //guardar todas las preguntas, reiniciar contador, resCorrectas, resIncorrectas, numeroPreguntas
        preguntas = result;
        contador = 0;
        resCorrectas = 0;
        resIncorrectas = 0;
        //mandar a crear pregunta
        crearPregunta();
        //crear boton
        crearBoton();
        //mandar a actualizar num. res correctas e incorrectas
        crearMarcador();
    })
    .catch((error) => console.log("error", error));
}

function obtenerSiguientePregunta() {
    var cont = 0;
    var pregunta_actual;
    if(contador < numeroPreguntas){
        for(var pregunta in preguntas){
            if(cont === contador){
                pregunta_actual = preguntas[pregunta];
                break;
            }
            cont++;
        }
        contador++;
        return pregunta_actual;
    }
    else{
        //ya no hay preguntas, mostrar el resultado
        return null;
    }
    
}

function crearPregunta(){
    //obtener la pregunta, 
    var pregunta = obtenerSiguientePregunta();
    respuestaActual = pregunta['0'].respuesta;
    crearEnunciadoPregunta(pregunta['0'].Enunciado);
    crearOpcionPregunta('opcionA', pregunta['0'].opcionA);
    crearOpcionPregunta('opcionB', pregunta['0'].opcionB);
    crearOpcionPregunta('opcionC', pregunta['0'].opcionC);
    crearOpcionPregunta('opcionD', pregunta['0'].opcionD);
}

function borrarPreguntas(){
    var cont = document.getElementById("contenedor");
    cont.innerHTML = '';
    /*if(existeElemento("enunciado")){
        var enunciado = document.getElementById("enunciado");
        cont.removeChild(enunciado);
    }

    for(i = 0; i < 4; i++){
        var radios = document.getElementById("materiaOpcion");
        var label = document.getElementById("label");
        contenedor.removeChild(radios);
        contenedor.removeChild(label);
    }*/


}

function actualizarPregunta(){
    var pregunta = obtenerSiguientePregunta();
    console.log("actualizarPregunta");
    console.log(pregunta);
    if(pregunta === null){
        //ya se terminó el cuestionario
        alert("Cuestionario terminado");
        //actualizar boton para cargar de nuevo los cuestionarios
        var btnReiniciar = document.getElementById("btnSiguientePregunta");
        btnReiniciar.innerHTML = "CUESTIONARIOS";
        btnReiniciar.onclick = recargarCuestionario;
    }
    else{
        //actualizar pregunta
        respuestaActual = pregunta['0'].respuesta;
        actualizarEnunciadoPregunta(pregunta['0'].Enunciado);
        actualizarOpcionPregunta('opcionA', pregunta['0'].opcionA);
        actualizarOpcionPregunta('opcionB', pregunta['0'].opcionB);
        actualizarOpcionPregunta('opcionC', pregunta['0'].opcionC);
        actualizarOpcionPregunta('opcionD', pregunta['0'].opcionD);
    }
}

function crearBoton(){
    //crear el boton de continuar
    var contenedor = document.getElementById("contenedor");
    var btnSiguientePregunta = document.createElement('button');
    btnSiguientePregunta.innerHTML = "SIGUIENTE";
    btnSiguientePregunta.onclick = revisarRespuesta;
    btnSiguientePregunta.id = 'btnSiguientePregunta';
    contenedor.appendChild(btnSiguientePregunta); 
}

function crearMarcador(){
    var cont = document.getElementById("contenedor");

    var marcadorCorrecto = document.createElement('h4');
    marcadorCorrecto.id = 'marcadorCorrecto';
    var descripcion = document.createTextNode("R. Correctas: " + resCorrectas.toString());
    marcadorCorrecto.appendChild(descripcion);

    var marcadorIncorrecto = document.createElement('h4');
    marcadorIncorrecto.id = 'marcadorIncorrecto';
    var descripcion2 = document.createTextNode("R. Incorrectas: " + resIncorrectas.toString());
    marcadorIncorrecto.appendChild(descripcion2);

    cont.appendChild(marcadorCorrecto);
    cont.appendChild(marcadorIncorrecto);
}

function actualizarMarcador(){
    var rCorrectas = document.getElementById("marcadorCorrecto");
    rCorrectas.innerHTML = "R. Correctas: " + resCorrectas.toString();

    var rIncorrectas = document.getElementById("marcadorIncorrecto");
    rIncorrectas.innerHTML = "R. Incorrectas: " + resIncorrectas.toString();
}

function revisarRespuesta(){
    //checar si hay un radio seleccionado
    var respuesta_sel = respuestaSeleccionada();
    if(respuesta_sel == ""){
        alert("Seleccione una respuesta");
    }
    else{
        //checar en que pregunta estamos y comparar la seleccion con la respuesta esperada
        if(respuestaActual == respuesta_sel){
            console.log("respuesta correcta");
            resCorrectas++;
        }
        else{
            console.log("respuesta incorrecta");
            resIncorrectas++;
        }
        //actualizar marcador
        actualizarMarcador();
        //cargar la siguiente pregunta ()
        actualizarPregunta();
    }
    
}

function respuestaSeleccionada(){
    var ress = document.getElementsByName('preguntaOpcion');
    var respuesta_seleccionada = "";
    for(i = 0; i < ress.length; i++){
        if(ress[i].checked){
            respuesta_seleccionada =ress[i].value;
            break;
        }
    }
    return respuesta_seleccionada;
}

function existeElemento(elemento){
    var ele = document.getElementById(elemento);
    return (ele === document.body) ? false : document.body.contains(ele);
}

function crearOpcion(valor){
    var cont = document.getElementById("contenedor");

    var radiobox = document.createElement('input');
    radiobox.type = 'radio';
    radiobox.id = 'materiaOpcion';
    radiobox.name = 'materiaOpcion';
    radiobox.value = valor;
 
    var label = document.createElement('label');
    label.id = 'label';
    label.htmlFor = 'materia';
 
    var description = document.createTextNode(valor);
    label.appendChild(description);
 
    var newline = document.createElement('br');
    newline.id = 'brline';

    cont.appendChild(radiobox);
    cont.appendChild(label);
    cont.appendChild(newline);

}

function crearEnunciadoPregunta(valor){
    var cont = document.getElementById("contenedor");

    var enunciado = document.createElement('h2');
    enunciado.id = 'enunciado';
    
    var descripcion = document.createTextNode(valor);
    enunciado.appendChild(descripcion);

    cont.appendChild(enunciado);
}

function actualizarEnunciadoPregunta(valor){
    var enu = document.getElementById("enunciado");
    enu.innerHTML = valor;
}

function crearOpcionPregunta(nombre, valor){
    var cont = document.getElementById("contenedor");

    var radiobox = document.createElement('input');
    radiobox.type = 'radio';
    radiobox.id = 'preguntaOpcion' + nombre;
    radiobox.name = 'preguntaOpcion';
    radiobox.value = nombre;
 
    var label = document.createElement('label');
    label.id = 'label' + nombre;
    label.htmlFor = 'materia';
 
    var description = document.createTextNode(valor);
    label.appendChild(description);
 
    var newline = document.createElement('br');
    newline.id = 'brline';

    cont.appendChild(radiobox);
    cont.appendChild(label);
    cont.appendChild(newline);

}

function actualizarOpcionPregunta(nombre, valor){
    var opc_radio = document.getElementById('preguntaOpcion' + nombre);
    var opc_label = document.getElementById('label' + nombre);

    opc_radio.value = nombre;
    opc_label.innerHTML = valor;
}

function seleccionarMateria(){
    var mats = document.getElementsByName('materiaOpcion');
    var materia_seleccionada = "";
    for(i = 0; i < mats.length; i++){
        if(mats[i].checked){
            materia_seleccionada =mats[i].value;
            break;
        }
    }
    ///console.log("materia seleccionada:");
    ///console.log(materia_seleccionada);
    //checar que se haya seleccionada una opcion
    if(materia_seleccionada == ""){
        alert("Seleccione una materia");
    }
    else{
        //mandar a pedir las preguntas de la materia seleccionada
        ///console.log("pedir las preguntas de la materia");
        obtenerPreguntas(materia_seleccionada);
    }
}
    