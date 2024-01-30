import express from "express";
import { PORT } from "./config/config.js";
import {dbConfig} from "./config/dbConfig.js";
import sql from "mssql";

const app = express();

app.listen(PORT);
console.log(`Server is listening on port  ${PORT}`);
sql.connect(dbConfig).then(() =>{console.log('Conexion exitosa')}).catch((console.error('Error al conectarse')));
