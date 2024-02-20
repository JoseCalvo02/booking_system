import { validationResult } from "express-validator";
import sql from "mssql";

import { dbConfig } from "../config/dbConfig.js";

// Función para crear un nuevo usuario en la base de datos
export const createUser = async (req, res) => {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuración del objeto req.body para obtener los datos del usuario
    const {name, lastName, phone, email, address, password} = req.body;

    const rolClient = 3;
    const earnedPoints = 0;
    const redeemedPoints = 0;
    const statusClient = "Activo";

    // Crea un nuevo objeto Pool de mssql utilizando la configuración de conexión
    const pool = await sql.connect(dbConfig);

    try{
        // Verifica si ya existe un usuario con el mismo correo electrónico
        const emailCheckQuery = 'SELECT COUNT(*) AS count FROM Clientes WHERE correo = @email';
        const emailCheckResult = await pool.request()
                                            .input('email', sql.VarChar(50), email) //input nos envia los parametros de entrada al query
                                            .query(emailCheckQuery); // ejecuta la consulta SQL
        const existingEmailCount = emailCheckResult.recordset[0].count;
        if (existingEmailCount > 0) {
            // Si ya existe un usuario con el mismo correo electrónico, devuelve un error
            return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
        }

        // Consulta SQL para ingresar un usuario nuevo
        const insertUserQuery = `INSERT INTO Clientes (nombre, apellidos, correo, telefono, direccion, puntosGanados, puntosCanjeados, contraseña, rolID, estado) 
                                 VALUES (@name, @lastName, @email, @phone, @address, @earnedPoints, @redeemedPoints, @password, @rolClient, @statusClient)`;

        // Ejecuta la consulta SQL con los parámetros proporcionados
        await pool.request()
            .input('name', sql.VarChar(50), name)
            .input('lastName', sql.VarChar(50), lastName)
            .input('email', sql.VarChar(50), email)
            .input('phone', sql.VarChar(50), phone)
            .input('address', sql.VarChar(150), address)
            .input('earnedPoints', sql.Int, earnedPoints)
            .input('redeemedPoints', sql.Int, redeemedPoints)
            .input('password', sql.VarChar(50), password)
            .input('rolClient', sql.Int, rolClient)
            .input('statusClient', sql.VarChar(15), statusClient)
            .query(insertUserQuery);

        // Cierra la conexión a la base de datos
        await pool.close();

        return res.status(200).json({ message: 'Usuario creado exitosamente' });
    }
    catch(error){
        console.error("Error:", error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}
