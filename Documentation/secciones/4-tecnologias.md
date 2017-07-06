# Tecnologías utilizadas

## Definiciones previas necesarias

* **JavaScript:**
JavaScript (abreviado como JS) es un lenguaje multi-paradigma ligero e interpretado, orientado a objetos.

* **TypeScript:**
TypeScript es un superconjunto de JavaScript que permite el uso de clases, interfaces y tipado estático. El uso de variables tipadas de TypeScript aporta mayor robustez al código, pero por contra nos hace perder flexibilidad.

* **ECMAScript:**
ECMAScript (abreviado como ES) es un lenguaje de scripting que forma la base de JavaScript. Está recogido en los estándares ECMA-262 y ECMA-402 de ECMA International. Al referirnos a ES5 nos referimos a la quinta versión del estándar ECMA-262, mientras que al hablar de ES2015 o ES6 nos referimos al estándar ECMA-262 en su sexta versión. Actualmente los navegadores soportan ES5, por lo cualquier lenguaje derivado de ECMAScript(como son JavaScript y TypeScript) deben de ser traspilado a ES5.

* **Gestor de paquetes:**
Un gestor de paquetes mantiene un registro del software que está instalado en su ordenador, y le permite instalar software nuevo, actualizarlo a versiones más recientes, o eliminar software de una manera sencilla. Como su propio nombre sugiere, los gestores de paquetes gestionan paquetes: conjuntos de ficheros que se agrupan y que puede instalar y eliminar como conjunto. La labor de un gestor de paquetes es la de presentar una interfaz que asista al usuario en la tarea de administrar el conjunto de paquetes que están instalados en su sistema.

* **Plataforma:**
Una plataforma es un sistema que engloba los componentes, interfaces y librerías necesarios para permitir a los desarrolladores compilar, ejecutar y depurar sus aplicaciones.

* **Framework:**
Desde el punto de vista del desarrollo de software, un framework es una estructura de soporte definida, en la cual otro proyecto de software puede ser organizado y desarrollado.

* **Open source:**
La terminología open source incluye a aquellos softwares que cumplen los siguientes requisitos:
    * **Distribución libre:**La licencia no restringirá a ninguna de las partes vender o regalar el software como un componente de un conjunto de software.
    * **Código fuente:** El programa debe incluir el código fuente sin ofuscar o dotar de un mecanismo para conseguirlo, preferentemente de forma gratuita mediante una descarga online.
    * **Trabajos derivados:** La licencia debe permitir modificaciones y trabajos derivados, y permitir que se distribuyan de forma libre.
    * **Integridad del código fuente del autor:** La licencia podría permitir no distribuir el código fuente del programa modificado si permite la distribución de parches. La licencia debe permitir explícitamente la distribución del software construido a partir de las fuentes modificadas.
    * **Sin discriminación:** La licencia no debe discriminar a ninguna persona ni colectivo.
    * **Para todos los ámbitos:** La licencia no debe restringir el uso en función del ámbito para el que se vaya a utilizar el software.
    * **Distribución de licencia:** Los derechos asociados al software deben aplicarse a todos los programas redistribuidos.
    * **La licencia no debe estar asociada a un producto:** Los derechos del software no deben depender del paquete de software en el que se distribuya
    * **La licencia no debe restringir a otros programas que se distribuyan junto a ella.**
    * **La licencia debe ser independiente de la tecnología utilizada.**

* **Back-end:**
Término técnico para la capa de acceso a datos.

* **Front-end:**
Término técnico para la capa de presentación de una aplicación. Concierne los componentes externos del sitio o aplicación web.

* **Propiedad:** 
Una propiedad de un objeto puede ser explicada como una variable que se adjunta al objeto.  Las propiedades de un objeto definen las características de un objeto. Un valor de propiedad puede ser una función, la cual es conocida entonces como un método del objeto.

* **Licencia GPL:**
La licencia GPL o GNU GPL es una licencia copyleft. Esto es, un método general que requiere que todas las versiones modificadas y extendidas sean también libres.

* **API:**
API significa interfaz de programación de aplicaciones (Application Programming Interface). Las APIs ofrecen una forma de estándar de dotar de funcionalidad a una aplicación, definiendo que funciones y métodos son accesibles.

## Node.js

\begin{figure}[H]
    \begin{center}
        \includegraphics[scale=0.05]{img/nodejs.png}
    \end{center}
    \caption{Logo de Node.js}
\end{figure}

Node.js es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome

### Instalación

Para instalar node vamos a usar nvm. En este proyecto utilizaremos la versión **6.9.5**
```
curl -sL \
https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh \
-o install_nvm.sh
bash install_nvm.sh
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```
En este proyecto usaremos la versión **6.9.5**
```
nvm install v6.9.5
```


## NPM

\begin{figure}[H]
    \begin{center}
        \includegraphics[scale=0.8]{img/npm.png}
    \end{center}
    \caption{Logo de NPM}
\end{figure}

Npm es un gestor de paquetes que permite a los desarrolladores de JavaScript compartir y reutilizar código. Gracias a este gestor podemos conseguir de forma sencilla y actualizada las dependencias que va a tener nuestra aplicación. Este gestor de paquetes resulta esencial, ya que de él dependen Angular, Angular CLI y Node.js.
 
### Instalación:

NPM es instalado junto con Node.js en el apartado anterior. Vamos a actualizarlo.

```
npm install -g npm
```

### Principales comandos utilizados:

* `
npm install
`

    Este comando instala todas las dependencias que hayamos declarado en nuestro fichero de configuración.En caso de especificar un nombre al final del comando instalaremos únicamente la dependencia nombrada. Este comando instala los paquetes elegidos, así como todos los paquetes de los que estos dependa. Usualmente se usará la opción --save que nos guarda la dependencia en nuestro fichero de configuración, de forma que podamos instalarla posteriormente

* `
npm uninstall [nombre]
`

    Este comando elimina la dependencia nombrada de nuestro sistema. Usualmente, se usará la opción --save para eliminarla también del fichero de configuración.

## Express

\begin{figure}[H]
    \begin{center}
        \includegraphics[scale=0.3]{img/express.png}
    \end{center}
    \caption{Logo de Express}
\end{figure}

Express es un framework de desarrollo de aplicaciones web y APIs para Node.js

### Instalación

```
npm install express
```
### Principales utilidades

Nos facilita el manejo de:

* **Estáticos:** Ruta pública donde generalmente se alojan assets (CSS, imágenes, JS).

```
app.use(express.static(path.join(__dirname, 'public')));
```

* **Controladores:** Encargados de controlar las peticiones http.

```
app.post('/login', function(req, res) {});
```

* **Sesiones y cookies:**

```
app.use(express.cookieParser('your secret here'));
app.use(express.session());
```

## Angular

\begin{figure}[H]
    \begin{center}
        \includegraphics[scale=0.6]{img/angular.png}
    \end{center}
    \caption{Logo de angular}
\end{figure}

Angular es una plataforma open source de desarrollo de front-end desarrollado por Google. Está basado en componentes, que es una combinación de una plantilla HTML con un controlador.
 
Si bien está desarrollado con Javascript y permite el desarrollo con ES5 o superior, la comunidad de desarrolladores(incluyendo los responsables del proyecto de Google)  prefiere utilizar TypeScript.

\begin{figure}[H]
    \begin{center}
        \includegraphics[width=\textwidth]{img/aboutTypescript.png}
    \end{center}
    \caption{Google sobre TypeScript}
\end{figure}

### ¿Qué es un controlador?
```
@Component({
    selector: ‘my-app’,
    template: <h1>Hello {{name}}</h1>
})
```
Todos los componentes inician con el decorador @Component que describe cómo se comporta el componente.
Entre otras opciones, define como incluir el componente en una página HTML, mediante la propiedad selector; y como está estructurado visualmente mediante la propiedad template. En el ejemplo dado, si quisiéramos utilizar el componente en una página HTML se usaría el elemento `<my-app>`, y el componente se ve como la frase “Hello {{name}}” dentro de un elemento de de título 1.
 
En un desarrollo de mayor tamaño en lugar de definir la plantilla HTML en el propio componente, se usará la propiedad `templateUrl` para definir dónde buscar la plantilla HTML. De igual forma, se separarían los códigos CSS mediante la propiedad `styleUrls`.
Ejemplo:
```
@Component({
    selector: ‘my-app’,    
    templateUrl: 'nombre_del_archivo.html',
    styleUrls: ['nombre_del_archivo1.css', 'nombre_del_archivo2.css']
})
```
Siguiendo la trayectoria de AngularJs, precursor del actual Angular, conseguimos acceder a las propiedades del controlador mediante el uso de {{ nombre_variable }}. En este caso accederíamos a la propiedad `name`.
```
export class AppComponent { name = ‘Angular’; }
```
Define la clase del controlador.
En el caso de ejemplo, el controlador solo tiene la propiedad name, que contiene la cadena de texto “Angular”

## Angular CLI

\begin{figure}[H]
    \begin{center}
        \includegraphics[scale=0.3]{img/angular-cli.png}
    \end{center}
    \caption{Logo de angular-cli}
\end{figure}

Angular CLI es una herramienta utilizada para inicializar aplicaciones Angular, desarrollar componentes y para tareas de mantenimiento asociadas a ello.
 
### Instalacion:
```
npm install -g @angular/cli
```
### Comandos relevantes utilizados:

* ` 
ng new [nombre]
`
    
    Inicializa una nueva aplicación Angular con el nombre elegido.
* `
ng serve
`
    
    Transpila la aplicación y monta un servidor web.
* `
ng generate class [nombre]
`

    Genera una clase con el nombre escogido.
Una clase es una construcción que permite crear tipos personalizados mediante la agrupación de variables de otras clases y comportamientos comunes.

* `
ng generate component [nombre]
`
 
    Genera un componente con el nombre escogido.
* ` 
ng generate service [nombre]
`
 
    Genera un servicio con el nombre escogido.
 Un servicio es una función, con sus propiedades y métodos que puede ser incluida, mediante inyección de dependencias, en los componentes. Gracias a esto, se pueden desarrollar funciones para tareas específicas, como es la comunicación con el servidor. Permite reutilizar las funciones de forma rápida entre componentes, así como acceder a variables compartidas entre ellos.

## Bootstrap 4

\begin{figure}[H]
    \begin{center}
        \includegraphics[scale=0.15]{img/bootstrap4.png}
    \end{center}
    \caption{Logo de Bootstrap 4}
\end{figure}

Bootstrap es un framework de HTML, CSS y JavaScript para el desarrollo de front-end.
En su versión 4 incluye componentes de angular que utilizaremos en el presente proyecto.
 
### Instalación
`
npm install bootstrap@4.0.0-alpha.6
`

## MariaDB

\begin{figure}[H]
    \begin{center}
        \includegraphics[scale=0.75]{img/mariadb.png}
    \end{center}
    \caption{Logo de MariaDB}
\end{figure}

MariaDB es un sistema de gestión de bases de datos derivado de MySQL con licencia GPL (General Public License). Está desarrollado por Michael Widenius (fundador de MySQL) y la comunidad de desarrolladores de software libre. Surgío a partir de la compra de Sun Microsystems por parte de Oracle para asegurar la existencia de una versión de MySQL con licencia GPL.

### Instalación
```
sudo apt-get install software-properties-common
sudo apt-key adv --recv-keys --keyserver \
keyserver.ubuntu.com 0xF1656F24C74CD1D8
sudo add-apt-repository 'deb [arch=amd64] \
http://tedeco.fi.upm.es/mirror/mariadb/repo/10.2/debian stretch main'
sudo apt-get update
sudo apt-get install mariadb-server
```

### Ventajas de MariaDB frente MySQL

* **Nuevos motores de almacenamiento más eficientes:**

    Aria y XtraDB vienen a reemplazar a MyISAM e InnoDB respectivamente. Cabe destacar el mayor rendimiento de Aria, cuando recibe consultas complejas y tiene que realizar tablas temporales, éstas se cachean en memoria en vez de escribirlas en disco.
* **Estadísticas para índices y tablas:**

    Esto puede ayudar para la optimización de la base de datos. Se añaden nuevas tablas de sistema para recoger esta información.
* **Mejoras en el rendimiento y la eficiencia con respecto a MySQL:**

    Un ejemplo de esto es la eliminación o mejora de algunas conversiones no necesarias respecto a los juegos de caracteres.
* **Software libre:**

    MariaDB está respaldada por la comunidad de software libre.

### Desventajas de MariaDB frente MySQL

* **Coste migratorio:**

    En líneas generales, MySQL está más extendido, por lo que utilizar MariaDB suele acarrear un coste migratorio de los datos. Sin embargo, MariaDB asegura tener total compatibilidad. En este proyecto no nos afectará en absoluto.
