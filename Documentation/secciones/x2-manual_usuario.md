\chapter{ Manual de usuario }

A continuación, se explicará el funcionamiento de la aplicación web.

En primer lugar, está el login. Se introduce el usuario y contraseña.

Distinguiremos dos casos, según sea un alumno o un profesor el que ingrese en la aplicación.

## Manual del alumno:

Según se ingresa en la aplicación se accede a la pantalla de teoría. Se puede ver en la parte superior la barra de navegación, y en ella dos apartados, "Teoría" y "Test" y la opción "Salir". Esta última opción, permite cerrar sesión.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/alumno-teoria.png}
    \end{center}
    \caption{Pantalla inicial de teoría}
\end{figure}

Dentro de la pantalla de teoría se puede escoger un tema en el selector, y una vez seleccionado, se puede escoger un concepto. Tras clicar, se ve el contenido del concepto y las palabras relacionadas. A mayores, se activará el boton "Ver dudas".
También se puede buscar un concepto basándonos en sus palabras destacadas introduciendo la palabra(o parte de ella) en la barra de búsqueda de la parte superior.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/alumno-teoria2.png}
    \end{center}
    \caption{Pantalla tras pulsar sobre un concepto}
\end{figure}

Pulsando en el botón "Ver dudas", se accedera a la pantalla de dudas.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/alumno-teoria3.png}
    \end{center}
    \caption{Pantalla ver dudas}
\end{figure}

Al pulsar en una dudad se verá el contenido de la duda.
Al pulsar sobre el boton "Añadir duda" se nos despliega un formulario que permite añadir los datos para insertar una nueva duda. Tras pulsar sobre el botón "Enviar" la aplicación redirige a una pantalla de confirmación. Finalmente, tras confirmar, la duda sera insertada.
En esta pantalla también se puede ver una barra de búsqueda, que permite la búsqueda concreta de dudas en funcíon de su contenido.

Pulsando en el botón "Test" de la barra de navegación redirige a la pantalla principal de test.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/alumno-test4.png}
    \end{center}
    \caption{Pantalla inicial de test}
\end{figure}

En este punto, se muestran 3 opciones, buscar test por concepto, buscar test por tema y buscar test general. Cada una de ellas generará un cuestionario basado en la opción escogida y redirigirá a una pantalla que permite rellenar el cuestionario.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/alumno-test5.png}
    \end{center}
    \caption{Pantalla de cuestionario}
\end{figure}

Tras rellenarlo, se pulsa el botón "Enviar"y la aplicación redirigirá a una pantalla de confirmación. Tras confirmar, redigirá a una pantalla similar a la de cuestionario pero que incluye la resolución del mismo, así como la nota conseguida.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/alumno-test6.png}
    \end{center}
    \caption{Pantalla de resolución}
\end{figure}


## Manual del profesor:

Según se ingresa en la aplicación se accede a la pantalla de teoría. Se puede ver en la barra superior la barra de navegación, y en ella cuatro apartados, "Teoría", "Dudas", "Estadísticas" y "Test" y la opción "Salir". Esta última opción, permite cerrar sesión. El apartado dudas, puede ir acompañado de un número, que indica el número de nuevas dudas sin resolver.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-teoria.png}
    \end{center}
    \caption{Pantalla inicial de teoría del profesor}
\end{figure}

En esta pantalla se mantiene toda la funcionalidad explicada en el apartado "Manual del alumno".
Desde esta pantalla se permite añadir un nuevo elemento de teoría, pulsando en el botón "Añadir" y rellenando el formulario correspondiente. En el último paso, la aplicación pedirá confirmación para asegurar que los datos se han introducido correctamente.

Volviendo a la pantalla inicial de teoría, tras pulsar en un concepto se permite borrarlo o editarlo
pulsando los botones "Borrar" y "Editar" respectivamente. De forma análoga al paso de añadir tras finalizar el proceso, pedirá confirmación al usuario.

La opción "Ver dudas", funcionará de forma similar a la descrita en el apartado "Manual de alumno", con el añadido de que, una vez seleccionadas, permite al profesor borrar dudas.

Pulsando en el apartado "Dudas" de la barra de navegación la aplicación dirigirá a una nueva pantalla donde se muestran las nuevas dudas sin resolver. Tras pulsar sobre una de ellas, se muestra el contenido, el concepto relacionado y tres opciones, "Reportar", "Ignorar por repetido", "Responder".
"Reportar" significa que la duda es inapropiada u ofensiva. "Ignorar por repetido" significa que la dudad está repetida y que no va a ser respondida. Por último, la opción "Responder" permite al profesor responder la duda. El sistema pedirá confirmación antes de hacer cualquiera de estas acciones, ya sea mediante un aviso en el caso de "Reportar" e "Ignorar" o mediante una pantalla de confirmación en el caso de "Responder.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-dudas.png}
    \end{center}
    \caption{Pantalla de dudas}
\end{figure}

La opción "Test" de la barra de navegación redirige a la pantalla de test.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-test.png}
    \end{center}
    \caption{Pantalla inicial de test del profesor}
\end{figure}

En ella, el profesor escoge un tema y pulsa el botón "Revisar". Tras ello, se muestran los enunciados de las cuestiones y el botón "Añadir".

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-test2.png}
    \end{center}
    \caption{Pantalla de test del profesor}
\end{figure}

Pulsando sobre cualquiera de ellos, se mostrarán las posibles respuestas, marcando con un tick las correctas y las botones "Editar" y "Borrar". Si se escoge la opción borrar, la aplicación pedirá al profesor confirmación antes de borrarla. Pulsando sobre "Confirmar" la cuestión será eliminada.
Si se escoge la opción "Editar", la aplicación nos redirigirá a una pantalla en la cual podremos modificar el contenido de la cuestión. El formulario de editar funciona de manera análoga a la opción añadir, que será explicada a continuación. Finalmente, tras confirmar, la cuestion será editada.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-test2-desplegada.png}
    \end{center}
    \caption{Pantalla de test del profesor con duda desplegada}
\end{figure}

La opción "Añadir" permite al profesor añadir una nueva cuestión. Al pulsarla, nos redirigirá a la siguiente pantalla.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-test3-aniadir.png}
    \end{center}
    \caption{Pantalla de añadir pregunta}
\end{figure}

Esta pantalla muestra un formulario que formará la pregunta. Para añadir nuevas opciones es necesario que todas las opciones incluidas sean válidas, es decir, no estén vacías ni sean repetidas. En la foto anterior se puede observar que, al estar vacía no permite añadir nuevas dudas. Tras rellenar la respuesta, se puede elegir si la respuesta es correcta o incorrecta cambiando el símbolo a la derecha clicando.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/pregunta-verdadera.png}
    \end{center}
    \caption{Pantalla de pregunta verdadera}
\end{figure}

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/pregunta-falsa.png}
    \end{center}
    \caption{Pantalla de pregunta falsa}
\end{figure}

Tras tener una serie de respuestas que cumplan con las condiciones necesarias, esto es, que no tengan respuestas repetidas ni vacías y que al menos una de ellas sea verdadera y una falsa; pulsando en el botón "Añadir", la aplicación pedirá confirmación, y tras confirmar, la cuestión será guardada.  

Por último, el apartado "Estadísticas" de la barra superior nos redigirá a la página de estadísticas.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-estadisticas.png}
    \end{center}
    \caption{Pantalla de principal de estadísticas}
\end{figure}

En ella, el profesor introduce un numbre de alumno y la aplicación muestra el número de conceptos visitados, el número de cuestionarios realizados y el número de dudas preguntadas.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-estadisticas2.png}
    \end{center}
    \caption{Pantalla de estadisticas tras buscar}
\end{figure}

Tras pulsar sobre cada uno de estos recuadros, dará información en detalle.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-estadisticas-detalle1.png}
    \end{center}
    \caption{Pantalla de estadisticas tras buscar}
\end{figure}

Destacar del detalle de las dudas planteadas que marca en rojo las previamente reportadas por el profesor y en naranja las proviamente ignoradas.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-estadisticas-detalle2.png}
    \end{center}
    \caption{Pantalla de estadisticas tras buscar}
\end{figure}

Destacar del detall de los cuestionario realizados que marca en rojo los cuestionarios suspensos y en verde los cuestionarios aprobados.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/manual/profesor-estadisticas-detalle3.png}
    \end{center}
    \caption{Pantalla de estadisticas tras buscar}
\end{figure}
