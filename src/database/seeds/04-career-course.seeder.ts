import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<any> {
  const career_courses = [
    // { code: 33, name: 'Civil' },
    // { code: 34, name: 'Mecánica' },
    // { code: 35, name: 'Industrial' },
    // { code: 36, name: 'Mecánica Industrial' },
    // { code: 58, name: 'Ciencias y Sistemas' },
    /*
    {career_code: number;
    course_code: string;
    semester: number;
    field: number;
    mandatory: boolean}
    */

    //TODOS ESTOS CURSOS SON DE LOS PENSUMS 2012 PARA CIVIL, MECANICA, INDUSTRIAL, MECANICA INDUSTRIAL, 2016 CIENCIAS Y SISTEMAS

    //PRIMER SEMESTRE
    //AREA COMUN
    //Social Humanistica 1
    //Civil3

    {
      career_code: 33, 
      course_code: '028',
      semester: 1,
      field: 6,
      mandatory: true, 
    },
    //sip correcto
    //Mecanica
    {
      career_code: 34, 
      course_code: '028',
      semester: 1,
      field: 5,
      mandatory: true, 
    },
    //Informacion correcta
    //Industrial
    {
      career_code: 35,  
      course_code: '028',
      semester: 1,
      field: 4,
      mandatory: true, 
    },
//se modifico el field de 7 a 4, segun malla

    //Mecanica Industrial
    {
      career_code: 36, 
      course_code: '028',
      semester: 1,
      field: 1,
      mandatory: true, 
    },
    //se modifico el fiel de 8 a 1, ya que en ese pensum no tiene areas desglosadas, sino que es una unica area

    //sistemas
    {
      career_code: 58, 
      course_code: '028',
      semester: 1,
      field: 4,
      mandatory: true, 
    }, //Informacion correcta

    //Mate Basica 1
    {
      career_code: 33,
      course_code: '169',
      semester: 1,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '169',
      semester: 1,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '169',
      semester: 1,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '169',
      semester: 1,
      field: 8,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '169',
      semester: 1,
      field: 4,
      mandatory: true,
    },

    //Orientacion y Liderazgo
    {
      career_code: 33,
      course_code: '2666',
      semester: 1,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '2666',
      semester: 1,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '2666',
      semester: 1,
      field: 11,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '2666',
      semester: 1,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '2666',
      semester: 1,
      field: 4,
      mandatory: true,
    },

    //Tecnica Complementaria 1
    {
      career_code: 33,
      course_code: '119',
      semester: 1,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '119',
      semester: 1,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '119',
      semester: 1,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '119',
      semester: 1,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '119',
      semester: 1,
      field: 4,
      mandatory: true,
    },

    //Deportes 1
    {
      career_code: 33,
      course_code: '177',
      semester: 1,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '177',
      semester: 1,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '177',
      semester: 1,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '177',
      semester: 1,
      field: 1,
      mandatory: true,
    }, //para mecanica industrial si es obligatorio
    {
      career_code: 58,
      course_code: '177',
      semester: 1,
      field: 4,
      mandatory: false,
    },

    //Quimica 1
    {
      career_code: 33,
      course_code: '216',
      semester: 1,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '216',
      semester: 1,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '216',
      semester: 1,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '216',
      semester: 1,
      field: 8,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '216',
      semester: 1,
      field: 4,
      mandatory: true,
    },
    //Idioma Tecnico 1 - UNICAMENTE EXISTE EN SISTEMAS Y INDUSTRIAL
    //Sistemas
    {
      career_code: 58, 
      course_code: '2792',
      semester: 1,
      field: 4,
      mandatory: false,
    },
    //Industrial
    {
      career_code: 35, 
      course_code: '2792',
      semester: 1,
      field: 13,
      mandatory: false,
    }, //si la detecta la base de datos y agregada correctamente

    //SEGUNDO SEMESTRE
    //AREA COMUN
    
    //Social Humanistica 2
    {//civil
      career_code: 33,
      course_code: '029',
      semester: 2,
      field: 6,
      mandatory: true,
    },
    { //mecanica
      career_code: 34,
      course_code: '029',
      semester: 2,
      field: 5,
      mandatory: true,
    },
    { //industrial
      career_code: 35,
      course_code: '029',
      semester: 2,
      field: 4,
      mandatory: true,
    },
    { //mecanica industrial
      career_code: 36,
      course_code: '029',
      semester: 2,
      field: 1,
      mandatory: true,
    },
    { //sistemas
      career_code: 58,
      course_code: '029',
      semester: 2,
      field: 4,
      mandatory: true,
    },

    //Mate Basica 2
    {
      career_code: 33,
      course_code: '170',
      semester: 2,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '170',
      semester: 2,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '170',
      semester: 2,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '170',
      semester: 2,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '170',
      semester: 2,
      field: 4,
      mandatory: true,
    },

    //Tecnicas de Investigacion y Estudio
    {
      career_code: 33,
      course_code: '2667',
      semester: 2,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '2667',
      semester: 2,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '2667',
      semester: 2,
      field: 11,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '2667',
      semester: 2,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '2667',
      semester: 2,
      field: 4,
      mandatory: true,
    },

    //Fisica Basica
    {
      career_code: 33,
      course_code: '072',
      semester: 2,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '072',
      semester: 2,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '072',
      semester: 2,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '072',
      semester: 2,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '072',
      semester: 2,
      field: 4,
      mandatory: true,
    }, //correctoooo

    //deportes 2
    {
      career_code: 33,
      course_code: '178',
      semester: 2,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '178',
      semester: 2,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '178',
      semester: 2,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '178',
      semester: 2,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '178',
      semester: 2,
      field: 4,
      mandatory: false,
    },

    //Idioma Tecnico 2 - EXISTE UNICAMENTE PARA SISTEMAS Y INDUSTRIAL
    {
      career_code: 58,
      course_code: '2793',
      semester: 2,
      field: 4,
      mandatory: false,
    },
    //idioma tecnico industrial
    {
      career_code: 35,
      course_code: '2793',
      semester: 2,
      field: 13,
      mandatory: false,
    },
    //tecnica complementaria 2 para civil
    {
      career_code: 33,
      course_code: '121',
      semester: 2,
      field: 6,
      mandatory: true,
    },
    //TERCER SEMESTRE
    //AREA COMUN

    //Matematica Intermedia 1
    {
      career_code: 33,
      course_code: '290',
      semester: 3,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '290',
      semester: 3,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '290',
      semester: 3,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '290',
      semester: 3,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '290',
      semester: 3,
      field: 4,
      mandatory: true,
    },

    //Fisica 1
    {
      career_code: 33,
      course_code: '146',
      semester: 3,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '146',
      semester: 3,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '146',
      semester: 3,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '146',
      semester: 3,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '146',
      semester: 3,
      field: 4,
      mandatory: true,
    },

    //Quimica 2
    {
      career_code: 33,
      course_code: '217',
      semester: 3,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '217',
      semester: 3,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '217',
      semester: 3,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '217',
      semester: 3,
      field: 1,
      mandatory: false,
    },

    //Geografia
    {
      career_code: 33,
      course_code: '681',
      semester: 3,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '681',
      semester: 3,
      field: 5,
      mandatory: false,
    },

    //Practica Inicial para civil, mecanica, industrial y mecanica industrial nada mas
    {
      career_code: 33,
      course_code: '2394',
      semester: 3,
      field: 9,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '2394',
      semester: 3,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '2394',
      semester: 3,
      field: 11,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '2394',
      semester: 3,
      field: 2,
      mandatory: true,
    },

    //Idioma Tecnico 3 - EXISTIR UNICAMENTE PARA SISTEMAS Y INDUSTRIAL
    {
      career_code: 58,
      course_code: '2794',
      semester: 3,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '2794',
      semester: 3,
      field: 13,
      mandatory: false,
    },

    //Sistemas
    //Logica de Sistemas
    {
      career_code: 58,
      course_code: '2797',
      semester: 3,
      field: 1,
      mandatory: true,
    },
    //Matematica de Computo 1
    {
      career_code: 58,
      course_code: '2795',
      semester: 3,
      field: 2,
      mandatory: true,
    },
    //Introduccion a la Programacion y Computacion 1
    {
      career_code: 58,
      course_code: '2796',
      semester: 3,
      field: 3,
      mandatory: true,
    },
    //Filosofia de la Ciencia
    {
      career_code: 34,
      course_code: '077',
      semester: 3,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '077',
      semester: 3,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '077',
      semester: 3,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '077',
      semester: 5,
      field: 4,
      mandatory: false,
    },

     //Logica (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '085',
      semester: 3,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '085',
      semester: 4,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '085',
      semester: 4,
      field: 4,
      mandatory: false,
    },

    //CUARTO SEMESTRE
    //AREA COMUN
    
    //Mate Intermedia 2
    {
      career_code: 33, 
      course_code: '291',
      semester: 4,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '291',
      semester: 4,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '291',
      semester: 4,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '291',
      semester: 4,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '291',
      semester: 4,
      field: 4,
      mandatory: true,
    }, //correcto

    //Mate Intermedia 3
    {
      career_code: 33,
      course_code: '292',
      semester: 4,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '292',
      semester: 4,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '292',
      semester: 4,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '292',
      semester: 4,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '292',
      semester: 4,
      field: 4,
      mandatory: true,
    },

    //Fisica 2
    {
      career_code: 33,
      course_code: '147',
      semester: 4,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '147',
      semester: 4,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '147',
      semester: 4,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '147',
      semester: 4,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '147',
      semester: 4,
      field: 4,
      mandatory: true,
    }, //correcto

    //Mecanica Analitica 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '109',
      semester: 4,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '109',
      semester: 4,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '109',
      semester: 4,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '109',
      semester: 4,
      field: 1,
      mandatory: true,
    },

    //Legislacion 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '680',
      semester: 4,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '680',
      semester: 6,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '680',
      semester: 5,
      field: 9,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '680',
      semester: 5,
      field: 1,
      mandatory: true,
    },

    //Estadistica 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '949',
      semester: 4,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '949',
      semester: 4,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '949',
      semester: 4,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '949',
      semester: 4,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '949',
      semester: 4,
      field: 1,
      mandatory: true,
    },

    //Geologia (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '930',
      semester: 4,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '930',
      semester: 4,
      field: 5,
      mandatory: false,
    },

    //Topografia 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '746',
      semester: 4,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '746',
      semester: 4,
      field: 5,
      mandatory: false,
    }, //correctamente 

    //Introduccion a la Ingenieria Petrolera (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '927',
      semester: 4,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '927',
      semester: 5,
      field: 3,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '927',
      semester: 5,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '927',
      semester: 4,
      field: 1,
      mandatory: false,
    },

    //Idioma Tecnico 4 - PARECE EXISTIR UNICAMENTE PARA SISTEMAS Y INDUSTRIAL (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2801',
      semester: 4,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '2801',
      semester: 4,
      field: 13,
      mandatory: false,
    },
    //Introduccion a Proyectos Gerenciales (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: 'A',
      semester: 4,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: 'A',
      semester: 4,
      field: 9,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: 'A',
      semester: 4,
      field: 1,
      mandatory: false,
    },
    //PSICOLOGIA INDUSTRIAL (CORRECTAMENTE INGRESADO) SOLO PARA CIVIL Y MECANICA
    {
      career_code: 33,
      course_code: '925',
      semester: 4,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '925',
      semester: 6,
      field: 7,
      mandatory: false,
    },
    //DIBUJO TECNICO MECANICO (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '068',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '068',
      semester: 4,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '068',
      semester: 4,
      field: 1,
      mandatory: true,
    },

    //Sistemas
    //Lenguajes Formales y de Programacion (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2798',
      semester: 4,
      field: 2,
      mandatory: true,
    },
    //Matematica de Computo 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2799',
      semester: 4,
      field: 2,
      mandatory: true,
    },
    //Introduccion a la Programacion y Computacion 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2800',
      semester: 4,
      field: 3,
      mandatory: true,
    },

    //QUINTO SEMESTRE
    //AREA COMUN
    

    //Matematica Aplicada 1
    {
      career_code: 33,
      course_code: '673',
      semester: 5,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '673',
      semester: 5,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '673',
      semester: 5,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '673',
      semester: 5,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '673',
      semester: 5,
      field: 4,
      mandatory: true,
    },

    //Matematica Aplicada 3
    {
      career_code: 33,
      course_code: '674',
      semester: 5,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '674',
      semester: 5,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '674',
      semester: 5,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '674',
      semester: 5,
      field: 8,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '674',
      semester: 5,
      field: 4,
      mandatory: true,
    },

    //Fisica 3
    {
      career_code: 34,
      course_code: '148',
      semester: 5,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '148',
      semester: 5,
      field: 8,
      mandatory: false,
    },

    //Contabilidad 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '694',
      semester: 4,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '694',
      semester: 7,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '694',
      semester: 5,
      field: 8,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '694',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '694',
      semester: 5,
      field: 4,
      mandatory: false,
    },

    //Principios de Metrologia
    {
      career_code: 33,
      course_code: '2806',
      semester: 5,
      field: 2,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '2806',
      semester: 5,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '2806',
      semester: 5,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '2806',
      semester: 5,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '2806',
      semester: 5,
      field: 4,
      mandatory: false,
    },

    //Ecologia (YA INGRESADO CORRECTAMENTE)
    {
      career_code: 33,
      course_code: '094',
      semester: 4,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '094',
      semester: 5,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '094',
      semester: 7,
      field: 12,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '094',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '094',
      semester: 5,
      field: 4,
      mandatory: false,
    },

    //Programacion de Computadoras 1
    {
      career_code: 33,
      course_code: '087',
      semester: 5,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '087',
      semester: 5,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '087',
      semester: 5,
      field: 7,
      mandatory: true,
    },

    //Legislacion 2
    {
      career_code: 33,
      course_code: '764',
      semester: 5,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '764',
      semester: 7,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '764',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '764',
      semester: 6,
      field: 1,
      mandatory: true,
    },

    //Administracion de Personal
    {
      career_code: 33,
      course_code: '928',
      semester: 5,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '928',
      semester: 7,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '928',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '928',
      semester: 5,
      field: 1,
      mandatory: true,
    },

    //Geologia del Petroleo
    {
      career_code: 33,
      course_code: '926',
      semester: 5,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '926',
      semester: 5,
      field: 5,
      mandatory: false,
    },

    //Sistemas
    //Analisis Probabilistico
    {
      career_code: 58,
      course_code: '2802',
      semester: 5,
      field: 1,
      mandatory: true,
    },

    //Organizacion de Lenguajes y Compiladores 1
    {
      career_code: 58,
      course_code: '2803',
      semester: 5,
      field: 2,
      mandatory: true,
    },

    //Organizacion Computacional
    {
      career_code: 58,
      course_code: '2804',
      semester: 5,
      field: 2,
      mandatory: true,
    },

    //Estructura de Datos
    {
      career_code: 58,
      course_code: '2805',
      semester: 5,
      field: 3,
      mandatory: true,
    },

    //Practica Inicial TI
    {
      career_code: 58,
      course_code: '2807',
      semester: 5,
      field: 5,
      mandatory: true,
    },

    //SEXTO SEMESTRE
    //AREA COMUN
    //Matematica Aplicada 2
    {
      career_code: 33,
      course_code: '904',
      semester: 6,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '904',
      semester: 6,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '904',
      semester: 6,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '904',
      semester: 6,
      field: 4,
      mandatory: false,
    },

    //Matematica Aplicada 4
    {
      career_code: 33,
      course_code: '905',
      semester: 6,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '905',
      semester: 6,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '905',
      semester: 6,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '905',
      semester: 6,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '905',
      semester: 6,
      field: 4,
      mandatory: false,
    },

    //Ingenieria Electrica 1
    {
      career_code: 33,
      course_code: '670',
      semester: 5,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '670',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '670',
      semester: 5,
      field: 8,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '670',
      semester: 5,
      field: 8,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '670',
      semester: 6,
      field: 4,
      mandatory: true,
    },

    //Ingenieria Electrica 2
    {
      career_code: 33,
      course_code: '676',
      semester: 6,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '676',
      semester: 6,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '676',
      semester: 6,
      field: 8,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '676',
      semester: 6,
      field: 4,
      mandatory: true,
    },

    //Fisica 4
    {
      career_code: 34,
      course_code: '150',
      semester: 6,
      field: 5,
      mandatory: false,
    },

    //Contabilidad 2
    {
      career_code: 33,
      course_code: '779',
      semester: 5,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '779',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '779',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '779',
      semester: 6,
      field: 4,
      mandatory: false,
    },

    //Gestion de Desastres
    {
      career_code: 33,
      course_code: '2670',
      semester: 5,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '2670',
      semester: 7,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '2670',
      semester: 7,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '2670',
      semester: 6,
      field: 4,
      mandatory: false,
    },

    //Programacion de Computadoras 2
    {
      career_code: 33,
      course_code: '794',
      semester: 6,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '794',
      semester: 7,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '794',
      semester: 6,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '794',
      semester: 6,
      field: 7,
      mandatory: true,
    },

    //Investigacion de Operaciones 1
    {
      career_code: 34,
      course_code: '685',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '685',
      semester: 6,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '685',
      semester: 6,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '685',
      semester: 6,
      field: 1,
      mandatory: true,
    },

    //Resistencia de Materiales 2
    {
      career_code: 33,
      course_code: '677',
      semester: 6,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '677',
      semester: 7,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '677',
      semester: 6,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '677',
      semester: 6,
      field: 5,
      mandatory: true,
    },

    //Sistemas
    //Teoria de Sistemas 1
    {
      career_code: 58,
      course_code: '2808',
      semester: 6,
      field: 1,
      mandatory: true,
    },

    //Economia
    {
      career_code: 58,
      course_code: '2809',
      semester: 6,
      field: 1,
      mandatory: true,
    },

    //Organizacion de Lenguajes y Compiladores 2
    {
      career_code: 58,
      course_code: '2810',
      semester: 6,
      field: 2,
      mandatory: true,
    },

    //Arquitectura de Computadoras y Ensambladores 1
    {
      career_code: 58,
      course_code: '2811',
      semester: 6,
      field: 2,
      mandatory: true,
    },

    //Manejo e Implementacion de Archivos
    {
      career_code: 58,
      course_code: '2812',
      semester: 6,
      field: 3,
      mandatory: true,
    },

    //SEPTIMO SEMESTRE
    //AREA COMUN
    //Contabilidad 3
    {
      career_code: 35,
      course_code: '919',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '919',
      semester: 7,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '919',
      semester: 7,
      field: 4,
      mandatory: false,
    },

    //Ingenieria de la Produccion
    {
      career_code: 33,
      course_code: '945',
      semester: 7,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '945',
      semester: 9,
      field: 1,
      mandatory: false,
    },

    //Administracion de Empresas 1
    {
      career_code: 33,
      course_code: '943',
      semester: 7,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '943',
      semester: 8,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '943',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '943',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '943',
      semester: 7,
      field: 3,
      mandatory: false,
    },

    //Investigacion de Operaciones 2
    {
      career_code: 34,
      course_code: '795',
      semester: 9,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '795',
      semester: 7,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '795',
      semester: 7,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '795',
      semester: 7,
      field: 1,
      mandatory: true,
    },

    //Practica Intermedia
    {
      career_code: 33,
      course_code: '2585',
      semester: 7,
      field: 9,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '2585',
      semester: 7,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '2585',
      semester: 7,
      field: 9,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '2585',
      semester: 7,
      field: 9,
      mandatory: true,
    },

    //Sistemas
    //Teoria de Sistemas 2
    {
      career_code: 58,
      course_code: '2813',
      semester: 7,
      field: 1,
      mandatory: true,
    },

    //Estadistica 2
    {
      career_code: 58,
      course_code: '950',
      semester: 7,
      field: 1,
      mandatory: false,
    },

    //Sistemas Operativos 1
    {
      career_code: 58,
      course_code: '2814',
      semester: 7,
      field: 2,
      mandatory: true,
    },

    //Arquitectura de Computadores y Ensambladores 2
    {
      career_code: 58,
      course_code: '2815',
      semester: 7,
      field: 2,
      mandatory: true,
    },

    //Redes de Computadores 1
    {
      career_code: 58,
      course_code: '2816',
      semester: 7,
      field: 2,
      mandatory: true,
    },

    //Sistemas de Bases de Datos 1
    {
      career_code: 58,
      course_code: '2817',
      semester: 7,
      field: 3,
      mandatory: true,
    },

    //Practica Intermedia TI
    {
      career_code: 58,
      course_code: '2818',
      semester: 7,
      field: 5,
      mandatory: true,
    },

    //Octavo Semestre
    //Area Comun
    //Ingenieria Economica 1
    {
      career_code: 33,
      course_code: '690',
      semester: 5,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '690',
      semester: 7,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '690',
      semester: 5,
      field: 8,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '690',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '690',
      semester: 8,
      field: 4,
      mandatory: false,
    },

    //Administracion de Empresas 2
    {
      career_code: 33,
      course_code: '944',
      semester: 8,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '944',
      semester: 9,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '944',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '944',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    //Sistemas
    //Sistemas Operativos 2
    {
      career_code: 58,
      course_code: '2819',
      semester: 8,
      field: 2,
      mandatory: true,
    },

    //Redes de Computadores 2
    {
      career_code: 58,
      course_code: '2820',
      semester: 8,
      field: 2,
      mandatory: true,
    },

    //Sistemas de Bases de Datos 2
    {
      career_code: 58,
      course_code: '2821',
      semester: 8,
      field: 3,
      mandatory: true,
    },

    //Analisis y Diseño de Sistemas 1
    {
      career_code: 58,
      course_code: '2822',
      semester: 8,
      field: 3,
      mandatory: true,
    },

    //Seminario de Sistemas 1
    {
      career_code: 58,
      course_code: '2823',
      semester: 8,
      field: 3,
      mandatory: true,
    },

    //NOVENO SEMESTRE
    //AREA COMUN
    //Introduccion a la Evaluacion de Impacto Ambiental
    {
      career_code: 33,
      course_code: '2672',
      semester: 9,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '2672',
      semester: 9,
      field: 3,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '2672',
      semester: 9,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '2672',
      semester: 9,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '2672',
      semester: 9,
      field: 4,
      mandatory: false,
    },

    //Ingenieria Economica 2
    {
      career_code: 33,
      course_code: '922',
      semester: 6,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '922',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '922',
      semester: 6,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '922',
      semester: 6,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '922',
      semester: 9,
      field: 4,
      mandatory: false,
    },

    //Etica Profesional
    {
      career_code: 33,
      course_code: '2570',
      semester: 9,
      field: 6,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '2570',
      semester: 9,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '2570',
      semester: 9,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '2570',
      semester: 9,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '2570',
      semester: 9,
      field: 4,
      mandatory: false,
    },

    //Seminario de Investigacion
    {
      career_code: 33,
      course_code: '2837',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '2837',
      semester: 9,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '2837',
      semester: 9,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '2837',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '2837',
      semester: 10,
      field: 4,
      mandatory: true,
    },

    //Sistemas
    //Modelacion y Simulacion 1
    {
      career_code: 58,
      course_code: '2824',
      semester: 9,
      field: 1,
      mandatory: true,
    },

    //Sistemas Organizacionales y Gerenciales 1
    {
      career_code: 58,
      course_code: '2825',
      semester: 9,
      field: 1,
      mandatory: true,
    },

    //Emprendedores de Negocios Informaticos
    {
      career_code: 58,
      course_code: '2830',
      semester: 9,
      field: 1,
      mandatory: false,
    },

    //Inteligencia Artificial 1
    {
      career_code: 58,
      course_code: '2826',
      semester: 9,
      field: 2,
      mandatory: true,
    },

    //Seguridad y Auditorias de Redes
    {
      career_code: 58,
      course_code: '2831',
      semester: 9,
      field: 2,
      mandatory: false,
    },

    //Analisis y Diseño de Sistemas 2
    {
      career_code: 58,
      course_code: '2827',
      semester: 9,
      field: 3,
      mandatory: true,
    },

    //Sistemas Aplicados 1
    {
      career_code: 58,
      course_code: '2832',
      semester: 9,
      field: 3,
      mandatory: false,
    },

    //Bases de Datos Avanzadas
    {
      career_code: 58,
      course_code: '2833',
      semester: 9,
      field: 3,
      mandatory: false,
    },

    //Seminario de Sistemas 2
    {
      career_code: 58,
      course_code: '2828',
      semester: 9,
      field: 3,
      mandatory: true,
    },

    //Practica Final
    {
      career_code: 58,
      course_code: '2829',
      semester: 9,
      field: 5,
      mandatory: true,
    },

    //DECIMO SEMESTRE
    //AREA COMUN
    //Seminario de Investigacion EPS
    {
      career_code: 35,
      course_code: '2842',
      semester: 9,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '2842',
      semester: 10,
      field: 4,
      mandatory: false,
    },

    //Planeamiento
    {
      career_code: 33,
      course_code: '912',
      semester: 9,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '912',
      semester: 10,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '912',
      semester: 9,
      field: 10,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '912',
      semester: 9,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '912',
      semester: 10,
      field: 4,
      mandatory: false,
    },

    //Preparacion y Evaluacion de Proyectos 1
    {
      career_code: 33,
      course_code: '909',
      semester: 9,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '909',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '909',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '909',
      semester: 10,
      field: 4,
      mandatory: false,
    },

    //Preparacion y Evaluacion de Proyectos 2
    {
      career_code: 33,
      course_code: '918',
      semester: 10,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '918',
      semester: 10,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '918',
      semester: 10,
      field: 1,
      mandatory: false,
    },

    //Practica Final
    {
      career_code: 33,
      course_code: '2586',
      semester: 10,
      field: 9,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '2586',
      semester: 9,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '2586',
      semester: 9,
      field: 9,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '2586',
      semester: 10,
      field: 9,
      mandatory: true,
    },

    //Sistemas
    //Sistemas Organizacionales y Gerenciales 2
    {
      career_code: 58,
      course_code: '2834',
      semester: 10,
      field: 1,
      mandatory: true,
    },

    //Modelacion y Simulacion 2
    {
      career_code: 58,
      course_code: '2835',
      semester: 10,
      field: 1,
      mandatory: true,
    },

    //Inteligencia Artificial 2
    {
      career_code: 58,
      course_code: '2838',
      semester: 10,
      field: 2,
      mandatory: false,
    },

    //Redes de Nueva Generacion
    {
      career_code: 58,
      course_code: '2839',
      semester: 10,
      field: 2,
      mandatory: false,
    },

    //Software Avanzado
    {
      career_code: 58,
      course_code: '2836',
      semester: 10,
      field: 3,
      mandatory: true,
    },

    //Sistemas Aplicados 2
    {
      career_code: 58,
      course_code: '2840',
      semester: 10,
      field: 3,
      mandatory: false,
    },

    //Auditoria de Proyectos de Software
    {
      career_code: 58,
      course_code: '2841',
      semester: 10,
      field: 3,
      mandatory: false,
    },
  ];

  return knex('career_courses')
    .del()
    .then(() => knex('career_courses').insert(career_courses));
}
