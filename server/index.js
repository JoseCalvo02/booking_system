// Dependencias
import express from "express";
import cors from "cors";
import morgan from "morgan";

// Importar el Prisma Client
import prisma from './db/db.js';

// Rutas
import authRoutes from "./routes/auth.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import serviceRoutes from "./routes/service.routes.js";

const PORT = 3000; // Puerto en el que se ejecutará el servidor

const app = express(); // Crear una instancia de la aplicación Express

//Middlewares
app.use(cors()); // Middleware de CORS para permitir solicitudes desde cualquier origen
app.use(express.json()); // Para analizar el cuerpo de la solicitud en formato JSON
app.use(morgan("dev")); // Morgan como middleware para el registro de solicitudes

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Intenta conectar a la base de datos una vez que el servidor esté en marcha
prisma.$connect()
  .then(() => {
    console.log('Conexión exitosa');
    return prisma.$disconnect(); // Desconectar la conexión una vez verificado
  })
  .catch(error => {
    console.error('Error al conectarse:', error);
  });

// Definición de rutas de la aplicación
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/services", serviceRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});