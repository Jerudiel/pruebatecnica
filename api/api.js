/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

//informacion
const cuestionarios = {
    materia1 : "LITERATURA",
    materia2 : "MATEMATICAS",
    materia3 : "BIOLOGIA",
    materia4 : "FISICA"
  };
  const cuestionariosStr = JSON.stringify(cuestionarios);
  
  const preguntasLiteratura = {
    pregunta1 : [
      {"Enunciado" : "¿Quién escribió La Iliada?",
       "opcionA" : "Marco Tulio",
       "opcionB" : "Homero",
       "opcionC" : "Séneca",
       "opcionD" : "Heródoto",
       "respuesta" : "opcionB" }
    ],
    pregunta2 : [
      {"Enunciado" : "Autor de El arte de la guerra",
       "opcionA" : "Shi Jing",
       "opcionB" : "Sun Tzu",
       "opcionC" : "Dao De Jing",
       "opcionD" : "Confucio",
       "respuesta" : "opcionB" }
    ],
    pregunta3 : [
      {"Enunciado" : "¿Quién es el autor de la dvina comedia?",
       "opcionA" : "Dante Alighieri",
       "opcionB" : "Petraca",
       "opcionC" : "Giovanni Bocaccio",
       "opcionD" : "Maquiavelo",
       "respuesta" : "opcionA" }
    ],
    pregunta4 : [
      {"Enunciado" : "Filosofo griego, autor de La República",
       "opcionA" : "Sócrates",
       "opcionB" : "Democrates",
       "opcionC" : "Aristóteles",
       "opcionD" : "Platón",
       "respuesta" : "opcionD" }
    ],
    pregunta5 : [
      {"Enunciado" : "¿Por qué El principito decide abandonar su planeta?",
       "opcionA" : "Porque queria conocer la tierra",
       "opcionB" : "Porque estaba enfermo",
       "opcionC" : "Porque el Rey le ordena irse",
       "opcionD" : "Porque sentía que una rosa se aprovechaba de él",
       "respuesta" : "opcionD" }
    ],
  };
  const preguntasLiteraturaStr = JSON.stringify(preguntasLiteratura);
  
  const preguntasMatematicas = {
    pregunta1 : [
      {"Enunciado" : "Cuál es la representación gráfica del número nueve mil treinta y seis",
       "opcionA" : "90036",
       "opcionB" : "936",
       "opcionC" : "9036",
       "opcionD" : "9936",
       "respuesta" : "opcionC" }
    ],
    pregunta2 : [
      {"Enunciado" : "A cuántas unidades equivale 10 decenas de millar",
       "opcionA" : "100000 unidades",
       "opcionB" : "10000 unidades",
       "opcionC" : "1000 unidades",
       "opcionD" : "1000000 unidades",
       "respuesta" : "opcionA" }
    ],
    pregunta3 : [
      {"Enunciado" : "Aproxima el número 58 a la decena",
       "opcionA" : "50",
       "opcionB" : "60",
       "opcionC" : "55",
       "opcionD" : "70",
       "respuesta" : "opcionB" }
    ],
    pregunta4 : [
      {"Enunciado" : "Escribe el número ordinal trigésimo quinto en cifras",
       "opcionA" : "135",
       "opcionB" : "35",
       "opcionC" : "25",
       "opcionD" : "350",
       "respuesta" : "opcionB" }
    ],
    pregunta5 : [
      {"Enunciado" : "Qué cantidad expresa el número romano V",
       "opcionA" : "uno",
       "opcionB" : "cinco",
       "opcionC" : "diez",
       "opcionD" : "tres",
       "respuesta" : "opcionB" }
    ],
  };
  const preguntasMatematicasStr = JSON.stringify(preguntasMatematicas);
  
  const preguntasBiologia = {
    pregunta1 : [
      {"Enunciado" : "Las algas y protozoos pertenecen al reino :",
       "opcionA" : "animalia",
       "opcionB" : "fungi",
       "opcionC" : "protista",
       "opcionD" : "plantae",
       "respuesta" : "opcionC" }
    ],
    pregunta2 : [
      {"Enunciado" : "Escoja la opción correcta:",
       "opcionA" : "Los organismos procariotas realizan su división celular por mitosis",
       "opcionB" : "El núcleo celular es el organelo característico de las células eucariotas",
       "opcionC" : "La célula animal posee pared celular",
       "opcionD" : "La célula animal no posee lisosomas",
       "respuesta" : "opcionB" }
    ],
    pregunta3 : [
      {"Enunciado" : "¿Cuál de las siguientes respuestas NO es correcta? Los seres vivos se caracterizan por: ",
       "opcionA" : "cumplir con el ciclo vital en el transcurso del tiempo.",
       "opcionB" : "realizar funciones de adaptabilidad e irritabilidad",
       "opcionC" : "aumentar de tamaño por la multiplicación de sus átomos",
       "opcionD" : "reproducirse sexual y asexualmente según la especie",
       "respuesta" : "opcionC" }
    ],
    pregunta4 : [
      {"Enunciado" : "La adenina y la guanina son bases nitrogenadas:",
       "opcionA" : "pirimidinas",
       "opcionB" : "piroxinas",
       "opcionC" : "purinas",
       "opcionD" : "citosinas",
       "respuesta" : "opcionC" }
    ],
    pregunta5 : [
      {"Enunciado" : " ¿Cuál de los siguientes carbohidratos está asociado con plantas? ",
       "opcionA" : "Glucógeno",
       "opcionB" : "Amilopectina",
       "opcionC" : "Quitina",
       "opcionD" : "Levoglucosa",
       "respuesta" : "opcionD" }
    ],
  };
  const preguntasBiologiaStr = JSON.stringify(preguntasBiologia);
  
  const preguntasFisica = {
    pregunta1 : [
      {"Enunciado" : ". La ciencia física es una ciencia fundamental, esto quiere decir que para explicarla:",
       "opcionA" : "No necesita de otras ciencias naturales",
       "opcionB" : "Necesita y se fundamenta en otras ciencias naturales.",
       "opcionC" : "Sus conceptos deben ser particulares y limitados en el tiempo",
       "opcionD" : "Ninguna respuesta anterior es correcta",
       "respuesta" : "opcionA" }
    ],
    pregunta2 : [
      {"Enunciado" : "En el diagrama de cuerpo libre:",
       "opcionA" : "Se deben tomar en cuenta las fuerzas internas.",
       "opcionB" : "No se deben tomar en cuenta las fuerzas internas.",
       "opcionC" : "Se deben tomar en cuenta las fuerzas externas e internas.",
       "opcionD" : "Ninguna respuesta anterior es correcta. ",
       "respuesta" : "opcionD" }
    ],
    pregunta3 : [
      {"Enunciado" : "La energía potencial gravitatoria de una partícula se incrementa cuando:",
       "opcionA" : "Una fuerza externa no realiza trabajo activo.",
       "opcionB" : "Una fuerza externa realiza trabajo resistente",
       "opcionC" : "El peso de la partícula realiza trabajo resistente.",
       "opcionD" : "Ninguna respuesta anterior es correcta.",
       "respuesta" : "opcionC" }
    ],
    pregunta4 : [
      {"Enunciado" : " El sonido:",
       "opcionA" : "Se puede propagar en el vacío",
       "opcionB" : "Es una onda electromagnética.",
       "opcionC" : "Es una onda transversal que se propaga únicamente en algún medio material",
       "opcionD" : "Ninguna afirmación anterior es correcta.",
       "respuesta" : "opcionD" }
    ],
    pregunta5 : [
      {"Enunciado" : "En la electrización por frotamiento:",
       "opcionA" : "Los 2 cuerpos se cargan con igual tipo de carga y en la misma cantidad.",
       "opcionB" : "Los 2 cuerpos se cargan con diferente tipo de carga y con diferente cantidad",
       "opcionC" : "Los cuerpos se cargan con diferente tipo de carga y en la misma cantidad.",
       "opcionD" : "Ninguna afirmación anterior es correcta.",
       "respuesta" : "opcionC" }
    ],
  };
  const preguntasFisicaStr = JSON.stringify(preguntasFisica);
  
  exports.helloWorld = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let message = req.query.modo || req.body.message || 'Hello World!';
    //res.status(200).send(message);
    //cehcar que devolver
    if(req.query.modo == "cuestionarios"){
      message = cuestionariosStr;
    }
    else if(req.query.modo == "LITERATURA"){
      message = preguntasLiteraturaStr;
    }
    else if(req.query.modo == "MATEMATICAS"){
      message = preguntasMatematicasStr;
    }
    else if(req.query.modo == "BIOLOGIA"){
      message = preguntasBiologiaStr;
    }
    else if(req.query.modo == "FISICA"){
      message = preguntasFisicaStr;
    }
    res.status(200).send(message);
  };
  