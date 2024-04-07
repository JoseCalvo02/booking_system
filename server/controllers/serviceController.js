import prisma from "../prisma/prisma.js"; // Importar el Prisma Client

// Función para obtener todos los servicios
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

// Función para actualizar un servicio updateService
export const updateService = async (serviceID, nombreServicio, descripcion, tiempoEstimado, precio) => {
    try {
        // Convertir los datos a números enteros
        serviceID = parseInt(serviceID);
        precio = parseInt(precio);

        // Actualizar el servicio
        const updatedService = await prisma.Servicios.update({
            where: {
                servicioID: serviceID
            },
            data: {
                nombreServicio,
                descripcion,
                tiempoEstimado,
                precio
            }
        });
        // Enviar respuesta
        return updatedService;
    } catch (error) {
        throw new Error(error);
    }
}
