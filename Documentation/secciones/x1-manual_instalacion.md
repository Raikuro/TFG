\chapter{ Manual de despliegue }

Para desplegar esta aplicación necesitamos:

* Un ordenador con un sistema operativo basado en UNIX con node y npm instalados
* Conexión a Internet(para descargar dependencias)
* El código fuente de la aplicación.
  
      Aunque se entrega en el CD, esta disponible en https://github.com/Raikuro/TFG

Pasos a realizar para desplegar:

1. **Modificar los ficheros de configuración:**

  Para entenderlos ficheros de configuración se explica la máquina en la que está actualmente desplegada la aplicación.

  La máquina es accesible mediante la dirección 'http://virtual.lab.inf.uva.es' en el puerto 20052.
  Debido a la configuración interna de la máquina, redirige el puerto interno 80 al puerto externo 20052 y el puerto 3000 al 20053. 

  Los ficheros que es necesario modificar son los siguientes:
    
  * backend/config/client.js:
```
const IP = 'http://virtual.lab.inf.uva.es'
const PORT = 20052 
exports.ADDRESS = IP + ':' + PORT
```
  Es necesario cambiar las constantes IP y PORT por la IP y el puerto desde el cual será accesible nuestro frontend.

  * frontend/.angular-cli.json:
```
...
"defaults": {
  "styleExt": "css",
    "component": {},
    "serve": {
      "host": "10.0.20.5",
      "port": 80
    }
  }
...
```
  Es necesario cambiar los parámetros host y port por la IP y el puerto interno en el que desplegaremos nuestro frontend

  * frontend/src/app/config/server.ts
```
const IP = "http://virtual.lab.inf.uva.es";
const PORT = 20053;
export const ADDRESS = IP + ":" + PORT
```
  Es necesario cambiar las constantes IP y PORT por la IP y el puerto desde el cual será accesible nuestro backend

2. **Instalar las dependencias:**

Se ejecutarán los siguientes comandos desde la raiz del CD
```
cd backend
npm install
cd frontend
npm install
```

3. **Desplegar:**

Se ejecutarán los siguientes comandos desde la raiz del CD para desplegar el frontend
```
cd frontend
npm start
```

Se ejecutarán los siguientes comandos desde la raiz del CD para desplegar el backend
```
cd backend
npm start
```
