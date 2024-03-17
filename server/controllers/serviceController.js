import prisma from "../prisma/prisma.js"; // Importar el Prisma Client

//Crear funcion para obtener todos los servicios getAllServices
export const getAllServices = async (req, res) => {
    try {
        // Obtener todos los servicios
        const services = await prisma.Servicios.findMany();
        // Enviar respuesta
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}