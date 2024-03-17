import prisma from '../prisma/prisma.js';

export const getAllClients = async (req, res) => {
    try {
        const clients = await prisma.Usuarios.findMany({
            where: {
                rolID: 3
            }
        });
        return res.status(200).json(clients);
    }
    catch(error){
        console.error("Error:", error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}

//funcion para extraer los usuarios con el id 2
export const getAllStylists = async (req, res) => {
    try {
        const stylists = await prisma.Usuarios.findMany({
            where: {
                rolID: 2
            }
        });
        return res.status(200).json(stylists);
    }
    catch(error){
        console.error("Error:", error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}