# Guía para Crear un Proyecto MERN
Esta guía proporciona instrucciones detalladas sobre cómo se creo el proyecto utilizando una estructura de directorios separada para el cliente y el servidor.

## Pasos para Crear el Proyecto
### 1. Crear la estructura del proyecto ==========> 1 <==========
Ejecutar el siguiente comando para crear un proyecto Vite en la carpeta "client":
```bash
npm create vite@latest client
```

#### Explicación de Vite:
- **Vite**: Un constructor de proyectos web rápido y flexible que utiliza ESM (ECMAScript Modules) nativo para una carga rápida en el desarrollo. Es especialmente adecuado para proyectos de React y Vue.js, y proporciona un servidor de desarrollo con recarga en caliente y una compilación optimizada para producción.

### 2. Instalar dependencias del cliente ==========> 2 <==========
Dentro de la carpeta "client", ejecutar:
```bash
cd client
npm install
```

### 3. Inicializar el proyecto del servidor ==========> 3 <==========
En la carpeta raíz del proyecto, ejecutar:
```bash
npm init -y
```

### 4. Instalar dependencias del servidor ==========> 4 <==========
Crear y dentro de la carpeta "server", ejecutar:
```bash
cd server
npm i express mysql2 nodemon morgan
```

#### Explicación de las dependencias del servidor:

- **Express.js**: Un marco de aplicación web rápido, minimalista y flexible para Node.js. Es muy utilizado para crear APIs RESTful y aplicaciones web.
- **mysql2**: Un controlador MySQL para Node.js. Permite conectarse a una base de datos MySQL y realizar consultas desde una aplicación Node.js.
- **Nodemon**: Una utilidad que monitoriza los cambios en los archivos de tu aplicación y automáticamente reinicia el servidor. Es muy útil durante el desarrollo para evitar tener que reiniciar manualmente el servidor después de cada cambio.
- **Morgan**: Un middleware de registro de solicitudes HTTP para Express.js. Registra información sobre las solicitudes HTTP entrantes, como el método, la URL, el código de estado, el tiempo de respuesta, etc. Es útil para el análisis y la depuración de solicitudes.

### 5. Configurar Tailwind CSS en el cliente ==========> 5 <==========
Dentro de la carpeta "client", ejecutar los siguientes comandos:
```bash
npm i tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
#### Explicación de Tailwind CSS, PostCSS y Autoprefixer:
- **Tailwind CSS**: Un framework de utilidad de CSS de bajo nivel para construir rápidamente interfaces de usuario personalizadas. En lugar de proporcionar componentes prediseñados, Tailwind CSS ofrece clases utilitarias que se aplican directamente en el HTML para estilizar los elementos de la interfaz de usuario.
- **PostCSS**: Un procesador de CSS que transforma CSS con JavaScript y plugins. Se utiliza para optimizar y transformar el CSS, y puede integrarse con herramientas como Tailwind CSS para proporcionar una experiencia de desarrollo más avanzada.
- **Autoprefixer**: Un complemento de PostCSS que agrega prefijos de proveedores automáticamente a las reglas CSS, asegurando la compatibilidad con varios navegadores.

### 6. Instalar otras dependencias del cliente ==========> 6 <==========
Aún dentro de la carpeta "client", ejecutar:
```bash
npm i react react-dom axios react-icons react-router-dom@latest
```

#### Explicación de las dependencias del cliente:
- **React**: Una biblioteca de JavaScript para construir interfaces de usuario. React permite crear componentes reutilizables que representan partes de la interfaz de usuario de una aplicación web.
- **React-DOM**: La interfaz de DOM para React. Es la biblioteca que permite a React interactuar con el DOM del navegador.
- **Axios**: Un cliente HTTP basado en promesas para el navegador y Node.js. Se utiliza para realizar solicitudes HTTP desde el cliente a un servidor.
- **React-Icons**: Una biblioteca que proporciona iconos de varias fuentes (como Font Awesome, Material Icons, etc.) como componentes React.
- **React-Router-DOM**: Una biblioteca que proporciona enrutamiento para aplicaciones web de React. Permite definir rutas y vincularlas a componentes específicos en una aplicación de React.

### 7. Editar el package.json en la raíz del proyecto ==========> 7 <==========
Añadir los scripts necesarios en el archivo package.json en la raíz del proyecto para poder ejecutar el servidor y el cliente.
```json
{
  "name": "mern_project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "Tu Nombre",
  "license": "ISC",
  "scripts": {
    "start": "node server/index.js",
    "client": "npm run dev --prefix client",
    "server": "npm start --prefix server"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

### 8. Ejecutar el Proyecto ==========> 8 <==========
Desde la raíz del proyecto, ejecutar los siguientes comandos para iniciar el servidor y el cliente:
```bash
npm run server   # Para iniciar el servidor
npm run client   # Para iniciar el cliente
```