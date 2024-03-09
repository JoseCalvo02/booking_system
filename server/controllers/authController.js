import { validationResult } from "express-validator"; // Importar la función de validación de la biblioteca express-validator
import jwt from "jsonwebtoken"; // Importar la biblioteca jsonwebtoken para generar tokens de acceso
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

        let nuevoUsuario;
        // Inicia la transacción prisma para crear todas las tablas relacionadas
        await prisma.$transaction(async (tx) => {
             // Crea un nuevo usuario
             nuevoUsuario = await tx.Usuarios.create({
                data: {
                    nombre: name,
                    apellidos: lastName,
                    telefono: phone,
                    correo: email,
                    direccion: address,
                    contra: password,
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

        // Verificar si la contraseña coincide
        if (user.contra !== password) {
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

        // Genera el token JWT con la información del usuario y la clave secreta del archivo .env
        const token = jwt.sign({ userId: user.id, nombre: user.name, email: user.correo, role: roleName.nombreRol }, process.env.JWT_SECRET);

        // Devuelve el token con la información del usuario
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}
