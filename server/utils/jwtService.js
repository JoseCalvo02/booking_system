import prisma from '../prisma/prisma.js';
import jwt from 'jsonwebtoken';

// Función para generar un nuevo token JWT con los datos actualizados del usuario
export const generateNewToken = async (user) => {
    // Define la duración del token en segundos
    const expiresIn = 3600; // 1h

    // Obtiene el nombre del rol del usuario utilizando la relación inversa
    const roleName = await prisma.Roles.findFirst({
        where: {
            rolID: user.rolID
        },
        select: {
            nombreRol: true
        }
    });

    // Obtiene los puntos acumulados y canjeados del usuario
    const userPoints = await prisma.PuntosClientes.findFirst({
        where: {
            clienteID: user.usuarioID
        },
        select: {
            puntosAcumulados: true,
            puntosCanjeados: true
        }
    });

    // Genera el token JWT con la información actualizada del usuario y la clave secreta del archivo .env
    const token = jwt.sign({
        userId: user.usuarioID,
        name: user.nombre,
        lastName: user.apellidos,
        email: user.correo,
        role: roleName.nombreRol,
        address: user.direccion,
        phone: user.telefono,
        userPoints: userPoints
    }, process.env.JWT_SECRET, { expiresIn });

    return token;
};