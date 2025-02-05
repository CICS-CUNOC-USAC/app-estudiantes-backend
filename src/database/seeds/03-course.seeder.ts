import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<any> {
  const courses = [
    //Edit kike

     // { code: 33, name: 'Civil' },
    // { code: 34, name: 'Mecánica' },
    // { code: 35, name: 'Industrial' },
    // { code: 36, name: 'Mecánica Industrial' },
    // { code: 58, name: 'Ciencias y Sistemas' },

    //Primer Semestre
    //Area Comun para las 5 carreras
    { code: '028', 
      name: 'Social Humanistica 1', 
      description: 'EL CURSO DE SOCIAL HUMANÍSTICA 1, TIENE COMO FINALIDAD; EL PROPORCIONAL AL ESTUDIANTE DEL AREA COMUN, DE LAS CARERRAS DE INGENIERIA, DE LA DIVISIÒN DE CIENCIAS DE LA INGENIERIA, DEL CENTRO UNIVERSITARIO DE OCCIDENTE (CUNOC), LOS CONOCIMIENTOS QUE LE PERMITAR TENER UN PANORAMA CIENTÌFICO SOBRE ASPECTOS DE LA SOCIEDAD EN FORMA GENERAL, CONOCIMIENTOS Y ELEMENTOS TEÓRICOS QUE SON INDISPENSABLES PARA INTERPRETAR CIENTÍFICAMENTE EL DESARROLLO DE LA SOCIEDAD.', 
      credits: 4,  
    }, //si esta correcto en todos los pensums
    { code: '169',
      name: 'Matematica Basica 1', 
      description: 'En este curso el alumno analizara conceptos, teorías, procedimientos, gráficas, y principios de modelado sobre los temas de: conjuntos, números reales, funciones, límites, derivadas, integrales, ecuaciones diferenciales, geometría analítica, vectores, matrices, determinantes, sistemas de ecuaciones lineales, y aplicaciones de las matemáticas en la ingeniería.',
      credits: 7, 
    }, //sip esta bien en todos los pensums
    {
      code: '2666',
      name: 'Orientacion y Liderazgo',
      description: 'El curso de Orientación y Liderazgo crea consciencia en el estudiante de su compromiso ante la sociedad guatemalteca que con el pago de sus impuestos financia su formación profesional; por lo que los egresados sancarlistas deben proponer soluciones a la problemática nacional que procuren el bien común. En el curso de Orientación y Liderazgo el estudiante conoce el perfil de egreso del ingeniero conforme a la carrera que estudia. Además, conoce el Código de Ética del Colegio de Ingenieros de Guatemala. El curso de Orientación y Liderazgo es un curso formativo en las competencias blandas: refuerza en el estudiante las cualidades de liderazgo que ya posee, y lo motiva para adquirir las cualidades de liderazgo que necesita para ser una persona exitosa que disfruta de relaciones interpersonales satisfactorias a nivel estudiantil, familiar, social, laboral y profesional.',
      credits: 1 , 
    },//credito correcto kajsd
    {
      code: '119',
      name: 'Tecnica Complementaria 1',
      description: 'La introducción al dibujo técnico se presenta en el curso Técnica Complementaria 1 a través de un recorrido desde conceptos generales hasta la elaboración de trabajos minuciosos y de carácter profesional. El curso principia con el conocimiento y uso de los instrumentos y materiales que requiere el dibujo técnico. Se presenta como un lenguaje al estudiante para comunicar ideas y convertirlas en el conocimiento de la realidad, abarcando metodologías para el uso de objetos, sistemas de medición, texturas de líneas, geometría básica e incluso técnicas de dibujo a mano alzada. Surge de la necesidad de tamaño, forma y relación de los objetos que nos rodean, espacios que se generan alrededor del cuerpo humano y la relación de este con todos los objetos que nos circundan.',
      credits: 3, 
    }, //creditos correctos entre todos los pensums
    { code: '177', 
      name: 'Deportes 1', 
      description: 'tiene como finalidad contribuir al desarrollo integral del estudiante de primer ingreso, desarrollando en él las competencias fundamentales que le permitan encontrar en dicho curso una válvula de escape ante el incremento de estrés y la ansiedad, al encontrarse en un contexto diferente en el área académica; además le permite desarrollar conciencia de la importancia de dicha práctica ante el antagonismo de las enfermedades del siglo XXI, tales como la diabetes, hipertensión, obesidad, entre otras. El curso de Deportes se concibe como un área de enseñanza que sitúa al educando como sujeto de aprendizaje y objeto de estudio desde los dos ejes de básicos desde su acción educativa como lo son el cuerpo y el movimiento comprendiendo una relación integral y dialéctica.', 
      credits: 1, 
    }, //creditos correctos entre todos los pensums
    { code: '216', 
      name: 'Quimica 1', 
      description: 'El curso de Química I, ésta vinculada a las actividades científicas y no científicas, con la finalidad de crear criterios para la comprensión y explicación de las otras ciencias que ayudan o afectan a la ingeniería. Ésta a la vez pretende que los estudiantes comprendan las diferentes teorías a través de los conceptos tanto a nivel atómico (partículas, teorías, modelos), como molecular (substancias compuestas, mezclas, soluciones, densidad). En todo caso la materia se analiza a través del análisis dimensional, formación de los enlaces químicos, nomenclatura química, reacciones químicas, cálculos estequiométricos y estado gaseoso. El estudiante justifica sus investigaciones socializándolas', 
      credits: 3, 
    },//creditos correctos entre todos los pensums
    { code: '2792', 
      name: 'Idioma Tecnico 1', 
      description: 'Curso el cual no se habilitaba en la division de ciencias de la ingenieria, pero podia ganarse asignandose los cursos y niveles en CALUSAC, ganando los 12 niveles necesarios', 
      credits: 2, 
    }, //creditos correctos y solo esta en el pensum de industrial y sistemas

    //Segundo Semestre
    //Area Comun
    { code: '029', name: 'Social Humanistica 2', description: '', credits: 4, },
    { code: '170', name: 'Matematica Basica 2', description: '', credits: 7, },
    {
      code: '2667',
      name: 'Tecnicas de Investigacion y Estudio',
      description: '',
      credits: 3,
    },
    { code: '072', name: 'Fisica Basica', description: '', credits: 5 },
    { code: '178', name: 'Deportes 2', description: '', credits: 1 },
    { code: '2793', name: 'Idioma Tecnico 2', description: '', credits: 2 },
    //Civil
    {
      code: '121',
      name: 'Tecnica Complementaria 2',
      description: '',
      credits: 3,
    },

    //Tercer Semestre
    //Area Comun
    {
      code: '290',
      name: 'Matematica Intermedia 1',
      description: '',
      credits: 10,
    },
    { code: '146', name: 'Fisica 1', description: '', credits: 6 },
    { code: '2794', name: 'Idioma Tecnico 3', description: '', credits: 2 },
    { code: '217', name: 'Quimica 2', description: '', credits: 4 },
    { code: '681', name: 'Geografia', description: '', credits: 3 },
    { code: '2394', name: 'Practica Inicial', description: '', credits: 0 },
    //Sistemas
    { code: '2797', name: 'Logica de Sistemas', description: '', credits: 2 },
    {
      code: '2795',
      name: 'Matematica de Computo 1',
      description: '',
      credits: 5,
    },
    {
      code: '2796',
      name: 'Introduccion a la Programacion y Computacion 1',
      description: '',
      credits: 4,
    },

    //Cuarto Semestre
    //Area Comun
    { code: '085', name: 'Logica', description: '', credits: 2 },
    {
      code: '291',
      name: 'Matematica Intermedia 2',
      description: '',
      credits: 5,
    },
    {
      code: '292',
      name: 'Matematica Intermedia 3',
      description: '',
      credits: 5,
    },
    { code: '147', name: 'Fisica 2', description: '', credits: 6 },
    { code: '109', name: 'Mecanica Analitica 1', description: '', credits: 5 },
    { code: '680', name: 'Legislacion 1', description: '', credits: 3 },
    { code: '949', name: 'Estadistica 1', description: '', credits: 5 },
    { code: '930', name: 'Geologia', description: '', credits: 3 },
    { code: '746', name: 'Topografia 1', description: '', credits: 6 },
    {
      code: '927',
      name: 'Introduccion a la Ingenieria Petrolera',
      description: '',
      credits: 3,
    },
    { code: '2801', name: 'Idioma Tecnico 4', description: '', credits: 2 },
    //Civil
    {
      code: 'A',
      name: 'Introduccion a Proyectos Gerenciales',
      description: '',
      credits: 6,
    }, //TODO: REVISAR, NO TIENE CODIGO
    { code: '925', name: 'Psicologia Industrial', description: '', credits: 3 },
    //Sistemas
    {
      code: '2798',
      name: 'Lenguajes Formales y de Programacion',
      description: '',
      credits: 3,
    },
    {
      code: '2799',
      name: 'Matematica de Computo 2',
      description: '',
      credits: 5,
    },
    {
      code: '2800',
      name: 'Introduccion a la Programacion y Computacion 2',
      description: '',
      credits: 5,
    },

    //Quinto Semestre
    //Area Comun
    {
      code: '077',
      name: 'Filosofia de la Ciencia',
      description: '',
      credits: 3,
    },
    { code: '673', name: 'Matematica Aplicada 1', description: '', credits: 6 },
    { code: '674', name: 'Matematica Aplicada 3', description: '', credits: 5 },
    { code: '148', name: 'Fisica 3', description: '', credits: 6 },
    { code: '694', name: 'Contabilidad 1', description: '', credits: 3 },
    { code: '094', name: 'Ecologia', description: '', credits: 3 },
    {
      code: '087',
      name: 'Programacion de Computadoras 1',
      description: '',
      credits: 3,
    },
    { code: '764', name: 'Legislacion 2', description: '', credits: 3 },
    {
      code: '928',
      name: 'Administracion de Personal',
      description: '',
      credits: 3,
    },
    { code: '926', name: 'Geologia del Petroleo', description: '', credits: 3 },
    //Civil
    { code: '747', name: 'Topografia 2', description: '', credits: 6 },
    {
      code: '672',
      name: 'Resistencia de Materiales 1',
      description: '',
      credits: 5,
    },
    {
      code: '2806',
      name: 'Principios de Metrologia',
      description: '',
      credits: 3,
    }, //TODO: REVISAR, NO TIENE CODIGO
    {
      code: '678',
      name: 'Ciencias de los Materiales',
      description: '',
      credits: 5,
    },
    { code: '671', name: 'Mecanica de Fluidos', description: '', credits: 6 },
    { code: '1060', name: 'Geologia Estructural', description: '', credits: 5 },
    { code: '920', name: 'Geofisica', description: '', credits: 4 },
    { code: '1068', name: 'Petrologia', description: '', credits: 4 },
    {
      code: '792',
      name: 'Perforacion de Pozos 1',
      description: '',
      credits: 5,
    },
    //Mecanica
    {
      code: '068',
      name: 'Dibujo Tecnico Mecanico',
      description: '',
      credits: 3,
    },
    {
      code: '2571',
      name: 'Electricidad y Electronica Basica',
      description: '',
      credits: 5,
    },
    { code: '118', name: 'Mecanica Analitica 2', description: '', credits: 5 },
    //Sistemas
    {
      code: '2802',
      name: 'Analisis Probabilistico',
      description: '',
      credits: 4,
    },
    {
      code: '2803',
      name: 'Organizacion de Lenguajes y Compiladores 1',
      description: '',
      credits: 4,
    },
    {
      code: '2804',
      name: 'Organizacion Computacional',
      description: '',
      credits: 3,
    },
    { code: '2805', name: 'Estructura de Datos', description: '', credits: 5 },
    { code: '2807', name: 'Practica Inicial TI', description: '', credits: 0 },

    //Sexto Semestre
    //Area Comun
    { code: '904', name: 'Matematica Aplicada 2', description: '', credits: 6 },
    { code: '905', name: 'Matematica Aplicada 4', description: '', credits: 4 },
    {
      code: '670',
      name: 'Ingenieria Electrica 1',
      description: '',
      credits: 5,
    },
    {
      code: '676',
      name: 'Ingenieria Electrica 2',
      description: '',
      credits: 5,
    },
    { code: '150', name: 'Fisica 4', description: '', credits: 6 },
    { code: '779', name: 'Contabilidad 2', description: '', credits: 3 },
    { code: '2670', name: 'Gestion de Desastres', description: '', credits: 3 },
    {
      code: '794',
      name: 'Programacion de Computadoras 2',
      description: '',
      credits: 4,
    },
    {
      code: '685',
      name: 'Investigacion de Operaciones 1',
      description: '',
      credits: 5,
    },
    {
      code: '677',
      name: 'Resistencia de Materiales 2',
      description: '',
      credits: 5,
    },
    //Civil
    { code: '1073', name: 'Topografia 3', description: '', credits: 6 },
    {
      code: '679',
      name: 'Materiales de Construccion',
      description: '',
      credits: 6,
    },
    { code: '748', name: 'Mecanica de Suelos', description: '', credits: 5 },
    { code: '686', name: 'Hidraulica', description: '', credits: 6 },
    //Mecanica
    { code: '684', name: 'Termodinamica 1', description: '', credits: 5 },
    { code: 'C', name: 'Geofisica del Petroleo', description: '', credits: 4 }, //TODO: REVISAR, NO TIENE CODIGO
    {
      code: '687',
      name: 'Procesos de Manufactura 1',
      description: '',
      credits: 3,
    },
    //Sistemas
    { code: '2808', name: 'Teoria de Sistemas 1', description: '', credits: 5 },
    { code: '2809', name: 'Economia', description: '', credits: 4 },
    {
      code: '2810',
      name: 'Organizacion de Lenguajes y Compiladores 2',
      description: '',
      credits: 5,
    },
    {
      code: '2811',
      name: 'Arquitectura de Computadores y Ensambladores 1',
      description: '',
      credits: 5,
    },
    {
      code: '2812',
      name: 'Manejo e Implementacion de Archivos',
      description: '',
      credits: 4,
    },

    //Septimo Semestre
    //Area Comun
    { code: '919', name: 'Contabilidad 3', description: '', credits: 3 },
    {
      code: '945',
      name: 'Ingenieria de la Produccion',
      description: '',
      credits: 5,
    },
    {
      code: '943',
      name: 'Administracion de Empresas 1',
      description: '',
      credits: 5,
    },
    {
      code: '795',
      name: 'Investigacion de Operaciones 2',
      description: '',
      credits: 5,
    },
    { code: '2585', name: 'Practica Intermedia', description: '', credits: 0 },
    //Civil
    { code: '940', name: 'Vias Terrestres 1', description: '', credits: 6 },
    {
      code: '924',
      name: 'Resistencia de Materiales 3',
      description: '',
      credits: 4,
    },
    {
      code: '745',
      name: 'Analisis Estructural 1',
      description: '',
      credits: 4,
    },
    { code: '935', name: 'Concreto Armado 1', description: '', credits: 5 },
    { code: '749', name: 'Hidrologia', description: '', credits: 6 },
    {
      code: '1061',
      name: 'Hidraulica de Canales',
      description: '',
      credits: 5,
    },
    { code: '769', name: 'Maquinas Hidraulicas', description: '', credits: 4 },
    //Mecanica
    { code: '688', name: 'Termodinamica 2', description: '', credits: 5 },
    //Mecanica-Industrial
    { code: '796', name: 'Microeconomia', description: '', credits: 3 },
    //Sistemas
    { code: '2813', name: 'Teoria de Sistemas 2', description: '', credits: 5 },
    { code: '950', name: 'Estadistica 2', description: '', credits: 5 },
    {
      code: '2814',
      name: 'Sistemas Operativos 1',
      description: '',
      credits: 5,
    },
    {
      code: '2815',
      name: 'Arquitectura de Computadores y Ensambladores 2',
      description: '',
      credits: 4,
    },
    {
      code: '2816',
      name: 'Redes de Computadoras 1',
      description: '',
      credits: 4,
    },
    {
      code: '2817',
      name: 'Sistemas de Bases de Datos 1',
      description: '',
      credits: 5,
    },
    {
      code: '2818',
      name: 'Practica Intemedia TI',
      description: '',
      credits: 0,
    },

    //Octavo Semestre
    //Area Comun
    {
      code: '690',
      name: 'Ingenieria Economica 1',
      description: '',
      credits: 5,
    },
    {
      code: '944',
      name: 'Administracion de Empresas 2',
      description: '',
      credits: 3,
    },
    //Civil
    { code: '906', name: 'Analisis Mecanico', description: '', credits: 5 },
    { code: '1074', name: 'Transportes', description: '', credits: 4 },
    { code: '1075', name: 'Vias Terrestres 2', description: '', credits: 6 },
    {
      code: '1063',
      name: 'Ingenieria de Transito',
      description: '',
      credits: 4,
    },
    {
      code: '1053',
      name: 'Analisis Estructural 2',
      description: '',
      credits: 6,
    },
    {
      code: '1072',
      name: 'Tipologia Estructural',
      description: '',
      credits: 4,
    },
    { code: '936', name: 'Concreto Armado 2', description: '', credits: 5 },
    { code: '932', name: 'Diseño Estructural', description: '', credits: 5 },
    { code: '799', name: 'Cimentaciones 1', description: '', credits: 5 },
    { code: '1067', name: 'Pavimentos', description: '', credits: 5 },
    { code: '1052', name: 'Aguas Subterraneas', description: '', credits: 5 },
    {
      code: '920-',
      name: 'Saneamiento Ambiental',
      description: '',
      credits: 5,
    }, //TODO: REVISAR, COMPARTE CODIGO CON GEOFISICA DE 5TO SEMESTRE DE CIVIL
    {
      code: '791',
      name: 'Ingenieria Sanitaria 1',
      description: '',
      credits: 5,
    },
    {
      code: '798',
      name: 'Ingenieria Sanitaria 2',
      description: '',
      credits: 5,
    },
    //Mecanica
    {
      code: '923',
      name: 'Circuitos Electricos 1',
      description: '',
      credits: 6,
    },
    {
      code: '946',
      name: 'Mantenimiento de Hospitales 1',
      description: '',
      credits: 5,
    },
    { code: '683', name: 'Diseño de Maquinas 1', description: '', credits: 6 },
    { code: '695', name: 'Plantas de Vapor', description: '', credits: 5 },
    { code: '952', name: 'Ingenieria de Plantas', description: '', credits: 6 },
    {
      code: '682',
      name: 'Metalurgia y Metalografia',
      description: '',
      credits: 6,
    },
    {
      code: '698',
      name: 'Procesos de Manufactura 2',
      description: '',
      credits: 3,
    },
    //Industrial
    { code: '793', name: 'Mercadotecnia 1', description: '', credits: 3 },
    {
      code: '778',
      name: 'Programacion Comercial',
      description: '',
      credits: 3,
    },
    //Sistemas
    {
      code: '2819',
      name: 'Sistemas Operativos 2',
      description: '',
      credits: 4,
    },
    {
      code: '2820',
      name: 'Redes de Computadoras 2',
      description: '',
      credits: 4,
    },
    {
      code: '2821',
      name: 'Sistemas de Bases de Datos 2',
      description: '',
      credits: 4,
    },
    {
      code: '2822',
      name: 'Analisis y Diseño de Sistemas 1',
      description: '',
      credits: 5,
    },
    {
      code: '2823',
      name: 'Seminario de Sistemas 1',
      description: '',
      credits: 3,
    },

    //Noveno Semestre
    //Area Comun
    {
      code: '2672',
      name: 'Introduccion a la Evaluacion de Impacto Ambiental',
      description: '',
      credits: 4,
    },
    {
      code: '922',
      name: 'Ingenieria Economica 2',
      description: '',
      credits: 4,
    },
    { code: '2570', name: 'Etica Profesional', description: '', credits: 4 },
    {
      code: '2837',
      name: 'Seminario de Investigacion',
      description: '',
      credits: 4,
    }, //TODO: REVISAR, EN SISTEMAS VALE 3 CREDITOS, NO 4
    //Civil
    {
      code: '911',
      name: 'Costos Presupuestos y Avaluos',
      description: '',
      credits: 6,
    },
    { code: '1062', name: 'Ingenieria Sismica', description: '', credits: 5 },
    {
      code: '1054',
      name: 'Analisis Estructural 3',
      description: '',
      credits: 5,
    },
    {
      code: '1057',
      name: 'Diseño de Estructuras de Mamposteria',
      description: '',
      credits: 5,
    },
    { code: '1071', name: 'Puentes', description: '', credits: 5 },
    {
      code: '1055',
      name: 'Concreto Preesforzado',
      description: '',
      credits: 5,
    },
    {
      code: '1058',
      name: 'Diseño de Estructuras Metalicas 1',
      description: '',
      credits: 5,
    },
    { code: '1070', name: 'Placas y Cascaras', description: '', credits: 5 },
    {
      code: '1066',
      name: 'Metodos de Construccion',
      description: '',
      credits: 3,
    },
    { code: '934', name: 'Cimentaciones 2', description: '', credits: 4 },
    { code: '788', name: 'Obras Hidraulicas', description: '', credits: 4 },
    //Mecanica
    { code: '954', name: 'Ingenieria de Metodos', description: '', credits: 6 },
    {
      code: '947',
      name: 'Mantenimiento de Hospitales 2',
      description: '',
      credits: 5,
    },
    {
      code: '744',
      name: 'Montaje y Mantenimiento de Equipo',
      description: '',
      credits: 5,
    },
    { code: '693', name: 'Mecanismos', description: '', credits: 3 },
    { code: '699', name: 'Diseño de Maquinas 2', description: '', credits: 6 },
    {
      code: '697',
      name: 'Refrigeracion y Aire Acondicionado',
      description: '',
      credits: 5,
    },
    //Industrial
    { code: '939', name: 'Economia Industrial', description: '', credits: 3 },
    {
      code: '941',
      name: 'Analisis de Sistemas Industriales',
      description: '',
      credits: 5,
    },
    { code: '797', name: 'Mercadotecnia 2', description: '', credits: 3 },
    {
      code: '931',
      name: 'Controles Industriales',
      description: '',
      credits: 6,
    },
    { code: '937', name: 'Ingenieria Textil 1', description: '', credits: 4 },
    { code: 'E', name: 'Legislacion Ambiental', description: '', credits: 3 }, //TODO: REVISAR, NO TIENE CODIGO
    //Sistemas
    {
      code: '2824',
      name: 'Modelacion y Simulacion 1',
      description: '',
      credits: 5,
    },
    {
      code: '2825',
      name: 'Sistemas Organizacionales y Gerenciales 1',
      description: '',
      credits: 4,
    },
    {
      code: '2830',
      name: 'Emprendedores de Negocios Informaticos',
      description: '',
      credits: 4,
    },
    {
      code: '2826',
      name: 'Inteligencia Artificial 1',
      description: '',
      credits: 4,
    },
    {
      code: '2831',
      name: 'Seguridad y Auditorias de Redes',
      description: '',
      credits: 4,
    },
    {
      code: '2827',
      name: 'Analisis y Diseño de Sistemas 2',
      description: '',
      credits: 3,
    },
    { code: '2832', name: 'Sistemas Aplicados 1', description: '', credits: 5 },
    {
      code: '2833',
      name: 'Bases de Datos Avanzadas',
      description: '',
      credits: 5,
    },
    {
      code: '2828',
      name: 'Seminario de Sistemas 2',
      description: '',
      credits: 3,
    },
    { code: '2829', name: 'Practica Final', description: '', credits: 0 },

    //Decimo Semestre
    //Area Comun
    {
      code: '2842',
      name: 'Seminario de Investigacion EPS',
      description: '',
      credits: 4,
    },
    { code: '912', name: 'Planeamiento', description: '', credits: 6 },
    {
      code: '909',
      name: 'Preparacion y Evaluacion de Proyectos 1',
      description: '',
      credits: 4,
    },
    {
      code: '918',
      name: 'Preparacion y Evaluacion de Proyectos 2',
      description: '',
      credits: 4,
    },
    { code: '2586', name: 'Practica Final', description: '', credits: 0 },
    //Civil
    { code: '1056', name: 'Dinamica Estructural', description: '', credits: 3 },
    {
      code: '1059',
      name: 'Diseño de Estructuras Metalicas 2',
      description: '',
      credits: 5,
    },
    {
      code: '1069',
      name: 'Planeamiento y Uso de los Recursos Hidraulicos',
      description: '',
      credits: 5,
    },
    { code: '933', name: 'Urbanismo', description: '', credits: 5 },
    //Mecanica
    {
      code: '914',
      name: 'Instrumentacion Mecanica',
      description: '',
      credits: 3,
    },
    {
      code: '913',
      name: 'Instalaciones Mecanicas',
      description: '',
      credits: 3,
    },
    {
      code: '948',
      name: 'Mantenimiento de Hospitales 3',
      description: '',
      credits: 5,
    },
    {
      code: '916',
      name: 'Seguridad e Higiene Industrial',
      description: '',
      credits: 3,
    },
    { code: 'F', name: 'Electronica 1', description: '', credits: 6 }, //TODO: REVISAR, NO TIENE CODIGO
    { code: '915', name: 'Vibraciones', description: '', credits: 5 },
    { code: '790', name: 'Diseño de Maquinas 3', description: '', credits: 6 },
    {
      code: '696',
      name: 'Motores de Combustion Interna',
      description: '',
      credits: 5,
    },
    {
      code: '907',
      name: 'Diseño de la Produccion',
      description: '',
      credits: 5,
    },
    //Industrial
    {
      code: 'G',
      name: 'Investigacion de Operaciones 3',
      description: '',
      credits: 5,
    }, //TODO: REVISAR, NO TIENE CODIGO
    { code: 'H', name: 'Produccion Mas Limpia', description: '', credits: 4 }, //TODO: REVISAR, NO TIENE CODIGO
    { code: '921', name: 'Econometria', description: '', credits: 5 },
    { code: '938', name: 'Ingenieria Textil 2', description: '', credits: 4 },
    {
      code: '910',
      name: 'Control de la Produccion',
      description: '',
      credits: 6,
    },
    //Sistemas
    {
      code: '2834',
      name: 'Sistemas Organizacionales y Gerenciales 2',
      description: '',
      credits: 4,
    },
    {
      code: '2835',
      name: 'Modelacion y Simulacion 2',
      description: '',
      credits: 5,
    },
    {
      code: '2838',
      name: 'Inteligencia Artificial 2',
      description: '',
      credits: 4,
    },
    {
      code: '2839',
      name: 'Redes de Nueva Generacion',
      description: '',
      credits: 4,
    },
    { code: '2836', name: 'Software Avanzado', description: '', credits: 6 },
    { code: '2840', name: 'Sistemas Aplicados 2', description: '', credits: 6 },
    {
      code: '2841',
      name: 'Auditoria de Proyectos de Software',
      description: '',
      credits: 5,
    },
    {
      code: '2833-',
      name: 'Bases de Datos Avanzadas',
      description: '',
      credits: 5,
    } ///jajskja aca comienzo yooo kik3.h (Enrique Hernandez)    
  ];

  return knex('courses')
    .del()
    .then(function () {
      return knex('courses').insert(courses);
    });
}
