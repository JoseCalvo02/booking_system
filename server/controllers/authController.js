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
            console.log('correo duplicado')
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

        return res.status(200).json({ message: 'Usuario creado exitosamente' });
    }
    catch(error){
        console.error("Error:", error);
        return res.status(500).json({ error: 'Error de servidor' });
    } finally {
        // Cierra la conexión a la base de datos
        await pool.close();
    }
}

// Función para loguearse al sistema
export const loginUser = async (req, res) => {
    const { email, password } = req.body; // Obtener el correo electrónico y la contraseña del cuerpo de la solicitud

    const pool = await sql.connect(db); // Crear una conexión a la base de datos

    try {
        // Verificar si el correo electrónico existe en la base de datos
        const emailCheckQuery = 'SELECT * FROM Clientes WHERE correo = @email';
        const emailCheckResult = await pool.request()
            .input('email', sql.VarChar(50), email)
            .query(emailCheckQuery);

        const user = emailCheckResult.recordset[0]; // Tomar el primer usuario encontrado (si existe)

        if (!user) {
            // Si el correo electrónico no existe en la base de datos, devolver un mensaje de correo no encontrado
            return res.status(400).json({ error: 'El correo electrónico no existe Por favor, crea una cuenta.' });
        }

        // Verificar si la contraseña coincide
        if (user.contraseña !== password) {
            // Si la contraseña no coincide, devolver un mensaje de contraseña incorrecta
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Verifica el estado del usuario
        if (user.estado !== 'Activo') {
            return res.status(400).json({ error: 'El usuario está inactivo. Contacta al administrador.' });
        }

        // Verificar los roles del usuario
        // Supongamos que los roles están almacenados en la tabla Roles con un campo nombreRol
        const rolesQuery = `SELECT r.nombreRol FROM Roles r 
                            INNER JOIN Clientes c ON c.rolID = r.rolID 
                            WHERE c.clienteID = @userID`;
        const rolesResult = await pool.request()
            .input('userID', sql.Int, user.clienteID)
            .query(rolesQuery);

        const userRoles = rolesResult.recordset.map(role => role.nombreRol);


        if (userRoles.includes('Administrador')) {
            // Si el usuario es administrador......
            // redirigir a una página de administrador
            return res.status(200).json({ message: 'Bienvenido administrador', roles: userRoles });
        } else if (userRoles.includes('Estilista')) {
            // Si el usuario es estilista....
            // redirigir a una página de estilista
            return res.status(200).json({ message: 'Bienvenido estilista', roles: userRoles });
        } else {
            // Si el usuario es solo cliente
            // redirigir a la pagina clientes
            return res.status(200).json({ message: 'Bienvenido cliente', roles: userRoles });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Error de servidor' });
    } finally {
        // Cierra la conexión a la base de datos
        await pool.close();
    }
}
