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
      credits: 4, }, //si esta correcto en todos los pensums
    { code: '169',
      name: 'Matematica Basica 1', 
      description: 'En este curso el alumno analizara conceptos, teorías, procedimientos, gráficas, y principios de modelado sobre los temas de: conjuntos, números reales, funciones, límites, derivadas, integrales, ecuaciones diferenciales, geometría analítica, vectores, matrices, determinantes, sistemas de ecuaciones lineales, y aplicaciones de las matemáticas en la ingeniería.',
      credits: 7, }, //sip esta bien en todos los pensums
    { code: '2666',
      name: 'Orientacion y Liderazgo',
      description: 'El curso de Orientación y Liderazgo crea consciencia en el estudiante de su compromiso ante la sociedad guatemalteca que con el pago de sus impuestos financia su formación profesional; por lo que los egresados sancarlistas deben proponer soluciones a la problemática nacional que procuren el bien común. En el curso de Orientación y Liderazgo el estudiante conoce el perfil de egreso del ingeniero conforme a la carrera que estudia. Además, conoce el Código de Ética del Colegio de Ingenieros de Guatemala. El curso de Orientación y Liderazgo es un curso formativo en las competencias blandas: refuerza en el estudiante las cualidades de liderazgo que ya posee, y lo motiva para adquirir las cualidades de liderazgo que necesita para ser una persona exitosa que disfruta de relaciones interpersonales satisfactorias a nivel estudiantil, familiar, social, laboral y profesional.',
      credits: 1 , },//credito correcto kajsd
    { code: '119',
      name: 'Tecnica Complementaria 1',
      description: 'La introducción al dibujo técnico se presenta en el curso Técnica Complementaria 1 a través de un recorrido desde conceptos generales hasta la elaboración de trabajos minuciosos y de carácter profesional. El curso principia con el conocimiento y uso de los instrumentos y materiales que requiere el dibujo técnico. Se presenta como un lenguaje al estudiante para comunicar ideas y convertirlas en el conocimiento de la realidad, abarcando metodologías para el uso de objetos, sistemas de medición, texturas de líneas, geometría básica e incluso técnicas de dibujo a mano alzada. Surge de la necesidad de tamaño, forma y relación de los objetos que nos rodean, espacios que se generan alrededor del cuerpo humano y la relación de este con todos los objetos que nos circundan.',
      credits: 3, }, //creditos correctos entre todos los pensums
    { code: '177', 
      name: 'Deportes 1', 
      description: 'tiene como finalidad contribuir al desarrollo integral del estudiante de primer ingreso, desarrollando en él las competencias fundamentales que le permitan encontrar en dicho curso una válvula de escape ante el incremento de estrés y la ansiedad, al encontrarse en un contexto diferente en el área académica; además le permite desarrollar conciencia de la importancia de dicha práctica ante el antagonismo de las enfermedades del siglo XXI, tales como la diabetes, hipertensión, obesidad, entre otras. El curso de Deportes se concibe como un área de enseñanza que sitúa al educando como sujeto de aprendizaje y objeto de estudio desde los dos ejes de básicos desde su acción educativa como lo son el cuerpo y el movimiento comprendiendo una relación integral y dialéctica.', 
      credits: 1, }, //creditos correctos entre todos los pensums
    { code: '216', 
      name: 'Quimica 1', 
      description: 'El curso de Química I, ésta vinculada a las actividades científicas y no científicas, con la finalidad de crear criterios para la comprensión y explicación de las otras ciencias que ayudan o afectan a la ingeniería. Ésta a la vez pretende que los estudiantes comprendan las diferentes teorías a través de los conceptos tanto a nivel atómico (partículas, teorías, modelos), como molecular (substancias compuestas, mezclas, soluciones, densidad). En todo caso la materia se analiza a través del análisis dimensional, formación de los enlaces químicos, nomenclatura química, reacciones químicas, cálculos estequiométricos y estado gaseoso. El estudiante justifica sus investigaciones socializándolas', 
      credits: 3, },//creditos correctos entre todos los pensums
    { code: '2792', 
      name: 'Idioma Tecnico 1', 
      description: 'Curso el cual no se habilitaba en la division de ciencias de la ingenieria, pero podia ganarse asignandose los cursos y niveles en CALUSAC, ganando los 12 niveles necesarios', 
      credits: 2, }, //creditos correctos y solo esta en el pensum de industrial y sistemas
    //Segundo Semestre
    //Area Comun
    { code: '029', 
      name: 'Social Humanistica 2',
      description: 'tiene como finalidad; el proporcionar al estudiante del área común, de las carreras de ingeniería, de la División de Ciencias de la Ingeniería, del Centro Universitario de Occidente (CUNOC), los conocimientos que le permitan tener un panorama científico sobre aspectos de la sociedad en forma general, conocimientos y elementos teóricos que son indispensables para interpretar científicamente el desarrollo de la sociedad. Estableciendo los vínculos entre el pasado y el presente de las diferentes sociedades recurriendo al instrumental teórico metodológico que podrá ser utilizado y aplicado por el estudiantes para realizar ese análisis e interpretar científicamente el desarrollo de la sociedad, incluyendo para ello los contenidos temáticos siguientes: conceptos básicos para el estudio de la sociedad, desarrollo histórico de la sociedad y esbozo de la sociedad guatemalteca, sociedad precolonial guatemalteca, sociedad colonial guatemalteca, sociedad independiente guatemalteca, sociedad republicana guatemalteca También acorde a los cambios como parte de los contenidos se hace mención de temas relacionados con GIRD y ACC, porque no se tiene un contenido específico con esa temática', 
      credits: 4, }, //creditos correctos
    { code: '170', 
      name: 'Matematica Basica 2', 
      description: 'En este curso el alumno analizará conceptos, teorías, procedimientos, gráficas y principios de modelado sobre los temas de Límites, la derivada, leyes de derivación, aplicaciones de la derivada, la integral y aplicaciones de la integral. En la solución de problemas de mediana complejidad en el campo de las ciencias naturales y sociales, que le permitan desarrollar las competencias específicas de lenguaje oral y escrito, abstracción y modelado matemático; razonamiento y análisis matemático de problemas y aplicaciones a la ciencia de la ingeniería, lo que le permitirá comprender el cálculo diferencial e integral, base importante para su formación profesional y de su especialidad', 
      credits: 7, }, //correcto en todos los pensums
    { code: '2667',
      name: 'Tecnicas de Investigacion y Estudio',
      description: 'Es un curso teórico - práctico que tiene la finalidad de proporcionar al estudiante de la Ingeniería, la capacidad a adquirir y practicar en su carrera profesional: Hábitos de Estudio, Técnicas de Estudio y Técnicas de Investigación para tener éxito en sus estudios y elaborar informes de Investigación Científica. Se realizará el Protocolo de Investigación sobre problemas de Ingeniería con la inserción de la temática de Gestión Integral de Riesgo de Desastre GIRD y la Adaptación al Cambio Climático ACC y según demandas sociales de investigación. Abarcando los otros 2 Pilares de la Universidad: Extensión é Investigación, para complementar al primero que es la Docencia. La evaluación será teórico – práctica; comprobaciones de lectura, prueba escrita, videoforum, dramatizaciones, ensayos, hojas de trabajo y perfil de investigación',
      credits: 3, }, //creditos correctos, con la peculiaridad que solo en el pensum de sistemas tiene este codigo. en las demas carreras tiene codigo 0 
    { code: '072', 
      name: 'Fisica Basica', 
      description: 'El curso de Física básica es un curso introductorio al estudio de la física para ingeniería, se presenta los inicios de la mecánica clásica, desarrollando clases expositivas en las que se discutirán con ayuda de los estudiantes las teorías existentes, se motivará y se hará participe al estudiante en algunas acciones para disminuir la contaminación y el consumo de papel como una participación en la mejora del ambiente. Se realizarán 3 evaluaciones parciales de 15 puntos cada una, se desarrollarán ejercicios en clase y en casa que tendrán una ponderación de 5 puntos, el laboratorio que se lleva de forma paralela tiene una ponderación de 20 puntos para hacer la zona requerida de 70 puntos. Las clases se desarrollarán los días lunes, miércoles y viernes en el horario y salón especificado en el horario de clases. Las unidades a trabajar son la cinemática, la dinámica, para luego ingresar a las teorías iniciales de energía y su conservación y finalmente llegar al estudio del "momentum" y su conservación.', 
      credits: 5 }, //correcto en todos los pensums
    { code: '178', 
      name: 'Deportes 2', 
      description: 'El curso de Deporte II, es parte fundamental en la continuidad y consolidación para cultivar una buena condición física, base para una buena salud física y mental. Además, tiene como objetivo aprovechar los valores transmitidos por el deporte para el desarrollo del trabajo en equipo, la solidaridad, la tolerancia y el juego limpio. Sus ejes son la educación física, la recreación y deporte, buscando con ello que el aprendizaje sea significativo en cada uno de los educandos. Desarrolla habilidades en el conocimiento de primeros respondientes en casos de emergencia personal y colectiva, así como desastres naturales. Es de destacar que como parte de esta casa de estudios “Universidad de San Carlos, Centro Universitario de Occidente” estamos comprometidos con el cuidado del medio ambiente, por lo que se promoverán actividades que permitan fortalecer el cuidado del medio natural, concibiendo el deporte y el medio ambiente como parte unida, ya que el deportista necesita del medio natural para realizar dicha conciencia social y natural.', 
      credits: 1 }, //correcto en todos los pensums
    { code: '2793', 
      name: 'Idioma Tecnico 2', 
      description: 'Curso el cual no se habilitaba en la division de ciencias de la ingenieria, pero podia ganarse asignandose los cursos y niveles en CALUSAC, ganando los 12 niveles necesarios', 
      credits: 2 }, //este curso solo sistemas y industrial lo tienen
    //Civil
    { code: '121',
      name: 'Tecnica Complementaria 2',
      description: 'Tiene como finalidad desarrollar habilidades manuales y espaciales, bidimensionales y tridimensionales en los estudiantes, las que a su vez coadyuvan en ampliar las destrezas de expresión, interpretación y definición a través del dibujo. El curso lleva al estudiante de Ingeniería al análisis de sistemas constructivos y espacios habitables para proyectarlos de forma gráfica a través del juego de planos. En este proceso el estudiante aprenderá a interpretar la nomenclatura y simbología de los planos de arquitectura, estructuras e instalaciones, lo que será de utilidad para su vida profesional. La forma de evaluación es a través del juego de planos que se elaborará en clase y en casa, los cuales sumarán el 70% del valor del curso (zona) y una evaluación final tendrá el 30% del valor del curso. Se incluirán actividades de motivación para que los estudiantes tomen conciencia sobre la importancia de la reducción de riesgos a desastres y la adaptación al cambio climático',
      credits: 3, },
    //Tercer Semestre
    //Area Comun
    { code: '290',
      name: 'Matematica Intermedia 1',
      description: 'El curso ofrece al estudiante, la oportunidad de formar las competencias en las áreas específicas de la matemática del cálculo integral, gráficas y ecuaciones paramétricas, gráficas y ecuaciones polares, aplicaciones específicas de la integral, algebra matricial álgebra vectorial, rectas, planos y superficies cuádricas en el espacio tridimensional, sucesiones y series infinitas. Es de suma importancia realizar las actividades propuestas con responsabilidad y trabajo autónomo. Conocer la simbología matemática, utilizada en la comunicación de los principios matemáticos, para que pueda utilizarlos en el planteamiento y análisis de problemas físicos, geométricos, económicos, de la realidad física actual, imprescindibles en las aplicaciones de la ingeniería contemporánea como en la gestión integrada de riesgos a desastres y la adaptación al cambio climático. La actividad requiere un compromiso ético al cumplir con el 90% de presencialidad, en donde se transfiere el conocimiento, en las tutorías y se solucionan múltiples ejercicios; para que pueda demostrar por medio de actividades de trabajo autónomo, ejercicios propuestos, desarrollo de proyectos propuestos y resolución de exámenes parciales, las competencias adquiridas.',
      credits: 10,},
    { code: '146',
      name: 'Fisica 1', 
      description: 'El curso de física 1 es continuidad del curso de física básica, extendiendo la idea de conjunto de partículas a cuerpos rígidos, en este se estudia el comportamiento de éstos a diversas situaciones de movimiento. En las clases expositivas se motivará la participación de los estudiantes para generar discusiones sobre las teorías y ejemplos para que los conceptos queden mejor aprendidos; así también se motivará la participación de los estudiantes en el reciclaje y la disminución de materiales de un solo uso, para participar en la disminución de la contaminación del ambiente debido a estos materiales. Los días de clases serán los días lunes, miércoles y viernes en los horarios y salones que se especifican en el horario de clases. Para evaluar el curso se desarrollarán 2 pruebas parciales. Se realizarán actividades como tareas asignadas en Moodle y un Proyecto de Investigación. De manera paralela se desarrollará el laboratorio que tiene una ponderación de 20 puntos para hacer la zona máxima de 70 puntos. Las unidades para trabajar son la Cinemática y dinámica de la rotación, equilibrio de cuerpos rígidos, momentum angular y su conservación, deformación de sólidos, introducción a la mecánica de fluidos, movimientos oscilatorios y ondas y las teorías de gravitación, aunque se hace una revisión de Momentum Lineal. Se incluirán actividades de motivación para que los estudiantes tomen conciencia sobre la importancia de la reducción de riesgos a desastres y la adaptación al cambio climático. ', 
      credits: 6 },
    { code: '2794', 
      name: 'Idioma Tecnico 3', 
      description: 'Curso el cual no se habilitaba en la division de ciencias de la ingenieria, pero podia ganarse asignandose los cursos y niveles en CALUSAC, ganando los 12 niveles necesarios', 
      credits: 2 },
    { code: '217', 
      name: 'Quimica 2', 
      description: 'el curso de Química 2, como continuación de Química 1, trata de incorporar el conocimiento generado en esta área, para estimular el conocimiento científico como pilar del aprendizaje de disciplinas que serán introducidas a lo largo de la carrera en Ingeniería. La química es probablemente la única rama de las ciencias experimentales cuyo objeto de estudio está en permanente expansión, dado que el número de nuevas moléculas, sintetizadas por el hombre crece día a día. El mundo actual y nuestra vida cotidiana están marcados por un sin número de productos de síntesis. Los entes objeto de estudio por parte de la Química, las moléculas, son átomos enlazados entre sí para formar un edificio más complejo y con propiedades completamente distintas de las de sus constituyentes. Parece lógico que una de las primeras inquietudes de los científicos fuera conocer características de esos constituyentes, en un primer intento para entender cómo se unen entre sí para formar nuevos sistemas que van desde la simplicidad de una molécula de hidrógeno a la complejidad de una proteína', 
      credits: 4 },
    { code: '681', 
      name: 'Geografia', 
      description: 'El curso de Geografía introduce al estudiante a conceptualizar la posición de la Tierra en el Universo. Enseña al estudiante a comprender las propiedades de la Tierra. Enseña los sistemas de coordenadas geodésidas y UTM. Enseña el manejo de brújula y enseña a explotar y utilizar mapas cartográficos. Repasa la geografía descriptiva de Guatemala. Enseña al estudiante la conservación de ambiente a través de la identificación de rasgos hidrográficos para prospección de agua', 
      credits: 3 },
    //practica inicial para civil, mecanica, industrial y mecanica industrial
    { code: '2394', 
      name: 'Practica Inicial', 
      description: 'El curso de Prácticas Iniciales, busca dar respuesta a las necesidades académicas de los estudiantes de Ingeniería, en el marco específico de planificación, organización, liderazgo y control, así como la generación de estrategias de proyectos y prácticas, dadas como alternativas en el desarrollo del curso, que permitirán a los estudiantes, adquirir las competencias propuestas. Se motivará para que los estudiantes participen activamente en el desarrollo del curso y sus distintas actividades que estarán relacionadas con las competencias designadas a éste curso. Se generará capacidades entre las habilidades y destrezas del estudiante, de tal manera que pueda desarrollar proyectos en una etapa de perfil. El curso está fundamentado en el Normativo de Practicas de la División; buscando formar estudiantes de ingeniería con capacidad de aplicar conocimientos, habilidades, actitudes y criterios de su especialidad de acuerdo a su nivel académico. Se empezará dando a conocer a los estudiantes que son los anteproyectos, los proyectos y la finalidad de cada uno de ellos así también las partes que lo conforman para poderlos desarrollar. Conocerán los tipos de proyectos existentes y en donde se desarrollan cada uno de ellos. Aprenderán a realizar diferentes tipos de instrumentos para poder diagnosticar, así también se utilizará estudio de casos para aprender a manejar y resolver problemas. Además aprenderá a realizar los diferentes estudios que se dan para realizar un proyecto y conocerán estrategias para poder implementarlos cuando sea el caso. Todo esto a nivel de perfil de proyectos.', 
      credits: 0 }, //Sistemas
    { code: '2797', 
      name: 'Logica de Sistemas', 
      description: 'Su intención es introducir al estudiante en la comprensión del “pensamiento” analizando este como “sub-sistema” básico del “sistema humano”. El estudio del ser humano desde esta perspectiva nos permitirá comprender cómo se forman los pensamientos en nuestra mente, como llegamos a los denominados “modelos mentales” y como estos influyen y determinan nuestro comportamiento. La lógica de sistemas va más allá de la lógica formal que se estudia en los cursos de matemática discreta y para la computación. Esta forma de abordar la lógica nos permitirá distinguir procesos de pensamiento que la lógica formal no aborda, es decir, se abordará no sólo el estudio de los “razonamientos”, sino que el de la memoria, la creatividad, las asociaciones y otros de interés especial a la hora de construir sistemas computacionales, entendidos éstos como modelos que simulan comportamientos humanos para la resolución de problemas', 
      credits: 2 },
    { code: '2795',
      name: 'Matematica de Computo 1',
      description: 'El curso es el acercamiento inicial al estudio de algunos temas de Matemática Discreta. Hoy en día, la Matemática Discreta juega un papel importante en las ciencias de la computación como lo son las áreas de estructura de datos, teoría de lenguajes de computación, análisis de algoritmos, entre otros. Por consiguiente se hace necesario estudiarla y comprender los temas básicos: lógica, conjuntos, algoritmos, relaciones, álgebra de Boole y conteo.',
      credits: 5, },
    { code: '2796',
      name: 'Introduccion a la Programacion y Computacion 1',
      description: 'El curso es el acercamiento inicial del estudiante de la carrera de sistemas, a la programación mediante el uso de disciplinas y metodologías especializadas. El curso se fundamenta en el concepto de algoritmo para la resolución de problemas de programación, enfatizando el uso del paradigma orientado a objetos. Se introducen conceptos básicos de UML como guía para el diseño de sistemas orientados a objetos. Se acerca al estudiante al conocimiento de los principales algoritmos de búsquedas y ordenamientos. Se cubre una parte importante de las estructuras de datos, los tipos de datos abstractos. Asimismo, el estudiante conocerá el lenguaje Java como el lenguaje oficial de programación del curso.',
      credits: 4, },
    { //curso para mecanica, industrial y mecanica industrial en 3er semestre y en sistemas en 5to semestre, civil no lo lleva
      code: '077', name: 'Filosofia de la Ciencia',
      description: 'La formación del profesional de las ciencias de la ingeniería requiere de una preparación integral por lo que se hace necesario proveer al estudiante de una serie de elementos teóricos y metodológicos que nos proporciona la Ciencia; éstos elementos son fundamentales y necesarios para que pueda aplicarlos al conocimiento de la realidad, contribuir al proceso de elaboración de la ciencia, ya que es una herramienta fundamental e ineludible para contribuir con el mejoramiento de las condiciones del hombre y de la sociedad.',
      credits: 3, },
    { code: '085', name: 'Logica', 
      description: 'La formación del profesional de las ciencias de la ingeniería requiere de una preparación integral por lo que se hace necesario proveer al estudiante de una serie de elementos teóricos y metodológicos que nos proporciona la Ciencia; éstos elementos son fundamentales y necesarios para que pueda aplicarlos al conocimiento de la realidad, contribuir al proceso de elaboración de la ciencia, ya que es una herramienta fundamental e ineludible para coadyuvar con el mejoramiento de las condiciones del hombre y de la sociedad. En el caso de los temas de GIRD y ACC, se realiza alusión a dichos temas en los contenidos generales, cuando se habla sobre la estructura las formas de expresión, por cuanto para transmitir los mensajes estos deben adaptarse a las diferentes formas de comunicar los mensajes', 
      credits: 2 },
    //Cuarto Semestre
    //Area Comun
    { code: '291', name: 'Matematica Intermedia 2',
      description: 'Curso dedicado al estudio de los conceptos fundamentales del cálculo diferencial è integral de funciones de varias variables, estudiándolas desde el punto de vista verbal, numérico, visual y algebraico. Es importante mencionar que este curso se orientara haciendo referencia al contexto regional, nacional, è internacional. Durante el desarrollo del curso, los participantes construirán conjuntamente con el docente, los principales conceptos del cálculo de varias variables. La orientación de los cursos se hará de tal forma que los estudiantes leerán previamente los contenidos y harán anotaciones para poder discutirlos en clase, se tratara por todos los medios que la participación de los mismos sean la más alta posible, para poder inculcar en cada uno un pensamiento más crítico. Bajo esta metodología el objetivo principal es que el estudiante trate que por sí mismos descubran los conceptos y sus interrelaciones para poder tener una visión más clara del curso y sus posibles aplicaciones.',
      credits: 5, },
    { code: '292',name: 'Matematica Intermedia 3',
      description: 'Curso dedicado al estudio de los conceptos fundamentales de las ecuaciones diferenciales, estudiándolas desde el punto de vista verbal, numérico, visual y algebraico. Es importante mencionar que este curso se orientara haciendo referencia al contexto regional, nacional, è internacional. El curso inicia con una descripción del vocabulario básico empleado en ecuaciones diferenciales y en la solución de ecuaciones diferenciales, luego se trata el tema de modelado, empleando como ejemplo una investigación sencilla de un modelo. El estudio de las ecuaciones diferenciales de orden superior, así como su aplicación a diversos problemas de la vida real, principalmente en la parte de resortes y deformación de vigas, temas importantes para la formación de los ingenieros mecánicos y civiles.',
      credits: 5, },
    { code: '147', name: 'Fisica 2', 
      description: 'Física 2 introduce a los estudiantes a las teorías del electromagnetismo, estudiando a nivel atómico los movimientos de partículas cargadas y su interacción en medios eléctricos, teorías que son necesarias para la comprensión de cursos posteriores como Ingeniería Eléctrica. La metodología de las clases expositivas es incentivar y motivar al estudiante a contextualizar las teorías en clase y aplicarlas a experimentos comprobables en el laboratorio y en el mismo curso para poder discutir su veracidad y las aplicaciones que pueden tener.  Las unidades a trabajar son la de Campo eléctrico, Ley de Gauss, Potencial eléctrico, capacitancia y capacitores, circuitos de corriente continua y finalizar con el tema de Campos magnéticos y partículas con carga en campos magnéticos', 
      credits: 6 },
    { code: '109', name: 'Mecanica Analitica 1', 
      description: 'Es esta asignatura el inicio de la transicion de ciencias basicas al area profesional. Es obligatoria para la mayor parte de ingeniarias, tales como: civil. Industrial, mecanica y mecanica – industrial. Se estudia el analisis de la estatica de sumatoria de fuerzas igual cero, con la busqueda de sistemas en equilibrio, donde la particularidad de la segunda ley de Newton trabaja con aceleracion igual a cero. Se necesita de fuerzas coplanarias expresadas como vectores lineales, de donde es necesario el analisis vectorial aplicando la geometria clasica o euclidiana. El proposito es la discusion de los sistemas de particulas y armaduras en equilibrio. Sin embargo, es un buen punto de inicio de las prácticas de la ingeniería en general, donde es pertinente el contexto, tal como los sistemas de medidas. Guatemala y el uso a un tiempo del Sistema Internacional de medidas, que es lo oficial en medición; pero al mismo tiempo el sisetma inglés predomina en las medidas y calibres de los materiales de construccion y se adiciona sistema español, herencia del colonialismo y que aun es importante en las medidas agrarias. La multidisciplina, transdisciplina e interdisciplina comienzan a tomar peponderancia en el oficio de ingeniero', 
      credits: 5 },
    { code: '680', name: 'Legislacion 1', 
      description: 'El propósito del curso de Legislación I es brindar un conocimiento crítico del Derecho a partir de la interdisciplinariedad, de la unión de la teoría y la práctica, así como el análisis y la aplicación de la Legislación referente a las Ciencias de la Ingeniería, que le permitirán al futuro ingeniero resolver problemas en sus labores u otras actividades profesionales , contando para ello con elementos que faciliten la consulta legal y bibliográfica, así como la facilidad de exposición y resolución de casos y procedimientos específicos en el desempeño de su función como profesional universitario y gerente en la administración técnica.', 
      credits: 3 },
    { code: '949', name: 'Estadistica 1', 
      description: 'El curso de Estadística 1 tiene como pre-requisito Matemática Intermedia 1, es fundamental que el estudiante tenga conocimiento previo de Matemática ya que en el curso se utiliza mucho los conceptos de fórmulas y su uso adecuado. Introduce al conocimiento y manejo de la teoría estadística descriptiva y de la teoría de las probabilidades aplicada a la ingeniería. El propósito del curso es, equipar al futuro profesional con herramientas que descubran el significado y las relaciones de los números y las variables que los originan -mediante su resumen- de forma más sencilla y simple, para la toma de decisiones en el campo laboral. La estadística es una disciplina que apoya el proceso de la toma de decisiones en diversas áreas del conocimiento utilizando herramientas de inferencia, las que para una profunda comprensión necesitan de los conceptos probabilísticos, por lo cual este curso está enfocado a establecer los conceptos básicos de estadística descriptiva y probabilidad como pilares de la inferencia', 
      credits: 5 },
    { code: '930', name: 'Geologia', 
      description: 'Geologia capacita al estudiante a conocer la estructura de la Tierra y los efectos de la Tectonica de placas y lo capacita para identificación de rocas', 
      credits: 3 },
    { code: '746', name: 'Topografia 1', 
      description: 'El Curso de Topografía, es una de las ramas de la Ingeniería que permite conocer todas las características de una faja de tierra, para lo cual toma las tres variables de espacio, las cueles son: Distancia, altura y dirección. El conocimiento de esta ciencia de la Ingeniería se divide en 3 partes fundamentales: En la primera se estudian los principios introductorios y conceptos básicos relacionados con la topografía. En la segunda, se trata el uso de la cinta métrica, el teodolito y las diferentes formas de expresar y medir ángulos y direcciones. La tercera parte, cubre el tema de agrimensura y la medición de terrenos por diferentes métodos de levantamiento y los cálculos de gabinete necesarios para la obtención del área y plano de terrenos, así como aspectos legales relativos a la topografía', 
      credits: 6 },
    { code: '927', name: 'Introduccion a la Ingenieria Petrolera',
      description: 'Curso introductorio a la ingenieria enfocada ene la industria del petroleo',
      credits: 3, },
    { code: '2801', name: 'Idioma Tecnico 4', 
      description: 'Curso el cual no se habilitaba en la division de ciencias de la ingenieria, pero podia ganarse asignandose los cursos y niveles en CALUSAC, ganando los 12 niveles necesarios', 
      credits: 2 },
    //Civil
    { //TODO: REVISAR, NO TIENE CODIGO PERO SE USO EL A PROVISIONALMENTE
      code: 'A', name: 'Introduccion a Proyectos Gerenciales', description: 'Curso introductorio a la gestion de proyectos en la carrera',
      credits: 6,}, 
    { code: '925', name: 'Psicologia Industrial', 
      description: 'La actividad laboral presenta una serie de interacciones, donde se pone de manifiesto el comportamiento humano, tanto individual como grupal, generando ciertas y determinadas dinámicas individuales y colectivas que es necesario investigar y aplicar elementos teóricos para su análisis y comprensión lo que establece la necesidad de desarrollar temas relacionados a la Psicología. Esta disciplina tiene como objetivo fundamental, proporcionar al estudiante, los elementos teóricos, metodológicos y técnicos indispensables sobre la Psicología Industrial, a la vez que se propone efectuar una práctica al interior del mismo, para poder aplicar los conocimientos al que hacer del futuro profesional de la ingeniería', 
      credits: 3 },
    //Sistemas
    { code: '2798', name: 'Lenguajes Formales y de Programacion',
      description: 'Este curso busca introducir al estudiante con los fundamentos teóricos matemáticos y conceptos que fundamentan los lenguajes de programación. El estudiante debe adquirir la base teórica necesaria y requerida para que pueda llevar un curso avanzado de lenguajes y compiladores. Se busca, además, definir los modelos matemáticos asociados a la representación de los diferentes tipos de lenguajes para luego implementar estos conceptos en lenguajes de programación. Es de primordial importancia que pueda reconocer cualquier tipo de gramática, pero, sobre todo, pueda manejar y diseñar gramáticas para lenguajes regulares y para lenguajes libres de contexto, además de los modelos matemáticos que las resuelven.',
      credits: 3,},
    { code: '2799', name: 'Matematica de Computo 2',
      description: 'Desarrolle, reconozca, formule y aplique conceptos relaciones de recurrencia, grafos, árboles y redes que sirvan de base para los cursos profesionales de la Escuela de Ciencias y Sistemas relacionados con las estructuras dinámicas utilizadas en el manejo eficiente de memoria primaria y secundaria',
      credits: 5,},
    { code: '2800', name: 'Introduccion a la Programacion y Computacion 2',
      description: 'Los sistemas de software existen para automatizar y acelerar tareas, y la mayoría de veces también se necesita manipular, modificar y almacenar datos para extraer información. Eso quiere decir que un software puede ser igual de complejo como las tareas que se desean realizar. El modelado de sistemas de software utilizando conceptos de la programación orientada a objetos y el uso de diagramas que representan el diseño de las diferentes piezas de software que forman un sistema mas grande es la mejor manera de ordenar las ideas antes de iniciar un proceso de desarrollo de software complejo. Además, el disponer de una variedad de metodologías de desarrollo de software dan a los equipos de desarrollo de software los pasos necesarios para desarrollar software dependiendo del contexto en el que el software será desarrollado',
      credits: 5,},
    //Quinto Semestre
    //Area Comun
    { code: '673', name: 'Matematica Aplicada 1', 
      description: 'Tiene pre-requisito matemática intermedia 2 y matemática intermedia 3, por lo que es fundamental que el estudian cuente con conocimientos previos de derivadas e integrales, ecuaciones diferenciales entre otros. El curso de Matemática aplicada 1, ésta vinculada a la resolución de ecuaciones diferenciales, con la finalidad de crear criterios para la comprensión y explicación de las otras ciencias que ayudan o afectan a la ingeniería. Ésta a la vez pretende que los estudiantes comprendan los diferentes métodos para poder desarrollar ecuaciones diferenciales usando serie de potencia como también usando la transformada de Laplace. Asimismo, el estudiante justifica sus investigaciones socializándolas, las explicara para exponer posibles soluciones que aqueja al planeta en los últimos años. Entre otras actividades se resolverán hojas de trabajo individual y grupal, comprobaciones de lectura, preguntas indagatorias con metodología acorde a los temas bibliográficos, que incluye exposiciones de análisis, y explicaciones de las diferentes teorías debidamente contextualizadas. En relación a la evaluación el curso de Matemática aplicada 1 se tendrá una zona de 70 puntos que se distribuirán dos parciales de 15 y 20 puntos, hojas de trabajo, exposición y una actividad extra-aula para contribuir al medio ambiente y aminorar la contaminación, y la evaluación de 30 puntos escrita consta de ejercicios contextualizados para su mayor compresión y análisis.', 
      credits: 6 },
    { code: '674', name: 'Matematica Aplicada 3', 
      description: 'El curso de matemática aplicada 3, sección A, tiene pre-requisito matemática intermedia 2 y matemática intermedia 3, el estudiante debe de tener conocimiento básico de despeje de fórmulas ya que en la Matemática aplicada 3 se usan fórmulas para poder resolver las diferentes ecuaciones no lineales y los problemas o casos de ingeniería. El curso de Matemática aplicada 3, ésta vinculada a la resolución de ecuaciones no lineales, con la finalidad de crear criterios para la comprensión y explicación de las otras ciencias que ayudan o afectan a la ingeniería. Ésta a la vez pretende que los estudiantes comprendan los diferentes métodos para poder desarrollar ecuaciones no lineales usando métodos numéricos como primer punto poder clasificar si son métodos abiertos o cerrados si son de una o más variables y así poder resolver casos o problemas de la ingeniería en todas sus ramas. Así mismo, el estudiante justifica sus investigaciones socializándolas, las explicara para exponer posibles soluciones que aqueja al planeta en los últimos años. Entre otras actividades se resolverán hojas de trabajo individual y grupal, comprobaciones de lectura, preguntas indagatorias con metodología acorde a los temas bibliográficos, que incluye exposiciones de análisis, y explicaciones de las diferentes teorías debidamente contextualizadas. En relación a la evaluación el curso de Matemática aplicada 3 se tendrá una zona de 70 puntos que se distribuirán dos parciales de 20 puntos cada uno, hojas de trabajo, trabajos de investigación y exposición de los trabajaos de investigación en forma grupal y una evaluación final de 30 puntos en forma escrita.', 
      credits: 5 },
    { code: '148', name: 'Fisica 3', 
      description: 'Abarca temas avanzados de física clásica y electromagnetismo. El curso incluye el estudio de la carga eléctrica, el campo eléctrico, el potencial eléctrico y los condensadores. También se exploran los circuitos de corriente continua, el campo magnético, la fuerza magnética sobre una carga y un conductor con corriente, y las leyes de Ampere y de Biot-Savart. Además, se complementan conceptos de ondas sonoras, ondas electromagnéticas, óptica geométrica, óptica física y termodinámica. Este curso proporciona a los estudiantes una comprensión profunda de los principios físicos que son fundamentales para el análisis y diseño de sistemas en ingeniería', 
      credits: 6 
    },
    { code: '694', name: 'Contabilidad 1',
      description: 'Curso que estudia los principios de la contabilidad general aplicable a todo tipo de empresa comercial, industrial o de servicio. servicio. Sirve de base para estudiar posteriormente Contabilidad 2 (Contabilidad de costos) y posteriormente Contabilidad 3 (Análisis financieros). Así también podrá quien haya estudiado éste curso, leer y comprender los estados de resultados de cualquier empresa.', 
      credits: 3 },
    { code: '094', name: 'Ecologia', 
      description: 'Se proporcionará un concepto básico de ecología que describe a los seres vivos y no vivos y la relación que existe entre ellos. Introducción de los cuatro conceptos principales empleados: energía, ciclos, poblaciones y ecosistemas. Conceptos sobre los sistemas y poblaciones ecológicas. La relación del hombre con el medio ambiente, principalmente su intervención en los ecosistemas para formar o desarrollar poblaciones y comunidades humanas, concientizando en la forma adecuada para no intervenir drásticamente en las sucesiones ecológicas', 
      credits: 3 },
    { code: '087', name: 'Programacion de Computadoras 1',
      description: 'El curso es el acercamiento inicial del estudiante de la carrera de Ingeniería Industrial, a la programación mediante el uso de disciplinas y metodologías especializadas. El curso se fundamenta en el concepto de algoritmo para la resolución de problemas de programación, enfatizando el uso del paradigma programación estructurada. Se introducen conceptos básicos del Lenguaje de Programación C++ como guía para el diseño de sistemas estructurados. Se acerca al estudiante al conocimiento de los principales algoritmos de estructuras secuenciales, condicionales y repetitivas. Se cubre una parte importante de las estructuras de datos, los tipos de datos básicos. Asimismo, el estudiante conocerá el lenguaje C++ como el lenguaje oficial de programación del curso',
      credits: 3, },
    { code: '764', name: 'Legislacion 2', 
      description: 'El propósito del curso Legislación II es promover un proceso de enseñanza-aprendizaje crítico, por el cual los estudiantes mejoren su conocimiento en las normas jurídicas y doctrinas que se aplican dentro del campo del derecho comercial y mercantil, así como la existencia y el uso de los documentos que el derecho guatemalteco designa como Títulos de Crédito, que le permitirán al futuro ingeniero como gerente en la administración técnica y en el desarrollo de su vida profesional involucrarse en la globalización del tráfico mercantil y bursátil. En el curso se aplicará la investigación, el análisis, la exposición y discusión de los diferentes temas del mismo', 
      credits: 3 },
    {
      code: '928',
      name: 'Administracion de Personal',
      description: 'La actividad laboral presenta una serie de interacciones, donde se pone de manifiesto el comportamiento humano individual y grupal, generando ciertas y determinadas dinámicas individuales y colectivas que es necesario investigar aplicando elementos teóricos para su análisis y su comprensión, lo que establece la necesidad de desarrollar temas relacionados a la Administración de Personal. Esta disciplina tiene como objetivo fundamental, proporcionar al estudiante, los elementos teóricos, metodológicos y técnicos indispensables sobre la Administración de Recursos Humanos en las organizaciones, a la vez que se propone efectuar una práctica al interior del curso, para poder aplicar los conocimientos al que hacer del futuro profesional de la ingeniería ',
      credits: 3,
    },
    { code: '926', name: 'Geologia del Petroleo', 
      description: 'Un curso de Geología del Petróleo en la carrera de ingeniería civil se centra en el estudio de los procesos geológicos que llevan a la formación y acumulación de hidrocarburos. El curso comienza con una introducción a los fundamentos geológicos de los depósitos de hidrocarburos, seguido por la caracterización geológica de estos depósitos. Se exploran los métodos de prospección geofísica y geoquímica utilizados para identificar y evaluar yacimientos petroleros. Además, se estudian los sistemas petroleros, incluyendo la generación, migración y atrapamiento de hidrocarburos. El curso también aborda las técnicas de exploración y perforación, así como la evaluación de reservas y la gestión de yacimientos. A lo largo del curso, se utilizan casos prácticos y estudios de campo para proporcionar una comprensión aplicada de los conceptos teóricos. Este curso proporciona a los estudiantes las habilidades necesarias para trabajar en la exploración y producción de petróleo, contribuyendo al desarrollo eficiente y sostenible del sector energético', 
      credits: 3 },
    //Civil
    { code: '747', name: 'Topografia 2', 
      description: 'El Curso de Topografía 2 da seguimiento a los conocimientos adquiridos en topografía 1, permite terminar de conocer todas las características de una faja de tierra, para lo cual toma las tres variables de espacio, las cueles son: Distancia, altura y dirección. Este curso se divide en 3 partes fundamentales: En la primera parte se estudian los instrumentos necesarios para poder llevar a cabo un levantamiento de altimetría y luego se ven los diferentes métodos de levantamiento. En la segunda, se trata la parte de movimientos de tierra. La tercera parte, cubre el tema de agrimensura y la medición y partición de terrenos, así como aspectos legales relativos a la topografía. Algunos contenidos del curso tienen una relación directa con la Gestión Integral de Riesgos GIRD, dado a que la topografía es el primer trabajo que que realiza en una obra de Ingeniería, y esto permite identificar zonas de riesgo, (habitabilidad, zonas de inundación, deslaves, asentamientos humanos, etc.).', 
      credits: 6 },
    {
      code: '672', name: 'Resistencia de Materiales 1',
      description: 'La mecánica de materiales se enfoca principalmente en determinar y describir el comportamiento de cuerpos a las cargas, que pueden ser elementos estructurales o partes de mecanismos. Es importante identificar los diferentes esfuerzos que pueden existir, la deformación relacionada a estos esfuerzos y las aplicaciones para el diseño correcto para los esfuerzos permisibles, esto sentara las bases para el análisis y diseño de elementos estructurales y para el diseño mecánico de partes y sistemas. Además, que adquiera las competencias para conocer los materiales no solo desde el punto de vista de la mecánica de los materiales, sino que también pueda conocer los componentes de los mismos y cómo estos puedan afectar el entorno desde el punto de vista ambiental, estos conocimientos brindan al estudiante la capacidad de poder identificar los riesgos que se pueden presentar en estructuras o maquinarias derivado del mal manejo y uso de los materiales, de tal manera que al diseñar tome la consciencia de la utilización de estos y poder lograr un equilibrio entre la utilización de los materiales, el medio ambiente y la seguridad de los usuarios',
      credits: 5,  },
    { code: '2669',  name: 'Principios de Metrologia',
      description: 'La metrología estudia los sistemas de pesos y medidas. La metrología es la disciplina científica dedicada al análisis de los sistemas de medidas y pesos. Su objeto de estudio son las mediciones de magnitudes, impulsando la trazabilidad para favorecer la normalización.',
      credits: 3,  }, //TODO: REVISAR, NO TIENE CODIGO
    { code: '2806',  name: 'Principios De Metrologia',
      description: 'La metrología estudia los sistemas de pesos y medidas. La metrología es la disciplina científica dedicada al análisis de los sistemas de medidas y pesos. Su objeto de estudio son las mediciones de magnitudes, impulsando la trazabilidad para favorecer la normalización.',
      credits: 3,  }, //ESTE ES PA SISTEMAS
    {
      code: '678', name: 'Ciencias de los Materiales',
      description: 'La ciencia de materiales es la disciplina científica encargada de investigar la relación entre la estructura y las propiedades de los materiales.',
      credits: 5, },
    { code: '671', name: 'Mecanica de Fluidos', 
      description: 'El curso proporciona al estudiante una visión general sobre las propiedades de los fluidos, su comportamiento, las leyes que los gobiernan y los métodos y procedimientos empleados en el estudio y análisis. Se trata tanto la estática de fluidos o hidrostática como la dinámica de fluido, además de introducir a los estudiantes a aplicación de los temas a futuros cursos en cada una de las áreas de la ingeniería en la que se desempeñara, así como al modelado y estudio de amenazas naturales para la aplicación en Gestión Integral de Riesgo de Desastres (GIRD) y la adaptación resiliente al cambio climático (ACC).', 
      credits: 6 },
    { code: '1060', name: 'Geologia Estructural', 
      description: 'La geología estructural es una rama de la geología que se dedica al estudio de las estructuras de las rocas y los procesos geológicos que las forman. Se centra en la interpretación de plegamientos, fallas y otras deformaciones para comprender la historia tectónica de un área y su relación con los recursos naturales', 
      credits: 5 },
    { code: '920', name: 'Geofisica', 
      description: 'La geofísica es una rama de la geología que se centra en el estudio de las propiedades físicas de la Tierra y los procesos que ocurren en su interior y superficie.', 
      credits: 4 },
    { code: '1068', name: 'Petrologia', 
      description: 'Un curso de petrología en la carrera de ingeniería civil abarca el estudio de las rocas y minerales, su formación, clasificación y propiedades. Se inicia con una introducción a la petrología y su importancia en la ingeniería civil, seguido por la mineralogía, donde se analizan las propiedades físicas y químicas de los minerales. Se estudian las rocas ígneas, sedimentarias y metamórficas, incluyendo sus procesos de formación y aplicaciones en la construcción. Además, se enseñan técnicas de análisis de rocas y minerales, utilizando herramientas como microscopios. El curso también aborda el uso de diferentes tipos de rocas en infraestructuras civiles, evaluando su idoneidad para proyectos específicos. Finalmente, se presentan estudios de caso de proyectos reales donde la petrología ha sido crucial en la toma de decisiones de ingeniería. Este curso proporciona una base sólida para entender cómo las propiedades de las rocas y minerales afectan la durabilidad y estabilidad de las estructuras civiles.', 
      credits: 4 },
    {
      code: '792',
      name: 'Perforacion de Pozos 1',
      description: 'Un curso de Perforación de Pozos 1 en la carrera de ingeniería civil abarca el estudio de los métodos y tecnologías utilizados en la perforación de pozos profundos, esenciales para el abastecimiento de agua y otros recursos. El curso comienza con una introducción a las generalidades geohidrológicas y la clasificación de las aguas subterráneas, seguido por la identificación y localización de acuíferos. Se exploran las técnicas de perforación, incluyendo perforaciones exploratorias y muestreo, así como el diseño y desarrollo de pozos. También se abordan los perfiles de un pozo, el diseño y selección de equipamiento de bombeo, y la legislación aplicable. A lo largo del curso, se utilizan métodos de enseñanza como exposiciones orales y audiovisuales, lecturas obligatorias, trabajos de investigación, ejercicios prácticos y visitas guiadas de campo. Este curso proporciona a los estudiantes las habilidades necesarias para diseñar y calcular proyectos de perforación de pozos, asegurando su correcta administración, operación y mantenimiento',
      credits: 5,
    },
    //Mecanica
    {
      code: '068',
      name: 'Dibujo Tecnico Mecanico',
      description: 'El curso explica las técnicas y métodos gráficos, así como las diferentes simbologías y nomenclaturas que intervienen en diseño y fabricación de los diferentes tipos de elementos mecánicos utilizando programas de computación de diseño con la finalidad de que el alumno pueda aplicarlos en la solución de los problemas desde el punto de vista de su profesión.',
      credits: 3,
    },
    {
      code: '2571',
      name: 'Electricidad y Electronica Basica',
      description: 'abarca los principios fundamentales de la electricidad y la electrónica, esenciales para el diseño y análisis de sistemas eléctricos y electrónicos. El curso comienza con una introducción a los conceptos básicos de electricidad, incluyendo voltaje, corriente y resistencia, y cómo se relacionan a través de la Ley de Ohm. Se estudian los componentes eléctricos y electrónicos, como resistencias, capacitores, inductores, diodos y transistores, así como su funcionamiento y aplicaciones. Además, se exploran los circuitos eléctricos y electrónicos, tanto en corriente continua (DC) como en corriente alterna (AC), y se enseñan técnicas de análisis de circuitos. El curso también incluye prácticas de laboratorio donde los estudiantes aprenden a construir y probar circuitos, utilizando herramientas como multímetros y osciloscopios. Este curso proporciona una base sólida para entender y aplicar los principios de la electricidad y la electrónica en el diseño y mantenimiento de sistemas mecánicos y electromecánicos',
      credits: 5,
    },
    { code: '118', name: 'Mecanica Analitica 2', 
      description: 'Es un curso del área de ciencias básicas y complementarias, el cual trata del análisis de las condiciones de la estática de partículas y cuerpos rígidos, el análisis de su cinética de movimiento, y, finalmente, la introducción a la teoría de las vibraciones. A lo largo del desarrollo del mismo, se auxilia de otras ciencias y cursos preliminares, entre ellas destacan: matemáticas básicas y aplicadas, física, mecánica y análisis estructural. El punto de partida del curso, es el estudio de la geometría del movimiento de partículas, relacionando el desplazamiento, velocidad, aceleración y tiempo (cinemática de partículas), se estudian los temas de las causas del movimiento (la cinética de partículas); el estudio del movimiento luego se traslada al análisis y formas del comportamiento de los cuerpos rígidos, tanto en su geometría como en sus causas (cinemática y cinética de cuerpos rígidos); finalmente se tratan temas introductorios de estudio de movimiento vibratorio y a la dinámica estructural.', 
      credits: 5 },
    //Sistemas
    {
      code: '2802',
      name: 'Analisis Probabilistico',
      description: 'En los años recientes el análisis estadístico, los procesos estocásticos y la aplicación de la teoría de probabilidades a la confiabilidad y a la toma de decisiones han adquirido trascendencia en los campos de la Ingeniería y las ciencias sociales, por lo que su conocimiento es indispensable para el personal de dichas disciplinas. Este curso tiene como propósitos fundamentales: ofrecer una introducción a los conceptos de Inferencia Estadística, Modelos Lineales, Procesos Estocásticos y Confiabilidad, mostrando las aplicaciones en el campo de la ingeniería. Su finalidad es preparar al estudiante para que con confianza resuelva problemas que requieren el empleo de las leyes de probabilidad y los procesos estocásticos, así como para que efectúen análisis estadístico y modelen matemáticamente situaciones de incertidumbre.',
      credits: 4,
    },
    {
      code: '2803',
      name: 'Organizacion de Lenguajes y Compiladores 1',
      description: 'Este curso estudia los principios básicos de un compilador y / o intérprete, partiendo de la estructura interna del proceso de compilación, y describiendo las fases de este proceso. Se tratan en detalle las primeras fases del proceso: análisis lexicográfico, análisis sintáctico y traducción dirigida por la sintaxis. Para poner en práctica los conceptos aprendidos se realizan varias tareas y proyectos prácticos.',
      credits: 4,
    },
    {
      code: '2804',
      name: 'Organizacion Computacional',
      description: 'Llevar a la práctica los conocimientos aprendidos en clase en lo que respecta a la lógica combinacional y secuencial de la electrónica digital, para que puedan lograr comprender la estructura interna de las computadoras, desde el punto de vista más básico, que permiten realizar tareas sencillas que sumándolas una a una realizan procesos complejos como los que actualmente conocemos. ',
      credits: 3,
    },
    { code: '2805', name: 'Estructura de Datos', 
      description: 'Estudia sobre varias técnicas de representación de los datos en la memoria de una computadora y los algoritmos que los manipulan. Se enfatiza en las características de una buena programación: modularidad, ocultamiento de información, reutilización de código y estilo de programación', 
      credits: 5 },
    { code: '2807', name: 'Practica Inicial TI', 
      description: 'Los talleres correspondientes a la carrera de Ingeniería en Ciencias y Sistemas, se enfocan básicamente en elconocimiento práctico que adquiere el estudiante acerca de los diferentes elementos de hardware y software necesarios para coadyuvar al desarrollo de su futura vida profesional, facilitando la comprensión y el aprendizaje de los cursos en la etapa intermedia y avanzada de su carrera', 
      credits: 0 },

    //Sexto Semestre
    //Area Comun
    { code: '904', name: 'Matematica Aplicada 2', 
      description: 'Durante el curso, los estudiantes profundizarán en temas como el cálculo integral, las series y sucesiones, la geometría analítica, y las ecuaciones diferenciales ordinarias. El énfasis estará en la comprensión y aplicación de estos conceptos en situaciones prácticas, permitiendo a los estudiantes adquirir habilidades críticas en el análisis y modelación de problemas reales. El curso incorporará el uso de software especializado y métodos computacionales para la resolución de problemas matemáticos complejos, preparando a los estudiantes para los desafíos técnicos en sus futuras carreras profesionales. A través de ejercicios prácticos y proyectos, los estudiantes aprenderán a aplicar las matemáticas en el diseño y análisis de sistemas de ingeniería, mejorando su capacidad para tomar decisiones informadas basadas en datos cuantitativos.', 
      credits: 6 },
    { code: '905', name: 'Matematica Aplicada 4', 
      description: 'El curso de Matemática Aplicada 4 es una parte integral del plan de estudios para las carreras de Ciencias de la Ingeniería. Este curso tiene como objetivo proporcionar a los estudiantes una comprensión profunda y práctica de técnicas matemáticas avanzadas que son esenciales para la resolución de problemas en diversas disciplinas de la ingeniería. A lo largo del curso, los estudiantes explorarán temas avanzados de cálculo, ecuaciones diferenciales, álgebra lineal, y análisis numérico. Se hará hincapié en la aplicación de estos conceptos matemáticos en la modelación y solución de problemas de ingeniería, permitiendo a los estudiantes desarrollar habilidades analíticas y críticas necesarias en su futura carrera profesional.', 
      credits: 4 },
    {
      code: '670',
      name: 'Ingenieria Electrica 1',
      description: 'Es un curso de introducción a la ingeniería eléctrica, se fundamenta en el estudio de los circuitos eléctricos en corriente continua y corriente alterna, generadores, transformadores y motores eléctricos que son utilizados en las equipos e instalaciones domiciliares y con mayor aplicación en la industria.',
      credits: 5,
    },
    {
      code: '676',
      name: 'Ingenieria Electrica 2',
      description: 'El curso Ingeniería Eléctrica 2 está dirigido a los estudiantes de todas las carreras de Ingeniería que se imparten en la Universidad de San Carlos de Guatemala, excepto para los estudiantes de Ingeniería Eléctrica, Ingeniería Electrónica e Ingeniería Mecánica Eléctrica. Durante el curso se desarrollaran estudios de temas relacionados con instalaciones eléctricas residenciales e industriales. Al finalizar el curso el estudiante estará en la posibilidad de realizar cálculos de conductores eléctricos y selección de ductos eléctricos, así mismo de desarrollar un diseño de iluminación. Los temas que se desarrollan a lo largo del curso le brindan al estudiante una valiosa herramienta en su vida profesional como Ingeniero ya que con ello podrá realizar trabajos de calidad y confiabilidad. ',
      credits: 5,
    },
    { code: '150', name: 'Fisica 4', 
      description: 'dedicado a profundizar en los principios y aplicaciones de la física en el ámbito de la ingeniería. Este curso abarca temas complejos y avanzados que son esenciales para entender y solucionar problemas en diversas disciplinas de la ingeniería. A lo largo del curso, los estudiantes explorarán temas como la termodinámica, la óptica, la teoría electromagnética, y la física moderna. Se hará hincapié en la aplicación práctica de estos conceptos a través de experimentos de laboratorio y proyectos, permitiendo a los estudiantes desarrollar habilidades analíticas y experimentales necesarias en su futura carrera profesional. El curso incluirá el estudio de la transferencia de calor, los principios de la mecánica cuántica, la teoría de circuitos eléctricos, y las ondas electromagnéticas. Los estudiantes aprenderán a utilizar herramientas y técnicas avanzadas para analizar y resolver problemas físicos complejos, y a aplicar estos conocimientos en el diseño y mejora de sistemas y dispositivos tecnológicos.', 
      credits: 6 },
      //codigo inventado pq no tiene
    { code: '1234', name: 'Estadistica 3', 
      description: 'Durante el curso, los estudiantes explorarán temas como la inferencia estadística, el análisis de regresión, las pruebas de hipótesis, y el diseño de experimentos. Se hará hincapié en la aplicación de estas técnicas en la solución de problemas ingenieriles y en la interpretación de resultados estadísticos en un contexto práctico. El curso también abordará el uso de software estadístico y herramientas computacionales para la manipulación y análisis de grandes conjuntos de datos, permitiendo a los estudiantes desarrollar habilidades técnicas en el manejo de datos y en la generación de informes estadísticos detallados. A lo largo del curso, los estudiantes participarán en proyectos prácticos y estudios de casos que les permitirán aplicar los conceptos teóricos en situaciones reales, mejorando su capacidad para diseñar y ejecutar experimentos, así como para analizar e interpretar datos relevantes para sus campos de especialización.',
      credits: 5 },
    { code: '779', name: 'Contabilidad 2', 
      description: 'La necesidad de ser más competitivos en un mundo globalizado, lleva a las empresas a implementar sistemas de control de su sistema operativo. En el caso de las empresas manufactureras o de transformación llamadas industriales, el control de los recursos es de vital importancia, ya que la fábrica utiliza la mayor parte de dichos recursos, por lo tanto, el director de la planta, el Ingeniero Industrial, debe hacer uso de herramientas de control que le ayuden a reconocer la realidad de las operaciones y generar sistemas de información que le ayuden a tomar mejores decisiones en el uso adecuado de los recursos. El curso de Contabilidad 2 dará al estudiante de Ingeniería Industrial, las herramientas de control de costo de producción, tomando como base los conceptos de la Contabilidad General, los conocimientos de Administración de Personal, Legislación laboral y sobre sistemas de producción', 
      credits: 3 },
    { code: '2670', name: 'Gestion de Desastres', 
      description: 'El curso explica la relación que existe entre los Desastres tanto naturales como tecnológicos y socio-políticos, con el Medio Ambiente y el Desarrollo Económico-Social. Los Desastres deben considerarse como un problema de “Desarrollo Económico”, tienen una relación directa con la explosión demográfica, la concentración de población en centros urbanos, ocupación de áreas inadecuadas para vivienda, pero principalmente por consecuencia de falta de una planificación adecuada para el desarrollo. La gestión de riesgo consiste en un conjunto de acciones integradas y sistemáticas para lograr identificar, localizar, eliminar o atenuar las condiciones causantes de los desastres antes de que estos ocurran y la consecuente recuperación si estos se producen.', 
      credits: 3 },
    {
      code: '794',
      name: 'Programacion de Computadoras 2',
      description: 'Este curso se enfoca en el desarrollo de habilidades avanzadas de programación y en la aplicación práctica de estas habilidades en la solución de problemas complejos. Durante el curso, los estudiantes profundizarán en lenguajes de programación como C, C++ o Java, y explorarán temas avanzados como la programación orientada a objetos, estructuras de datos, algoritmos de búsqueda y ordenación, y manejo de archivos. El curso también incluye el uso de herramientas y entornos de desarrollo integrados (IDEs) que facilitan la escritura, depuración y mantenimiento del código. Los estudiantes participarán en proyectos prácticos que les permitirán aplicar los conceptos aprendidos en la implementación de aplicaciones y sistemas más complejos. Se fomentará el trabajo en equipo y el uso de metodologías ágiles para el desarrollo de software, simulando el entorno profesional de la industria de la ingeniería y la tecnología.',
      credits: 4,
    },
    {
      code: '685',
      name: 'Investigacion de Operaciones 1',
      description: 'Las técnicas de Investigación de Operaciones se encuentran entre las herramientas más importantes de ingenieros y científicos porque proporcionan los medios más eficientes para la administración de recursos (hombres, máquinas, dinero, materiales, tiempo). Utiliza para ello modelos matemáticos que optimizan en algún criterio particular, permitiendo tomar decisiones acertadas. El propósito de este curso es iniciar la formación básica en métodos cuantitativos (área a la que pertenece este curso) para la administración; presenta una introducción a la investigación de operaciones y sus aplicaciones, para ello analizan conceptos y describe técnicas que son sumamente importantes en la solución de problemas de todo tipo. Asimismo, se pretende fomentar la utilización de métodos analíticos desarrollando en el estudiante, el razonamiento deductivo y el espíritu de investigación. En la presentación del curso se aprovecha el conocimiento de la teoría matemática y de probabilidades que ya posee el estudiante para lograr profunda comprensión de los conceptos expuestos. Este curso tiene el enlace para los cursos de Control de la Producción e Investigación de operaciones 2. El curso consta de cinco unidades, distribuidas de la siguiente forma: En la primera unidad se ve la introducción de forma teórica; en la unidad dos se estudia la Programación lineal en la formulación y solución gráfica de problemas de asignación de recursos; en la unidad tres se estudia la Programación Lineal por medio del Método Simplex; en la unidad cuatro se estudia la Programación Lineal por medio del Método de Transporte y en la unidad cinco se estudia los Modelos de Redes',
      credits: 5,
    },
    {
      code: '677',
      name: 'Resistencia de Materiales 2',
      description: 'La resistencia de materiales trata del cálculo de los esfuerzos y deformaciones que se producirán en los distintos elementos sometidos a diversos tipos de carga, y el ingeniero debe garantizar que las deformaciones estén dentro de los límites permisibles y además que no se produzcan fallas. El realizar el análisis de dichas deformaciones y fallas se pretende que el estudiante tenga los conocimientos básicos de criterios de análisis de identificación de riesgos y la reducción de desastres, ya que podrá identificar desde un inicio de análisis las deformaciones excesivas en los elementos que pueden llevar a una falla tanto en el elemento de forma individual y como esto puede incidir en una estructura completa. Para alcanzar este objetivo primero debe determinarse a qué tipo de fuerza está sometido el elemento bajo estudio, que pueden ser axiales, transversales (flexión), momentos torsionales (torsión) o una combinación de estas. En la práctica el análisis se realiza construyendo un esquema ideal del cálculo formado por elementos unidimensionales o bidimensionales y se aplican fórmulas preestablecidas para calcular esfuerzos internos, realizar un análisis resistente y un análisis de rigidez. En el curso de resistencia de materiales 2 se dará énfasis al estudio de: deformaciones en vigas, resolución de vigas estáticamente indeterminadas, columnas y esfuerzos combinados. Los conocimientos adquiridos en el curso serán la base para cursos de análisis estructural y análisis mecánico',
      credits: 5,
    },
    //Civil
    { code: '1073', name: 'Topografia 3', 
      description: 'El curso de Topografía 3 se centra en el estudio avanzado de técnicas y herramientas utilizadas en la medición y representación del terreno. Los estudiantes aprenderán a manejar instrumentos topográficos de precisión, como el teodolito y la estación total, así como a utilizar tecnologías modernas como el Sistema de Posicionamiento Global (GPS) y los sistemas de Información Geográfica (SIG). A lo largo del curso, los estudiantes desarrollarán habilidades prácticas en la realización de levantamientos topográficos complejos y en la interpretación de datos obtenidos. Se abordarán temas como la nivelación geométrica y trigonométrica, el cálculo de áreas y volúmenes, y la generación de planos topográficos detallados.', 
      credits: 6 
    },
    {
      code: '679',
      name: 'Materiales de Construccion',
      description: 'El curso de Materiales de Construcción proporciona las herramientas para la correcta selección de los materiales a emplear en el diseño y construcción de obra civil, tomando como base los requerimientos de desempeño, normativa y sostenibilidad además de analizar a detalle las propiedades, normas y elementos del diseño de mezclas de concreto, estructuras de madera, metal, y diversos materiales de construcción que se utilizarán según los requerimientos del entorno. Se aborda la selección y uso de los materiales de construcción a manera de minimizar los impactos negativos al medio ambiente, y asegurar la calidad de la construcción reduciendo así la vulnerabilidad ante las amenazas naturales',
      credits: 6,
    },
    { code: '748', name: 'Mecanica de Suelos', 
      description: 'dedicado al estudio de las propiedades físicas y mecánicas de los suelos. Este curso aborda los principios fundamentales que determinan el comportamiento de los suelos bajo diversas condiciones de carga y estrés, esenciales para el diseño y construcción de estructuras seguras y duraderas. Los estudiantes aprenderán a clasificar diferentes tipos de suelo y a evaluar sus características mediante ensayos de laboratorio y campo. Se cubrirán temas como la consolidación, la capacidad de carga, el asentamiento, la estabilidad de taludes, y la permeabilidad de los suelos. Además, se estudiarán los métodos de mejoramiento y estabilización de suelos para asegurar la viabilidad de proyectos de infraestructura. Un enfoque significativo del curso es la aplicación de la Mecánica de Suelos en el diseño de cimentaciones, muros de contención, y otras estructuras geotécnicas. Los estudiantes desarrollarán habilidades analíticas y prácticas para solucionar problemas relacionados con la interacción entre el suelo y las estructuras, contribuyendo así al éxito y seguridad de proyectos de ingeniería', 
      credits: 5 },
    { code: '686', name: 'Hidraulica', 
      description: 'El agua juega un papel preponderante e importante en cualquier cultura por buenas razones, es un medio de trasnporte y recurso básico de sobrevivencia. El hombre necesita agua para beber, preparar alimentos, aseo personal, pero también es una fuente de energía como medio de transporte. Por ello, el agua posee una simbología preponderante en las representaciones de cualquier cultura. Una vez discutidas las ideas de mecanica de fluidos, se exponen a los temas de la hidraulica que versan sobre el transporte y distribucion de agua, asi como de otros tipos de fluidos. En esta asignatura una idea fundamental es el teorema de Bernoulli, como una particularidad del principio de conservacion de la energia. Al anterior se suman el concepto de viscosidad, previa discusión en la asignatura de Mecanica de Fluidos. Viene posteriormente la aplicacion del teorema de Bernoulli a los sistemas confinados y no confinados del agua, con el estudio de tuberías a sección llena con presión manométrica mayor que cero y la tubería como tahujías y canales que trabajan a seccion parcial y presion atmosférica unicamente. Finalmente se cae al estudio de los vertederos.', 
      credits: 6 },
    //Mecanica
    { code: '684', name: 'Termodinamica 1', 
      description: 'Los profesionales de la ingeniería debe ser capaz de dominar los conceptos de transformación de energía, las propiedades relacionadas con la materia, su eficiencia y ahorro por el bien del medio ambiente, en la búsqueda de energías alternas y renovables. El estudiane aprendera sobre el uso de las dimensionales y su transformacion entre los distintos sistemas de unidades, se vera el concepto de temperatura y la ley cero de la termodinamica, asi como como los conceptos de calor y trabajo. y la transformacion por medio de la primera ley de la termodinamica, ademas se analiza la razon por la que la transformacion de energia no es total sino parcial, por la segunda ley de la termodinamica o entropia', 
      credits: 5 },

    
    {
      code: '687',
      name: 'Procesos de Manufactura 1',
      description: 'El Curso proporciona a los estudiantes de las carreras de Ingeniería Mecánica e Industrial, el conocimiento teórico-práctico de procesos de fabricación y mantenimiento, utilizando máquinas herramientas tales como sierra mecánica, torno, cepillo, taladro, fresa, etc. Se expondrá al estudiante mediante presentaciones multimedia, el conocimiento de procesos de fabricación mediante manufactura y su función en nuestra sociedad, haciendo énfasis en los procesos con arranque de viruta o maquinado, así como el conocimiento de las máquinas - herramientas que se utilizan para tal efecto. Además se conocerán los distintos tipos de procesos y sub procesos de torneado, fresado, taladrado, cepillado, etc Este curso tiene laboratorio donde se llevan a cabo aplicaciones prácticas de los conceptos y principios de los procesos de fabricación indicados.',
      credits: 3,
    },
    //Sistemas
    { code: '2808', name: 'Teoria de Sistemas 1', 
      description: 'Este curso busca abordar con profundidad el concepto de paradigma o modelo mental, distinguiendo así los sistemas de creencias que constituyen al ser humano y su rol en el comportamiento y desempeño personal y profesional que estas herramientas abstractas nos proporcionan, de tal manera de conocer sus beneficios y sus limitaciones. El curso enfatiza particularmente en el estudio del “paradigma de sistemas”, denominado también “pensamiento sistémico”, “visión sistémica” o “enfoque sistémico”; todos términos asociados al uso y aplicación de un sistema de creencias particular que busca ser consciente de los beneficios y limitaciones de los paradigmas y ampliar el uso de estas herramientas abstractas para el beneficio de nuestra práctica profesional influyendo también el que hacer personal. El “paradigma de sistemas” se fundamenta en la “Teoría General de Sistemas” (T.G.S.), por lo que el estudio de esta teoría durante el semestre proporcionará conceptos, definiciones y expresiones del lenguaje que nos permitirá hablar con mayor precisión de los “fenómenos de sistemas” que podemos identificar y comprender a nuestro alrededor. Ser un“pensador sistémico” implica ser más consciente de nuestro desempeño personal y profesional, así como ser conscientes del entorno que nos rodea para comprenderlo de formas más precisas y tomar decisiones más acertadas que nos permitan intervenir de forma eficiente y efectiva en los sistemas con los que interactuamos', 
      credits: 5 },
    { code: '2809', name: 'Economia', 
      description: 'El curso introducirá al estudiante en el estudio de la economía, se abordarán los principios, variables e interacciones basados en la teoría y práctica para comprender el funcionamiento del sistema económico del país a un nivel microeconómico y macroeconómico para que los futuros profesionales puedan comprender como la economía genera cambios dentro de la sociedad', 
      credits: 4 },
    {
      code: '2810',
      name: 'Organizacion de Lenguajes y Compiladores 2',
      description: 'Este curso estudia los principios avanzados de un compilador y / o intérprete, partiendo de la estructura semántica del proceso de compilación, y describiendo las fases de este proceso. Se tratan en detalle las traducciones dirigidas por la sintaxis y el análisis semántico Para poner en práctica los conceptos aprendidos se realizan varias tareas y proyectos prácticos. La construcción de compiladores es una tarea que implica muchos conocimientos relacionados a las ciencias de la computación, algoritmos y procesos automatizados que permiten la lectura y comprensión de un código fuente y generar un programa funcional. A lo largo del desarrollo de la formación del estudiante, se usa constantemente diferentes compiladores y es importante conocer las capacidades y limitaciones para generar código optimizado dependiendo del compilador usado.',
      credits: 5,
    },
    {
      code: '2811',
      name: 'Arquitectura de Computadores y Ensambladores 1',
      description: 'Desarrolle, estudie y aplique conceptos sobre la arquitectura de los microprocesadores de la línea tecnológica INTEL/CISC. Aprenda la utilidad del lenguaje ensamblador como herramienta eficaz para acceso de los procesadores antes mencionados, como base elemental de un computador comercial, ejemplo: DMA, Buses, Interfaces básicas, Interrupciones y fundamentos de los procesadores RISC',
      credits: 5,
    },
    {
      code: '2812',
      name: 'Manejo e Implementacion de Archivos',
      description: 'En el curso se estudian los conceptos básicos para comprender la forma en que los archivos soportan un sistema de gestión de base de datos, la forma en que los datos deben ser almacenados para que su manejo y mantenimiento sean eficientes y óptimos. Se da una introducción a los conceptos necesarios para entender la arquitectura de las bases de datos y la forma en que se administran y funcionan',
      credits: 4,
    },

    //Septimo Semestre
    //Area Comun
    { code: 'C', name: 'Geofisica del Petroleo', description: '', credits: 4 }, //TODO: REVISAR, NO TIENE CODIGO
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

    { code: '950', name: 'Estadistica 2', 
      description: 'El análisis de datos comprende el uso de métodos de estadística inferencial para estimar parámetros desconocidos de los modelos y comprobar hipótesis sobre la estructura de los datos y de procedimientos para la toma de decisiones y formular ciertas conclusiones que pueden aplicarse a la solución de distintos problemas. En este curso, se presentan los métodos corrientes de construcción de estimadores y los criterios para examinar las estadísticas; se aborda también el método de variable pivote para construir intervalos con?denciales y se hace énfasis en los intervalos bajo normalidad. En la primera unidad se plantean los conceptos de muestra aleatoria y distribución de muestreo. En la segunda unidad se presentan los métodos de estimación tanto puntual como de intervalo. En la tercera unidad se exploran las bases de la inferencia estadística y se presentan las pruebas de hipótesis para medias, varianza y proporciones. En la unidad cuatro se detalla el uso de la distribución chi-cuadrada, tanto para determinar la bondad de ajuste como para tablas de contingencia y en la unidad cinco se ve el tema de regresión lineal y correlación.', 
      credits: 5 },
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
      description: 'A diario se toman decisiones que afectan el futuro económico y físico del medio en el que se desenvuelven las personas. Las opciones que se tomen cambian sus vidas en poco y algunas veces considerablemente; en el caso de decisiones que involucren el manejo de dinero, estas pueden determinar el éxito o fracaso de una empresa, planteándose el término empresa no solo como el ente encargado de producir ganancias, sino también como cualquier actividad emprendedora. En este sentido la ingeniería económica definida como la colección de técnicas matemáticas que simplifican las comparaciones económicas, es una herramienta eficaz para la mayordomía adecuada de los recursos económicos, en todo sentido, y más aún en el ejercicio de la ingeniería como origen de desarrollo y crecimiento económico en el medio físico ligadas entre sí por los procesos de producción y de construcción. El objetivo de la ingeniería económica es preparar a los ingenieros para hacerle frente efectivamente a la naturaleza bio ambiental y la asignación óptima de los recursos agotables y de esta manera entender los problemas económico-ambientales.',
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
      description: 'abarca los principios y técnicas fundamentales para el análisis y diseño de circuitos eléctricos. El curso comienza con una introducción a los conceptos básicos de electricidad, como voltaje, corriente y resistencia, y la Ley de Ohm. Se estudian los componentes eléctricos esenciales, incluyendo resistencias, capacitores, inductores y fuentes de energía. Además, se exploran los métodos de análisis de circuitos en corriente continua (DC) y corriente alterna (AC), como las leyes de Kirchhoff y los teoremas de Thevenin y Norton. El curso también incluye prácticas de laboratorio donde los estudiantes construyen y prueban circuitos, utilizando herramientas como multímetros y osciloscopios. Este curso proporciona una base sólida para entender y aplicar los principios de los circuitos eléctricos en el diseño y mantenimiento de sistemas mecánicos y electromecánicos',
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
    { code: '952', name: 'Ingenieria de Plantas', 
      description: 'La competitividad de una empresa no es solamente la calidad y tipo de producto que ofrece, sino el costo de producción, lo que implica una relación integral de todos los componentes involucrados en el proceso de producción. Un componente muy importante es el conjunto de instalaciones de la empresa. Este conjunto no es solamente el edificio, sino las comunicaciones, la distribución, los materiales y su manejo. Al final todo lo que mueve a la producción, por lo tanto se hace necesario controlar cada componente, para hacer una planta industrial eficiente.', 
      credits: 6 },
    {
      code: '682',
      name: 'Metalurgia y Metalografia',
      description: 'Es un curso introductorio de conceptualización sobre el arte, la ciencia y la tecnología para obtener metales, desde sus minerales, estudiando sus propiedades físicas y mecánicas, hasta su transformación en un objeto útil para satisfacer las necesidades humanas en bien del desarrollo industrial. Así mismo, existe un énfasis en enfocar en forma teórica los distintos procesos de manufactura que se realizan a partir de la deformación de metales, así como los procesos más importantes y conocidos en Guatemala, y su relación con otros procesos productivos de la tecnología moderna aplicada, sin olvidar la consideración en los temas relacionados con el cuidado del medio ambiente y la ecología',
      credits: 6,
    },
    {
      code: '698',
      name: 'Procesos de Manufactura 2',
      description: '',
      credits: 3,
    },
    //Industrial
    { code: '793', name: 'Mercadotecnia 1', 
      description: 'En la actualidad una herramienta para la competitividad es crear valor para el cliente y construir relaciones que beneficien a la empresa y al mercado, en ambientes de constante cambio y de alta tecnología. Para ello el curso de Mercadotecnia 1 capacitará al estudiante de Ingeniería Industrial, en las técnicas que le servirán para comprender el significado de satisfacer al consumidor y de las técnicas mercadológicas del proceso de la mercadotecnia, que le ayuden a desarrollar estrategias de competitividad.', 
      credits: 3 },
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
      description: 'Este curso se ha diseñado para que el estudiante conozca, a nivel introductorio, los principales temas del área macroeconómica, como el enfoque más amplio del funcionamiento de un sistema económico. Se enfatizará en cuáles han sido las necesidades de la problemática económica internacional que permitieron la evolución de este nuevo campo de especialización, que dieron origen al estudio diferenciado de los grandes agregados, hasta la estructuración, de los principales temas que en la actualidad comprende. Asimismo, cuáles son las tendencias en su orientación, tanto desde sus inicios como hasta la actualidad. Previo a que aborden directamente los temas de la macroeconomía, es necesario enfatizar cuál es la naturaleza de la ciencia económica, su importancia y principales ramas. De igual manera, diferenciar con claridad cuál es el campo de estudio de la microeconomía y el de la macroeconomía, así como los aspectos complementarios entre ambas disciplinas. Puesto que todo individuo en el ámbito social cumple también variadas funciones como agente económico, el curso se propone dar una visión general y amplia al estudiante, sobre cuáles son las características del entorno económico en el que se desenvuelve actualmente, y que ya en su vida profesional deberá conocer para la realización de un efectivo ejercicio.',
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
    { code: '693', name: 'Mecanismos', 
      description: 'Curso dirigido a los estudiantes de Ingeniería Mecánica, que abarca la cinemática de algunos mecanismos básicos que forman parte de las máquinas. Se expondrá al estudiante mediante presentaciones multimedia, el conocimiento de mecanismos básicos de eslabones articulados, levas y engranajes, se analizará cuáles son los elementos que conforman los mecanismos y el movimiento que generan. Además se conocerán los distintos tipos de movimientos que se pueden generar con la combinación de dos o más mecanismos. Se desarrollará un proyecto de una aplicación de tres mecanismos combinados con el propósito de poner en práctica los conocimientos teóricos aprendidos y conocer las consideraciones de diseño y construcción que requiere dicho proyecto.', 
      credits: 3 },
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
