// Dependencias
import express from "express";
import cors from "cors";
import sql from "mssql";
import morgan from "morgan";

import { dbConfig } from "./config/dbConfig.js";

// Rutas
import authRoutes from "./routes/auth.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import serviceRoutes from "./routes/service.routes.js";

const PORT = 3000;

const app = express();

//Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Para analizar el cuerpo de la solicitud en formato JSON
app.use(morgan("dev")); // Morgan como middleware para el registro de solicitudes

// Intenta conectarte a la base de datos una vez que el servidor esté en marcha
sql.connect(dbConfig)
    .then(() => {
        console.log('Conexión exitosa');
    })
    .catch(error => {
        console.error('Error al conectarse:', error);
    });

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Definición de rutas de la aplicación
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/services", serviceRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});