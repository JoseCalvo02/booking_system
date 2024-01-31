// Dependencias
import express from "express";
import sql from "mssql";
import morgan from "morgan";

import { PORT } from "./config/config.js";
import { dbConfig } from "./config/dbConfig.js";

// Rutas
import authRoutes from "./routes/authRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();

// Configurar Morgan como middleware para el registro de solicitudes
app.use(morgan("dev"));

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