# Metodología del Proyecto

En este documento se presentan los conceptos y metodologías utilizados en el desarrollo de este proyecto.

## Índice

- [Conceptos Generales](#conceptos-generales)
- [Conceptos del Servidor](#conceptos-del-servidor)
- [Conceptos del Cliente](#conceptos-del-cliente)

## Conceptos Generales

### API RESTful

Una API RESTful (Interfaz de Programación de Aplicaciones Representacional del Estado Transferido) es un estilo de arquitectura para el diseño de sistemas de software distribuido. En este proyecto, hemos adoptado este enfoque para la comunicación entre el cliente y el servidor. Las API RESTful utilizan los métodos HTTP estándar (GET, POST, PUT, DELETE, etc.) para realizar operaciones sobre recursos, lo que las hace altamente escalables y fáciles de entender.

### Enrutamiento

El enrutamiento se refiere al proceso de definir y gestionar las rutas dentro de una aplicación web. En este proyecto, utilizamos enrutamiento tanto en el lado del cliente como en el servidor para manejar las solicitudes de los usuarios y dirigirlas a las diferentes partes de la aplicación. En el lado del servidor, se utilizan bibliotecas como Express.js para definir las rutas, mientras que en el lado del cliente, se utiliza React Router para gestionar la navegación entre las diferentes vistas de la aplicación.

### ORM (Mapeo Objeto-Relacional)

El Mapeo Objeto-Relacional (ORM) es una técnica de programación que permite interactuar con bases de datos relacionales utilizando objetos del lenguaje de programación. En este proyecto, utilizamos Prisma como ORM para interactuar con la base de datos. Prisma nos permite definir modelos de datos utilizando objetos JavaScript y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la base de datos de una manera más intuitiva y segura.

## Conceptos del Servidor

### Express.js

Express.js es un framework web para Node.js que simplifica el proceso de creación de aplicaciones web. En este proyecto, utilizamos Express.js para manejar las solicitudes HTTP, definir las rutas de la aplicación y realizar otras tareas relacionadas con el servidor. Express.js proporciona una API simple y flexible que nos permite construir aplicaciones web robustas y escalables de manera eficiente.

### Prisma

Prisma es una herramienta ORM (Mapeo Objeto-Relacional) que facilita la interacción con la base de datos en aplicaciones Node.js. Utiliza un modelo de datos declarativo para definir la estructura de la base de datos y proporciona una interfaz intuitiva para realizar consultas y operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la base de datos. En este proyecto, utilizamos Prisma para modelar y gestionar los datos de la aplicación de manera eficiente y segura.

### CORS (Cross-Origin Resource Sharing)

CORS es un mecanismo de seguridad que permite que los recursos de una página web sean solicitados desde un dominio diferente al de la propia página. En este proyecto, utilizamos el middleware de Express.js para configurar la política CORS y permitir el acceso a los recursos del servidor desde el cliente, lo que facilita la comunicación entre el cliente y el servidor en entornos de desarrollo web distribuido.

### JWT (JSON Web Tokens)

JWT es un estándar abierto que define un método compacto y autónomo para transmitir información de forma segura entre dos partes como un objeto JSON. En este proyecto, utilizamos JWT para implementar la autenticación basada en tokens. Cuando un usuario se autentica correctamente en la aplicación, se le proporciona un token JWT que puede incluirse en las solicitudes posteriores para acceder a recursos protegidos en el servidor.

### Middleware

El middleware es una capa de software que actúa como intermediario entre el cliente y el servidor en una aplicación web. En Express.js, el middleware puede ejecutarse antes o después de que se maneje una solicitud y se utiliza para realizar tareas como el análisis de datos, la autenticación, la gestión de errores, etc. En este proyecto, utilizamos middleware de Express.js para agregar funcionalidades adicionales a la aplicación, como la validación de datos, el registro de solicitudes, etc.

## Conceptos del Cliente

### React.js

React.js es una biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas y reutilizables. En este proyecto, hemos adoptado React.js como la biblioteca principal para el desarrollo del cliente. React utiliza componentes reutilizables que encapsulan el comportamiento y la interfaz de usuario, lo que facilita la construcción de aplicaciones web modulares y escalables.

### Axios

Axios es una biblioteca de JavaScript utilizada para realizar solicitudes HTTP desde el cliente. En este proyecto, utilizamos Axios para comunicarnos con el servidor y enviar y recibir datos de forma asincrónica. Axios proporciona una interfaz simple y fácil de usar para realizar solicitudes HTTP, lo que simplifica la gestión de la comunicación entre el cliente y el servidor.

### React Router

React Router es una biblioteca de enrutamiento utilizada para gestionar la navegación en aplicaciones web de React. En este proyecto, utilizamos React Router para definir las rutas de la aplicación y renderizar componentes diferentes en función de la URL actual. React Router nos permite crear aplicaciones de una sola página (SPA) con múltiples vistas y proporciona una experiencia de usuario fluida y coherente.

### Tailwind CSS

Tailwind CSS es un framework de estilos utilitarios utilizado para diseñar interfaces de usuario modernas y receptivas. En este proyecto, hemos integrado Tailwind CSS para gestionar el diseño y la apariencia de la aplicación cliente. Tailwind CSS utiliza clases de utilidad predefinidas para aplicar estilos en línea, lo que facilita la creación de diseños flexibles y personalizables sin necesidad de escribir CSS personalizado.

### Formik

Formik es una biblioteca de gestión de formularios utilizada para facilitar la creación y validación de formularios en aplicaciones de React. En este proyecto, utilizamos Formik para gestionar el estado de los formularios, realizar validaciones de entrada y manejar eventos de envío. Formik proporciona una API intuitiva y flexible que simplifica el proceso de trabajo con formularios en React y mejora la experiencia del usuario.

### Vite

Vite es un entorno de desarrollo rápido para aplicaciones web de JavaScript y TypeScript. En este proyecto, utilizamos Vite como herramienta de compilación y servidor de desarrollo para el cliente. Vite ofrece tiempos de compilación instantáneos y una experiencia de desarrollo fluida, lo que mejora la productividad del desarrollador y acelera el proceso de desarrollo de aplicaciones web.