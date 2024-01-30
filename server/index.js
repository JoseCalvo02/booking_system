import express from "express";
import { PORT } from "./config/config.js";
import {dbConfig} from "./config/dbConfig.js";
import sql from "mssql";

const app = express();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    // Intenta conectarte a la base de datos una vez que el servidor esté en marcha
    sql.connect(dbConfig)
        .then(() => {
            console.log('Conexión exitosa');
        })
        .catch(error => {
            console.error('Error al conectarse:', error); // Corrección aquí: error en lugar de console.error('Error al conectarse')
        });
});