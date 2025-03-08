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
    //Social Humanistica 1 (CORRECTAMENTE INGRESADO)
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
    //Mate Basica 1 (CORRECTAMENTE INGRESADO)
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
    //Orientacion y Liderazgo (CORRECTAMENTE INGRESADO)
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
    //Tecnica Complementaria 1 (CORRECTAMENTE INGRESADO)
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
    //Deportes 1 (CORRECTAMENTE INGRESADO)
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
    //Quimica 1 (CORRECTAMENTE INGRESADO)
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
    //Idioma Tecnico 1 - UNICAMENTE EXISTE EN SISTEMAS Y INDUSTRIAL (CORRECTAMENTE INGRESADO)
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
    
    //Social Humanistica 2 (CORRECTAMENTE INGRESADO)
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
    //Mate Basica 2 (CORRECTAMENTE INGRESADO)
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
    //Tecnicas de Investigacion y Estudio (CORRECTAMENTE INGRESADO)
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
    //Fisica Basica (CORRECTAMENTE INGRESADO)
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
    //deportes 2 (CORRECTAMENTE INGRESADO)
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
    //Idioma Tecnico 2 - EXISTE UNICAMENTE PARA SISTEMAS Y INDUSTRIAL (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2793',
      semester: 2,
      field: 4,
      mandatory: false,
    },
    //idioma tecnico industrial (CORRECTAMENTE INGRESADO)
    {
      career_code: 35,
      course_code: '2793',
      semester: 2,
      field: 13,
      mandatory: false,
    },
    //tecnica complementaria 2 para civil (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '121',
      semester: 2,
      field: 6,
      mandatory: true,
    },
    //TERCER SEMESTRE
    //AREA COMUN

    //Matematica Intermedia 1 (CORRECTAMENTE INGRESADO)
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
      mandatory: false, //se dejo como false segun el pensum.  pero se sabe que es obligatorio para todos
    },
    {
      career_code: 58,
      course_code: '290',
      semester: 3,
      field: 4,
      mandatory: true,
    },
    //Fisica 1 (CORRECTAMENTE INGRESADO)
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
      mandatory: false, //se dejo como false segun el pensum.  pero se sabe que es obligatorio para todos
    },
    {
      career_code: 58,
      course_code: '146',
      semester: 3,
      field: 4,
      mandatory: true,
    },
    //Quimica 2 (CORRECTAMENTE INGRESADO)
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
    //Geografia (CORRECTAMENTE INGRESADO)
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
    //Practica Inicial para civil, mecanica, industrial y mecanica industrial nada mas (CORRECTAMENTE INGRESADO)
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
    //Idioma Tecnico 3 - EXISTIR UNICAMENTE PARA SISTEMAS Y INDUSTRIAL (CORRECTAMENTE INGRESADO)
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
    //Logica de Sistemas (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2797',
      semester: 3,
      field: 1,
      mandatory: true,
    },
    //Matematica de Computo 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2795',
      semester: 3,
      field: 2,
      mandatory: true,
    },
    //Introduccion a la Programacion y Computacion 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2796',
      semester: 3,
      field: 3,
      mandatory: true,
    },
    //Filosofia de la Ciencia (CORRECTAMENTE INGRESADO)
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
    
    //Mate Intermedia 2 (CORRECTAMENTE INGRESADO)
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
    //Mate Intermedia 3 (CORRECTAMENTE INGRESADO)
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
    //Fisica 2 (CORRECTAMENTE INGRESADO)
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
    //PSICOLOGIA INDUSTRIAL (CORRECTAMENTE INGRESADO) 
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
    {
      career_code: 35,
      course_code: '925',
      semester: 9,
      field: 9,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '925',
      semester: 5,
      field: 1,
      mandatory: true,
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

    //Topografia 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '747',
      semester: 5,
      field: 1,
      mandatory: true,
    }, 
    //Resistencia de materiales 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '672',
      semester: 5,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '672',
      semester: 6,
      field: 4,
      mandatory: true,
    }, 
    {
      career_code: 35,
      course_code: '672',
      semester: 5,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '672',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    //CIENCIAS DE LOS MATERIALES (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '678',
      semester: 5,
      field: 3,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '678',
      semester: 6,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '678',
      semester: 6,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '678',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    //MECANICA DE FLUIDOS (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '671',
      semester: 5,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '671',
      semester: 5,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '671',
      semester: 5,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '671',
      semester: 5,
      field: 1,
      mandatory: true,
    }, 
    //Geologia Estructural (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1060',
      semester: 5,
      field: 7,
      mandatory: false,
    },
    //Geofisica (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '920',
      semester: 5,
      field: 7,
      mandatory: false,
    },
    //Petrologia (CORRECTAMENTE INGRESADO)0
    {
      career_code: 33,
      course_code: '1068',
      semester: 5,
      field: 7,
      mandatory: false,
    },    
    //Matematica Aplicada 1 (CORRECTAMENTE INGRESADO)
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
      field: 2,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '673',
      semester: 5,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '673',
      semester: 5,
      field: 4,
      mandatory: true,
    },
    //Matematica Aplicada 3 (CORRECTAMENTE INGRESADO)
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
      field: 2,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '674',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '674',
      semester: 5,
      field: 4,
      mandatory: true,
    },
    //Fisica 3 (CORRECTAMENTE INGRESADO)
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
      field: 1,
      mandatory: false,
    },
    //circuitos electricos 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '923',
      semester: 5,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '923',
      semester: 8,
      field: 1,
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
    //Principios de Metrologia (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '2669',
      semester: 5,
      field: 2,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '2669',
      semester: 5,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '2669',
      semester: 5,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '2669',
      semester: 5,
      field: 1,
      mandatory: false,
    },
    //principios de metrologia pa sistemas (CORRECTAMENTE INGRESADO)
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
    //Programacion de Computadoras 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '087',
      semester: 5,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '087',
      semester: 6,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '087',
      semester: 6,
      field: 10,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '087',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    //Legislacion 2 (CORRECTAMENTE INGRESADO)
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
      field: 9,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '764',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //perforacion de pozos 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '792',
      semester: 5,
      field: 7,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '792',
      semester: 6,
      field: 5,
      mandatory: false,
    },
    //Administracion de Personal (CORRECTAMENTE INGRESADO)
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
      career_code: 36,
      course_code: '928',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '928',
      semester: 10,
      field: 9,
      mandatory: true,
    },
    //Geologia del Petroleo (CORRECTAMENTE INGRESADO)
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
    //Electricidad y electronica basica (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '2571',
      semester: 5,
      field: 2,
      mandatory: false,
    },
    //Mecanica analitica 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '118',
      semester: 5,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '118',
      semester: 5,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '118',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    //Sistemas
    //Analisis Probabilistico (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2802',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    //Organizacion de Lenguajes y Compiladores 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2803',
      semester: 5,
      field: 2,
      mandatory: true,
    },
    //Organizacion Computacional (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2804',
      semester: 5,
      field: 2,
      mandatory: true,
    },
    //Estructura de Datos (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2805',
      semester: 5,
      field: 3,
      mandatory: true,
    },
    //Practica Inicial TI (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2807',
      semester: 5,
      field: 5,
      mandatory: true,
    },
    //SEXTO SEMESTRE
    //AREA COMUN

    //TOPOGRAFIA 3 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1073',
      semester: 6,
      field: 1,
      mandatory: false,
    },
    //Materiales de construccion (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '679',
      semester: 6,
      field: 3,
      mandatory: true,
    },
    //Mecanica de Suelos (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '748',
      semester: 6,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '748',
      semester: 10,
      field: 1,
      mandatory: false,
    },
    //Hidraulica (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '686',
      semester: 6,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '686',
      semester: 8,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '686',
      semester: 6,
      field: 1,
      mandatory: false,
    },
    //Termodinamica 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '684',
      semester: 6,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '684',
      semester: 6,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '684',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //Estadistica 3 (CORRECTAMENTE INGRESADO) solo para industrial
    {
      career_code: 35,
      course_code: '1234',
      semester: 6,
      field: 7,
      mandatory: false,
    },
    //Mercadotecnia (CORRECTAMENTE INGRESADO)
    {
      career_code: 35,
      course_code: '793',
      semester: 8,
      field: 9,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '793',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //Ingenieria de Plantas (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '952',
      semester: 8,
      field: 3,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '952',
      semester: 7,
      field: 6,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '952',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //Mecanismos (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '693',
      semester: 9,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '693',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //Metalurgia y Metalografia (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '682',
      semester: 8,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '682',
      semester: 7,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '682',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //Procesos de Manufactura 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '687',
      semester: 7,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '687',
      semester: 7,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '687',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //Matematica Aplicada 2 (CORRECTAMENTE INGRESADO)
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
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '904',
      semester: 6,
      field: 4,
      mandatory: false,
    },
    //Matematica Aplicada 4 (CORRECTAMENTE INGRESADO)
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
      field: 2,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '905',
      semester: 6,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '905',
      semester: 6,
      field: 4,
      mandatory: false,
    },
    //Ingenieria Electrica 1 (CORRECTAMENTE INGRESADO)
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
      field: 5,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '670',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '670',
      semester: 6,
      field: 4,
      mandatory: false,
    },
    //Ingenieria Electrica 2 (CORRECTAMENTE INGRESADO)
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
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '676',
      semester: 6,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '676',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //Fisica 4 (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '150',
      semester: 6,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '150',
      semester: 6,
      field: 1,
      mandatory: false,
    },
    //Contabilidad 2 (CORRECTAMENTE INGRESADO)
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
      field: 8,
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
    //Gestion de Desastres (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '2670',
      semester: 5,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '2670',
      semester: 9,
      field: 3,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '2670',
      semester: 9,
      field: 12,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '2670',
      semester: 7,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '2670',
      semester: 6,
      field: 4,
      mandatory: false,
    },
    //Programacion de Computadoras 2 (CORRECTAMENTE INGRESADO)
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
      semester: 7,
      field: 10,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '794',
      semester: 6,
      field: 1,
      mandatory: false,
    },
    //Investigacion de Operaciones 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '685',
      semester: 6,
      field: 8,
      mandatory: false,
    },
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
      semester: 7,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '685',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '685',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //Resistencia de Materiales 2 (CORRECTAMENTE INGRESADO)
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
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '677',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //Sistemas
    //Teoria de Sistemas 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2808',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    //Economia (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2809',
      semester: 6,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '2809',
      semester: 7,
      field: 8,
      mandatory: false,
    },
    //Organizacion de Lenguajes y Compiladores 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2810',
      semester: 6,
      field: 2,
      mandatory: true,
    },
    //Arquitectura de Computadoras y Ensambladores 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2811',
      semester: 6,
      field: 2,
      mandatory: true,
    },
    //Manejo e Implementacion de Archivos (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2812',
      semester: 6,
      field: 3,
      mandatory: true,
    },
    //SEPTIMO SEMESTRE
    //AREA COMUN y/o Area Profesional

    //Vias Terrestres 1  (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '940',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    //Resistencia De Materiales 3 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '924',
      semester: 7,
      field: 2,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '924',
      semester: 8,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '924',
      semester: 7,
      field: 1,
      mandatory: false,
    },
    //Analisis Estructural 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '745',
      semester: 7,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '745',
      semester: 9,
      field: 2,
      mandatory: false,
    },
    // Concreto Armado 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '935',
      semester: 7,
      field: 2,
      mandatory: true,
    },
    // Hidrologia (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '749',
      semester: 7,
      field: 4,
      mandatory: true,
    },
    //Hidraulica de canales (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1061',
      semester: 7,
      field: 4,
      mandatory: false,
    },
    // Maquinas Hidraulicas (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '769',
      semester: 7,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '769',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '769',
      semester: 7,
      field: 1,
      mandatory: false,
    },   
    //Contabilidad 3 (CORRECTAMENTE INGRESADO)
    {
      career_code: 35,
      course_code: '919',
      semester: 7,
      field: 8,
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
    //Ingenieria de la Produccion (CORRECTAMENTE INGRESADO)
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
    //Administracion de Empresas 1 (CORRECTAMENTE INGRESADO)
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
      semester: 9,
      field: 9,
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
    //Investigacion de Operaciones 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '795',
      semester: 7,
      field: 8,
      mandatory: false,
    },
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
      semester: 8,
      field: 7,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '795',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 58,
      course_code: '795',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    //Practica Intermedia (CORRECTAMENTE INGRESADO)
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
      field: 11,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '2585',
      semester: 7,
      field: 2,
      mandatory: true,
    },
    //Termodinamica 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '688',
      semester: 7,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '688',
      semester: 7,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '688',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    //Geofisica del Petroleo (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: 'C',
      semester: 7,
      field: 3,
      mandatory: false,
    },
    //Microeconomia (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '796',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '796',
      semester: 8,
      field: 8,
      mandatory: true,
    },
    //Mercadotecnia 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '797',
      semester: 7,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '797',
      semester: 10,
      field: 9,
      mandatory: false,
    },
    // Ingenieria de Metodos (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '954',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '954',
      semester: 9,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '954',
      semester: 8,
      field: 6,
      mandatory: true,
    },
    //Seguridad e Higiene Industrial (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '916',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '916',
      semester: 10,
      field: 9,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '916',
      semester: 10,
      field: 1,
      mandatory: false,
    },
    //Diseño de Maquinas 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '683',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '683',
      semester: 8,
      field: 2,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '683',
      semester: 8,
      field: 5,
      mandatory: false,
    },
    //Montaje y mantenimiento de equipo (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '744',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '744',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '744',
      semester: 10,
      field: 5,
      mandatory: false,
    },
    //Procesos de Manufactura 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '698',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '698',
      semester: 8,
      field: 4,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '698',
      semester: 8,
      field: 5,
      mandatory: true,
    },
    //Vibraciones (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '915',
      semester: 7,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '915',
      semester: 10,
      field: 2,
      mandatory: true,
    },
    //Programacion Comercial (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '778',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '778',
      semester: 8,
      field: 10,
      mandatory: true,
    },
    //Sistemas
    //Teoria de Sistemas 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2813',
      semester: 7,
      field: 1,
      mandatory: true,
    },
    //Estadistica 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '950',
      semester: 7,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 33,
      course_code: '950',
      semester: 5,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '950',
      semester: 5,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '950',
      semester: 5,
      field: 7,
      mandatory: true
    },
    {
      career_code: 36,
      course_code: '950',
      semester: 5,
      field: 1,
      mandatory: true,
    },
    //Sistemas Operativos 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2814',
      semester: 7,
      field: 2,
      mandatory: true,
    },
    //Arquitectura de Computadores y Ensambladores 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2815',
      semester: 7,
      field: 2,
      mandatory: true,
    },
    //Redes de Computadores 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2816',
      semester: 7,
      field: 2,
      mandatory: true,
    },
    //Sistemas de Bases de Datos 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2817',
      semester: 7,
      field: 3,
      mandatory: true,
    },
    //Practica Intermedia TI (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2818',
      semester: 7,
      field: 5,
      mandatory: true,
    },
    //Octavo Semestre
    //Civil
    //Transportes (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1074',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    //VIAS TERRESTRES (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1075',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    //Ingenieria de Transito (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1063',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    //Analisis estructural 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1053',
      semester: 8,
      field: 2,
      mandatory: false,
    },
    //Tipologia Estructural (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1072',
      semester: 8,
      field: 2,
      mandatory: false,
    },
    // Concreto armado 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '936',
      semester: 8,
      field: 2,
      mandatory: true,
    },
    // Diseño Estructural (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '932',
      semester: 8,
      field: 2,
      mandatory: true,
    },
    // Cimentaciones 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '799',
      semester: 8,
      field: 3,
      mandatory: true,
    },
    //Pavimentos (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1067',
      semester: 8,
      field: 3,
      mandatory: false,
    },
    //Aguas Subterraneas (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1052',
      semester: 8,
      field: 4,
      mandatory: false,
    },
    //Saneamiento Ambiental (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '920A', //ojo con el codigo del curso
      semester: 8,
      field: 4,
      mandatory: false,
    },
    // Ingenieria Sanitaria 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '791',
      semester: 8,
      field: 4,
      mandatory: true,
    },
    // Ingenieria Sanitaria 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '798',
      semester: 8,
      field: 4,
      mandatory: true,
    },
    //Analisis mecanico (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '906',
      semester: 8,
      field: 6,
      mandatory: true,
    },
    //Area Comun
    //Ingenieria Economica 1 (CORRECTAMENTE INGRESADO)
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
      semester: 6,
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
    //Administracion de Empresas 2 (CORRECTAMENTE INGRESADO)
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
      semester: 10,
      field: 9,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '944',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    //Mecanica 
    //Mantenimiento de Hospitales 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '946',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    //Plantas de vapor (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '695',
      semester: 8,
      field: 3,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '695',
      semester: 9,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '695',
      semester: 8,
      field: 1,
      mandatory: true,
    },
    // Industrial
    //Motores de Combustion Interna (CORRECTAMENTE INGRESADO)
    {
      career_code: 35,
      course_code: '696',
      semester: 8,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '696',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '696',
      semester: 10,
      field: 3,
      mandatory: true,
    },
    //Legislacion Ambiental (CORRECTAMENTE INGRESADO)
    {
      career_code: 35,
      course_code: 'E',
      semester: 8,
      field: 12,
      mandatory: false,
    },
    //MECANICA INDUSTRIAL 
    // Economia Industrial (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '939',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '939',
      semester: 9,
      field: 8,
      mandatory: false,
    },
    //Econometria (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '921',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '921',
      semester: 9,
      field: 7,
      mandatory: false,
    },
    //Diseño de la Produccion (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '907',
      semester: 8,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '907',
      semester: 10,
      field: 5,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '907',
      semester: 9,
      field: 6,
      mandatory: true,
    },
    //Controles industriales (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '931',
      semester: 8,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '931',
      semester: 9,
      field: 6,
      mandatory: true,
    },
    //Ingenieria Textil 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '937',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '937',
      semester: 10,
      field: 6,
      mandatory: false,
    },
    // Diseño de maquinas 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '699',
      semester: 8,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '699',
      semester: 9,
      field: 2,
      mandatory: true,
    },
    // Refrigeracion y aire acondicionado (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '697',
      semester: 8,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 34,
      course_code: '697',
      semester: 9,
      field: 3,
      mandatory: true,
    },
    //Sistemas
    //Sistemas Operativos 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2819',
      semester: 8,
      field: 2,
      mandatory: true,
    },
    //Redes de Computadores 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2820',
      semester: 8,
      field: 2,
      mandatory: true,
    },
    //Sistemas de Bases de Datos 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2821',
      semester: 8,
      field: 3,
      mandatory: true,
    },
    //Analisis y Diseño de Sistemas 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2822',
      semester: 8,
      field: 3,
      mandatory: true,
    },
    //Seminario de Sistemas 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2823',
      semester: 8,
      field: 3,
      mandatory: true,
    },
    //NOVENO SEMESTRE
    //Civil
    //Dinamica Estructural (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1056',
      semester: 10,
      field: 2,
      mandatory: false,
    },
    //Diseño de Estructuras Metalicas 2  (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1059',
      semester: 10,
      field: 2,
      mandatory: false,
    },
    //Diseños Estructurales APC (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: 'I',
      semester: 10,
      field: 2,
      mandatory: true,
    },
    //Planeamiento y uso de recursos hidraulicos (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1069',
      semester: 10,
      field: 4,
      mandatory: false,
    },
    //Urbanismo (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '933',
      semester: 10,
      field: 5,
      mandatory: false,
    },
    //Programacion de proyectos APC (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: 'J',
      semester: 10,
      field: 8,
      mandatory: false,
    },
    //Diseño de Proyectos de Agua Potable APC (CORRECTAMENTE INCORRECTO)
    {
      career_code: 33,
      course_code: 'K',
      semester: 10,
      field: 8,
      mandatory: false,
    },
    //Seminario de Investigacion Para civil, mecanica, industrial y mecanica industrial
    // (Correctamente Ingresado)
    {
      career_code: 33,
      course_code: '2671',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '2671',
      semester: 9,
      field: 5,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '2671',
      semester: 9,
      field: 11,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '2671',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    //Ingenieria Sismica (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1062',
      semester: 9,
      field: 2,
      mandatory: false,
    },
    //Elementos Finitos (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1054',
      semester: 9,
      field: 2,
      mandatory: false,
    },
    //Diseño de Estructuras de Mamposteria (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1057',
      semester: 9,
      field: 2,
      mandatory: true,
    },
    //Puentes (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1071',
      semester: 9,
      field: 2,
      mandatory: true,
    },
    //Concreto Preesforzado (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1055',
      semester: 9,
      field: 2,
      mandatory: false,
    },
    //Diseño de estructuras metalicas 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1058',
      semester: 9,
      field: 2,
      mandatory: false,
    },
    //Placas y Cascaras (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1070',
      semester: 9,
      field: 2,
      mandatory: false,
    },
    //Metodos de construccion (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '1066',
      semester: 9,
      field: 3,
      mandatory: false,
    },
    //Cimentaciones 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '934',
      semester: 9,
      field: 3,
      mandatory: false,
    },
    //Obras Hidraulicas (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '788',
      semester: 9,
      field: 4,
      mandatory: false,
    },
    //Costos, Presupuestos Y Avaluos (CORRECTAMENTE INGRESADO)
    {
      career_code: 33,
      course_code: '911',
      semester: 9,
      field: 5,
      mandatory: true,
    }, 
    //Analisis de sistemas industriales (CORRECTAMENTE INGRESADO)
    {
      career_code: 35,
      course_code: '941',
      semester: 9,
      field: 9,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '941',
      semester: 9,
      field: 1,
      mandatory: false,
    },
    //Control de la produccion (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '910',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 35,
      course_code: '910',
      semester: 10,
      field: 6,
      mandatory: true,
    },
    //Ingenieria textil 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '938',
      semester: 9,
      field: 1,
      mandatory: false,
    },
    //Diseño de maquinas 3 (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '790',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '790',
      semester: 10,
      field: 2,
      mandatory: true,
    },
    //Instrumentacion Mecanica (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '914',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '914',
      semester: 10,
      field: 1,
      mandatory: true,
    },
    //Instalaciones mecanicas (CORRECTAMENTE INGRESADO)
    {
      career_code: 36,
      course_code: '913',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    {
      career_code: 34,
      course_code: '913',
      semester: 10,
      field: 1,
      mandatory: true,
    },
    //AREA COMUN
    //Introduccion a la Evaluacion de Impacto Ambiental (CORRECTAMENTE INGRESADO)
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
      field: 12,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '2672',
      semester: 9,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '2672',
      semester: 9,
      field: 4,
      mandatory: false,
    },
    //Ingenieria Economica 2 (CORRECTAMENTE INGRESADO)
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
      semester: 7,
      field: 8,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '922',
      semester: 6,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '922',
      semester: 9,
      field: 4,
      mandatory: false,
    },
    //Etica Profesional (CORRECTAMENTE INGRESADO)
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
      field: 6,
      mandatory: false,
    },
    {
      career_code: 35,
      course_code: '2570',
      semester: 10,
      field: 4,
      mandatory: false,
    },
    {
      career_code: 36,
      course_code: '2570',
      semester: 9,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '2570',
      semester: 9,
      field: 4,
      mandatory: false,
    },
    //Practicas Finales (CORRECTAMENTE INGRESADO) Para civil
    {
      career_code: 34,
      course_code: '2586',
      semester: 10,
      field: 9,
      mandatory: true,
    },
    //mecanica
    //Mantenimiento de hospitales 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '947',
      semester: 9,
      field: 1,
      mandatory: false,
    },
    //Sistemas
    //Modelacion y Simulacion 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2824',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    //Sistemas Organizacionales y Gerenciales 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2825',
      semester: 9,
      field: 1,
      mandatory: true,
    },
    //Emprendedores de Negocios Informaticos (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2830',
      semester: 9,
      field: 1,
      mandatory: false,
    },
    //Inteligencia Artificial 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2826',
      semester: 9,
      field: 2,
      mandatory: true,
    },
    //Seguridad y Auditorias de Redes (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2831',
      semester: 9,
      field: 2,
      mandatory: false,
    },
    //Analisis y Diseño de Sistemas 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2827',
      semester: 9,
      field: 3,
      mandatory: true,
    },
    //Sistemas Aplicados 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2832',
      semester: 9,
      field: 3,
      mandatory: false,
    },
    //Bases de Datos Avanzadas (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2833',
      semester: 9,
      field: 3,
      mandatory: false,
    },
    //Seminario de Sistemas 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2828',
      semester: 9,
      field: 3,
      mandatory: true,
    },
    //DECIMO SEMESTRE
    // Seminario de investigacion en sistemas (Correctamente Ingresado)
    {
      career_code: 58,
      course_code: '2837',
      semester: 10,
      field: 4,
      mandatory: true,
    },
    //AREA COMUN
    //Seminario de Investigacion EPS (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2842',
      semester: 10,
      field: 4,
      mandatory: false, //curso opcional nada mas para sistemas
    },
    //Planeamiento (CORRECTAMENTE INGRESADO)
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
      career_code: 36,
      course_code: '912',
      semester: 9,
      field: 1,
      mandatory: false,
    },
    {
      career_code: 58,
      course_code: '912',
      semester: 10,
      field: 4,
      mandatory: false,
    },
    //Preparacion y Evaluacion de Proyectos 1 (CORRECTAMENTE INGRESADO)
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
      field: 11,
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
    //Preparacion y Evaluacion de Proyectos 2 (CORRECTAMENTE INGRESADO)
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
      field: 11,
      mandatory: true,
    },
    {
      career_code: 36,
      course_code: '918',
      semester: 10,
      field: 1,
      mandatory: false,
    },
    //Practicas Finales (CORRECTAMENTE INGRESADO) PARA MECANICA INDUSTRIAL
    {
      career_code: 33,
      course_code: '2586',
      semester: 10,
      field: 1,
      mandatory: true,
    },
    //Practicas Finales (CORRECTAMENTE INGRESADO) PARA MECANICA
    {
      career_code: 34,
      course_code: '2741',
      semester: 9,
      field: 7,
      mandatory: true,
    },
    //Practicas finales (CORRECTAMENTE INGRESADO) Para industrial
    {
      career_code: 35,
      course_code: '2740',
      semester: 9,
      field: 11,
      mandatory: true,
    },
    //Practicas Finales (CORRECTAMENTE INGRESADO) PARA MECANICA INDUSTRIAL
    {
      career_code: 36,
      course_code: '2742',
      semester: 10,
      field: 1,
      mandatory: true,
    },
    //Practica Final de Sistemas (CORRECTAMENTE INGRESADO) 
    {
      career_code: 58,
      course_code: '2829',
      semester: 9,
      field: 5,
      mandatory: true,
    },
    //Mantenimiento de Hospitales 3 (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: '948',
      semester: 10,
      field: 1,
      mandatory: false,
    },
    //Electronica 1 (CORRECTAMENTE INGRESADO)
    {
      career_code: 34,
      course_code: 'F',
      semester: 10,
      field: 1,
      mandatory: false,
    },
    //Investigacion de operaciones 3 (CORRECTAMENTE INGRESADO)
    {
      career_code: 35,
      course_code: 'G',
      semester: 10,
      field: 7,
      mandatory: false,
    },
    //Produccion mas limpia (CORRECTAMENTE INGRESADO)
    {
      career_code: 35,
      course_code: 'H',
      semester: 10,
      field: 12,
      mandatory: false,
    },
    //Sistemas
    //Sistemas Organizacionales y Gerenciales 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2834',
      semester: 10,
      field: 1,
      mandatory: true,
    },
    //Modelacion y Simulacion 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2835',
      semester: 10,
      field: 1,
      mandatory: true,
    },
    //Inteligencia Artificial 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2838',
      semester: 10,
      field: 2,
      mandatory: false,
    },
    //Redes de Nueva Generacion (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2839',
      semester: 10,
      field: 2,
      mandatory: false,
    },
    //Software Avanzado (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2836',
      semester: 10,
      field: 3,
      mandatory: true,
    },
    //Sistemas Aplicados 2 (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2840',
      semester: 10,
      field: 3,
      mandatory: false,
    },
    //Auditoria de Proyectos de Software (CORRECTAMENTE INGRESADO)
    {
      career_code: 58,
      course_code: '2841',
      semester: 10,
      field: 3,
      mandatory: false,
    },
    //Hasta aca llego mi apoyo al cics, no creo que sepa hacer otra cosa pero fue bueno aunque sea aportar mi granito de arena F. kik3-h (Enrique Hernandez)

  ];

  return knex('career_courses')
    .del()
    .then(() => knex('career_courses').insert(career_courses));
}
