import prisma from '../prisma/prisma.js';

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