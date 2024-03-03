import { validationResult } from "express-validator"; // Importar la función de validación de la biblioteca express-validator

import prisma from "../db/db.js"; // Importar el Prisma Client

// Función para crear un nuevo usuario en la base de datos
export const createUser = async (req, res) => {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuración del objeto req.body para obtener los datos del usuario
    const {name, lastName, phone, email, address, password} = req.body;

    try{
        // Verifica si ya existe un usuario con el mismo correo electrónico
        const existingUser = await prisma.Usuarios.findFirst({
            where: {
                correo: email
            }
        });
        if (existingUser) {
            console.log('correo duplicado');
            return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
        }

        // Crea un nuevo usuario utilizando Prisma
        await prisma.Usuarios.create({
            data: {
                nombre: name,
                apellidos: lastName,
                correo: email,
                telefono: phone,
                direccion: address,
                puntosGanados: 0,
                puntosCanjeados: 0,
                contrase_a: password,
                rolID: 3,
                estado: "Activo"
            }
        });

        return res.status(200).json({ message: 'Usuario creado exitosamente' });
    }
    catch(error){
        console.error("Error:", error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}

// Función para loguearse al sistema
export const loginUser = async (req, res) => {
    const { email, password } = req.body; // Obtener el correo electrónico y la contraseña del cuerpo de la solicitud

    try {
        // Busca el usuario por su correo electrónico
        const user = await prisma.Usuarios.findFirst({
            where: {
                correo: email
            }
        });

        if (!user) {
            // Si el correo electrónico no existe en la base de datos, devolver un mensaje de correo no encontrado
            return res.status(400).json({ error: 'El correo electrónico no existe Por favor, crea una cuenta.' });
        }

        // Verificar si la contraseña coincide
        if (user.contrase_a !== password) {
            // Si la contraseña no coincide, devolver un mensaje de contraseña incorrecta
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Verifica el estado del usuario
        if (user.estado !== 'Activo') {
            return res.status(400).json({ error: 'El usuario está inactivo. Contacta al administrador.' });
        }

        // Obtiene el nombre del rol del usuario utilizando la relación inversa
        const roleName = await prisma.Roles.findUnique({
            where: {
                rolID: user.rolID
            },
            select: {
                nombreRol: true
            }
        });

        // Retorna un mensaje de bienvenida basado en el rol del usuario
        if (roleName && roleName.nombreRol === 'Administrador') {
            return res.status(200).json({ message: 'Bienvenido administrador', role: 'Administrador' });
        } else if (roleName && roleName.nombreRol === 'Estilista') {
            return res.status(200).json({ message: 'Bienvenido estilista', role: 'Estilista' });
        } else {
            return res.status(200).json({ message: 'Bienvenido cliente', role: 'Cliente' });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}
