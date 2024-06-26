import { validationResult } from "express-validator"; // Importar la función de validación de la biblioteca express-validator
import bcrypt from "bcrypt"; // Importar la biblioteca bcrypt para encriptar contraseñas

import prisma from "../prisma/prisma.js"; // Importar el Prisma Client
import { generateNewToken } from "../utils/jwtService.js"; // Importar la función para generar un nuevo token JWT

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

        // Generar un salt único para el password del usuario
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);

        // Inicia la transacción prisma para crear todas las tablas relacionadas
        await prisma.$transaction(async (tx) => {
            // Crea un nuevo usuario
            const nuevoUsuario = await tx.Usuarios.create({
                data: {
                    nombre: name,
                    apellidos: lastName,
                    telefono: phone,
                    correo: email,
                    direccion: address,
                    contra: hashedPassword,
                    rolID: 3, // (3) Rol de cliente
                    estado: "Activo"
                }
            });

            // Crea un registro en la tabla PuntosClientes
            await tx.PuntosClientes.create({
                data: {
                    clienteID: nuevoUsuario.usuarioID, // Asigna el ID del nuevo usuario
                    puntosAcumulados: 0, // Puntos iniciales
                    puntosCanjeados: 0
                }
            });

            // Crea un registro en la tabla BitacoraCliente
            await tx.BitacoraCliente.create({
                data: {
                    clienteID: nuevoUsuario.usuarioID, // Asigna el ID del nuevo usuario
                    fechaRegistro: new Date() // Fecha actual
                }
            });
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

        // Verificar si la contraseña coincide utilizando bcrypt
        const passwordMatch = await bcrypt.compare(password, user.contra);
        if (!passwordMatch) {
            // Si la contraseña no coincide, devolver un mensaje de contraseña incorrecta
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Verifica el estado del usuario
        if (user.estado !== 'Activo') {
            return res.status(400).json({ error: 'El usuario está inactivo. Contacta al administrador.' });
        }

        const token = await generateNewToken(user);

        // Devuelve el token con la información del usuario
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}
