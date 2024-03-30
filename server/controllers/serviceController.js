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

//Crear funcion para obtener todos los cupones getAllCoupons y mostrar solo los cupones Activos
export const getAllCoupons = async (req, res) => {
    try {
        // Obtener todos los cupones
        const coupons = await prisma.Cupones.findMany({
            where: {
                estado: "Activo"
            }
        });
        // Enviar respuesta
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Crear funcion para obtener todas las citas que tenga estado 1 del usuario logueado getAppointments
export const getAppointments = async (req, res) => {
    try {
        // Obtener el usuario logueado
        const usuarioID = req.user.usuarioID;
        // Obtener todas las citas del usuario
        const appointments = await prisma.Citas.findMany({
            where: {
                usuarioID: usuarioID,
                estadoID: 1
            }
        });

        // obtener el nombre del estilista
        for (let i = 0; i < appointments.length; i++) {
            const estilista = await prisma.Usuarios.findUnique({
                where: {
                    usuarioID: appointments[i].estilistaID
                }
            });
            appointments[i].estilista = estilista.nombre;
        }
        

        // Enviar respuesta
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
