\chapter{ Plan del proyecto }

El plan de desarrollo software es el documento que dirige la gestión de un proyecto software. Define las funciones técnicas y de gestión de proyectos, actividades y tareas necesarias para
satisfacer los requisitos del proyecto.
La finalidad de esta sección es conocer los puntos básicos de los que consta el proyecto,
proporcionar los fundamentos en los que se basa y transmitir los aspectos básicos tal y como han
sido entendidos y formulados.
A continuación se describirá la visión general del proyecto, que proporciona una descripción del propósito, alcance y objetivos; la gestión del proceso que explica el coste estimado y la
planificación las fases principales e hitos del proyecto.

## Vision general

### Propósito, alcance y objetivos

El objetivo del presente proyecto es desarrollar un prototipo de aplicación que sirva de
apoyo para la asignatura de Matemática Discreta. La aplicación será un complemento educativo que permitirá al alumno repasar los conceptos teóricos más importantes, evaluar sus conocimientos mediante unos cuestionarios de tipo test y realizar consultas al profesor. Por parte del profesor permitirá introducir contenidos teóricos, resolver dudas, plantear preguntas para formar los cuestionarios y monitorizar el desempeño de los alumnos en la misma.

Toda esta información aparecerá de manera detallada en el apartado Análisis de Requisitos

### Metodología utilizada

Se ha utilizado la metodología Kanban. Esta técnica se creó en Toyota, y se utiliza para controlar el avance del trabajo, en el contexto de una línea de producción. Los pricipios que rigen la metodología son los siguientes: 

* **Calidad garantizada:**
    Todo lo que se hace debe salir bien a la primera, no hay margen de error. De aquí a que en Kanban no se premie la rapidez, sino la calidad final de las tareas realizadas. Esto se basa en el hecho que muchas veces cuesta más arreglarlo después que hacerlo bien a la primera.

* **Reducción del desperdicio:**
    Kanban se basa en hacer solamente lo justo y necesario, pero hacerlo bien. Esto supone la reducción de todo aquello que es superficial o secundario

* **Flexibilidad:**
    Lo siguiente a realizar se decide del backlog (o tareas pendientes acumuladas), pudiéndose priorizar aquellas tareas entrantes según las necesidades del momento

Para su implementación se ha utilizado la herramienta provista por Github usando las siguientes columnas:

* **To Do:**
    El backlog de tareas

* **In Progress:**
    Las tareas que se estan haciendo actualmente

* **Done:**
    Las tareas ya realizadas

### Evolución del plan
El presente documento se revisará a lo largo del Trabajo de Fin de Grado y se irá actualizando conforme a los cambios que surjan.

## Gestión del proceso

### Estimación

Se considerará que la dedicación media al proyecto será de un total de 4 horas diarias con un solo recurso sin días de descanso. La fecha de inicio del proyecto es el 10/03/2017. Tras el estudio del plan de trabajo se estima que se requeriran aproximadamente 500 horas, por lo que se marca el hito de entrega del proyecto el 12/7/2017.

### Plan de trabajo

* **Reunión con el cliente y documentación**
    * Recopilar información sobre el objetivo que persigue el cliente mediante entrevistas personalizadas, así como estudio de la documentación que este nos facilite.
    * **Duración:** 7 días

* **Elicitación de requisitos**
    * Asegurar los requisitos extraidos de las entrevistas previas mediante la confirmación con el cliente. Este proceso se repetirá hasta conseguir extraer todos los requisitos que el cliente busca.
    * **Duración:** 7 días

* **Realización del diagrama de casos de uso y elaboración de un plan de trabajo provisional**
    * Realización de un plan de trabajo provisional para tener una marco de referencia a la hora de distribuir el tiempo. Para ello, se decidiran cuales son los casos de uso y se hara el diagrama correspondiente, sin profundizar.
    * **Duración:** 2 días

* **Diseño de las vistas de la aplicación y elicitación con el cliente**
    * Diseño en papel de las vistas de la aplicación.
    * **Duración estimada:** 7 días
    * **Duración real:** 7 días

* **Estudio de las tecnologías actuales que nos permitan desarrollar el proyecto**
    * Estudio y comparación de las tecnologías actuales, su grado de adecuación al proyecto y su complejidad técnica, teniendo en cuenta los conocimientos previos de los que partimos.
    * **Duración estimada:** 2 días
    * **Duración real:** 2 días

* **Aprendizaje y práctica de las tecnologías escogidas**
    * Realización de ejemplos sencillos para comprobar de forma práctica los datos recopilados en el punto anterior.
    * **Duración estimada:** 2 días
    * **Duración real:** 2 días

* **Realización del plan de trabajo y estudio de los riesgos**
    * Basándonos en los conocimientos y destrezas adquiridos en el apartado anterior y en el plan provisional realizado con anterioridad, estudiar de los posibles riesgos y realizar planes de actuación para el caso de que se realicen. A mayores, se realiza un plan de trabajo de carácter definitivo.
    * **Duración estimada:** 2 días
    * **Duración real:** 2 días

* **Realizacion de la descripcion en detalle de los casos de uso**
    * Basándonos en el diagrama realizado en el pasos anteriores, profundizamos en cada uno de los casos de uso, definiendo su descripción en detalle.
    * **Duración estimada:** 4 días
    * **Duración real:** 4 días

* **Modelo de dominio y análisis de la base de datos**
    * Se definirá el modelo de dominio de la aplicación y se diseñará la base de datos basándonos en el.
    * **Duración estimada:** 2 días
    * **Duración real:** 2 días

* **Realización básica de backend**
    * Programación de los elementos básicos y comunes a las aplicaciones Nodejs
    * **Duración estimada:** 4 días
    * **Duración real:** 4 días

* **Realización de las funcionalidades relacionadas con las sesiones**
    * Realización en profundidad del diseño relacionado con las funcionalidades y programación del frontend y el backend de las funcionalidades relacionadas con las sesiones, esto es, permitir al usuario acceder a la aplicación, que se muestre de forma distinta para alumnos y profesores y permitir al usuario salir de la aplicación
    * **Duracion estimada:** 12 días
    * **Duracion real:** 10 días

* **Realización de las funcionalidades relacionada con teoría**
    * Realización en profundidad del diseño de las funcionalidades y programación del frontend y el backend de las funcionalidades relacionadas con la teoria, esto es, mostrar la teoria organizada por temas, permitir la busqueda de teoría por concepto y permitir al profesor añadir y editar conceptos.
    * **Duracion estimada:** 15 días
    * **Duracion real:** 20 días

* **Realización de las funcionalidades relacionadas con dudas**
    * Realización en profundidad del diseño de las funcionalidades y programación del frontend y el backend de las funcionalidades relacionadas con dudas, esto es, permitir al usuario ver las dudas ya preguntadas con anterioridad organizadas por conceptos, permitir generar nuevas dudas y permitir al profesor ver las dudas no resueltas y gestionarlas, ya sea reportándolas, ignorándolas o respondiéndolas.
    * **Duracion estimada:** 15 días
    * **Duracion real:** 19 días

* **Realización de las funcionalidades relacionadas con cuestiones**
    * Realización en profundidad del diseño de las funcionalidades y programación del frontend y el backend de las funcionalidades relacionadas con cuestiones, esto es, permitir al alumno generar cuestionarios segun una serie de parámetros, resolverlos y conocer su resultado y permitir al profesor añadir y editar preguntas.
    * **Duracion estimada:** 15 días
    * **Duracion real:** 18 días

* **Realización de las funcionalidades relacionadas con estadisticas**
    * Realización en profundidad del diseño de las funcionalidades y programación del frontend y el backend de las funcionalidades relacionadas con cuestiones, esto es, permitir al alumno generar cuestionarios segun una serie de parámetros, resolverlos y conocer su resultado y permitir al profesor añadir y editar preguntas.
    * **Duracion estimada:** 3 días
    * **Duracion real:** 3 días

* **Realización de las funcionalidades relacionadas con herramientas**
    * Realización en profundidad del diseño de las funcionalidades y programación del frontend y el backend de las funcionalidades relacionadas con herramientas que permitan poner en práctica los conocimientos de la asignatura.
    * **Duracion estimada:** 10 días
    * **Duracion real:** No realizado
    * **Motivo:** Las funcionalidades relacionadas con herramientas no fueron implementadas ya que, debido a una mala estimación de las funcionalidades anteriores, se descartó para cumplir el plazo de entrega.

* **Mejora de la interfaz**
    * Realización de una interfaz mas allá de la interfaz útil.
    * **Duracion estimada:** 4 días
    * **Duracion real:** 3 días

* **Realización de documentación del TFG**
    * Realización del presente documento, esto incluye los capítulos Introduccion y Conclusiones y los anexos Manual de usuario y Manual de instalación, así como la maquetación del resto de capítulos.
    * **Duracion estimada:** 7 días
    * **Duracion real:** 9 días

* **Mejora de la interfaz**
    * Mejorar el aspecto de la aplicación
    * **Duracion estimada:** 9 días
    * **Duracion real:** No realizado
    * **Motivo:** La mejora de la interfaz no fuer implementadas ya que, debido a una mala estimación de las funcionalidades anteriores, se descartó para cumplir el plazo de entrega.

\newpage

### Plan de Gestión de Riesgos

La lista de riesgos expuesta a continuación tiene las siguientes características:
  
  * **Impacto**: Los riesgos serán catalogados del 1 al 5, siendo 1 el riesgo menos peligroso y 5 el el riesgo más peligroso.
  
  * **Probabilidad**: Los riesgos serán catalogados del 1 al 5, siendo 1 un riesgo muy poco probable y 5 un riesgo muy frecuente.
  
  * **Plan de protección**: Plan para evitar o minimizar la probabilidad.
  
  * **Plan de contingencia**: Plan de solución para minimizar el impacto.

#### Riesgos

* **R-01 - Borrado de datos**
    * **Impacto:** 5
    * **Probabilidad:** 2
    * **Plan de protección:** Utilizar un sistema de control de versiones
    * **Plan de contingencia:** Restaurar la última versión

* **R-02 - Máquina personal averiada**
    * **Impacto:** El impacto se determinará en función del nivel de avería
    * **Probabilidad:** 1
    * **Plan de potección:** No hay
    * **Plan de contingencia:** En función del nivel de avería se detallan 3 posibles planes:
        * **Nivel bajo (Impacto 2):** Intentar arreglar la máquina
        * **Nivel medio (Impacto 3):** Intentar rescatar los datos
        * **Nivel alto (Impacto 5):** Restaurar la última versión en otra máquina y continuar el proyecto desde esta.

* **R-03 - Enfermedad no banal**
    * **Impacto:** 5
    * **Probabilidad:** 1
    * **Plan de protección:** No hay
    * **Plan de contingencia:** Replanificar teniendo en cuenta el tiempo disponible

* **R-04 - Fallo de software de terceros**
    * **Impacto:** 4
    * **Probabilidad:** 3
    * **Plan de protección:** Ninguno
    * **Plan de contingencia:**
        Se seguirán los siguientes pasos: 
        1. Intentar solucionarlo
        2. Intentar esquivarlo
        3. Intentar sustituirlo
        4. Posponer la funcionalidad concreta hasta que este arreglado(esto puede acarrear que la funcionalidad no sea incluida)

* **R-05 - Fallo en las etapas de análisis**
    * **Impacto:** 5
    * **Probabilidad:** 2
    * **Plan de protección:** Prestar especial atención a la etapa de análisis y sobre todo a la elicitación de requisitos.
    * **Plan de contingencia:** Replanificar teniendo en cuenta el tiempo disponible y la posibilidad de reutilización del proyecto generado hasta el momento.

* **R-06 - Fallo en las etapas de diseño**
    * **Impacto:** Variable. Se considera así puesto que un fallo en las etapas iniciales o en una funcionalidad aislada tendría un impacto bajo **(2)** pero aumenta según aumenta el numero de funcionalidades afectadas.
    * **Probabilidad:** 3
    * **Plan de protección:** Inicialmente, realizar un boceto general del sistema. Posteriormente realizar siempre un estudio en profundidad del diseño relativo a la funcionalidad antes de implementarla.
    * **Plan de contingencia:** Replanificar teniendo en cuenta el tiempo disponible y la posibilidad de reutilización del proyecto generado hasta el momento.

### Presupuesto

Teniendo en cuenta que un analista programador cobra 10 euros por hora y la aplicación se ha planificado para 492 horas, se fija el coste de la mano de obra en 4920 euros.

Teniendo en cuenta que el coste de mi ordenador fue de 500 euros, los ordenadores portátiles tienen un período medio de vida útil de 4 años y el proyecto dura 4 meses, se fija el coste de hardware en 41.66 euros

**Presupuesto total:** 4961,66 euros
    