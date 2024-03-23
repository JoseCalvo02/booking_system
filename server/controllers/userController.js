import prisma from '../prisma/prisma.js';
import { generateNewToken } from '../utils/jwtService.js';

// Función genérica para obtener usuarios por tipo
export const getUsersByType = async (type) => {
    let roleId;
    switch(type) {
        case 'clients':
            roleId = 3;
            break;
        case 'stylists':
            roleId = 2;
            break;
        default:
            throw new Error('Tipo de usuario no válido');
    }
    try {
        const users = await prisma.Usuarios.findMany({
            where: {
                rolID: roleId
            }
        });
        return users;
    } catch(error) {
        console.error("Error:", error);
        throw new Error('Error de servidor');
    }
};

// Función para actualizar el correo electrónico de un usuario
export const updateUserEmail = async (userId, newEmail) => {
    try {
        // Convertir userId a tipo Int si es una cadena
        userId = parseInt(userId);

        // Validar que el correo no exista
        const existingUser = await prisma.Usuarios.findUnique({
            where: {
                correo: newEmail
            }
        });
        if(existingUser) {
            throw new Error('El correo electrónico ya está en uso');
        }

        // Actualizar el correo del usuario
        const updatedUser = await prisma.Usuarios.update({
            where: {
                usuarioID: userId
            },
            data: {
                correo: newEmail
            }
        });

        // Generar un nuevo token con los datos actualizados del usuario
        const newToken = await generateNewToken(updatedUser);

        return { updatedUser, newToken };
    } catch(error) {
        console.error("Error:", error);
        // Enviar mensajes específicos de error al frontend
        throw new Error(error.message === 'El correo electrónico ya está en uso' ? 'El correo electrónico ya está en uso' : 'Error de servidor');
    }
};