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
export const getAppointments = async (userId) => {
    try {
        // Obtener el ID del usuario
        userId = parseInt(userId);

        const appointments = await prisma.$transaction(async (prisma) => {
            const appointments = await prisma.Citas.findMany({
                where: {
                    clienteID: userId,
                    estadoID: 1
                }
            });

            const appointmentsWithStylist = await Promise.all(appointments.map(async (appointment) => {
                const stylist = await prisma.Usuarios.findUnique({
                    where: {
                        usuarioID: appointment.estilistaID
                    }
                });
                return {
                    ...appointment,
                    nombreEstilista: stylist.nombre
                };
            }));
            return appointmentsWithStylist;
        });

        // Enviar respuesta
        return appointments;
    }
    catch (error) {
        throw new Error('Error de servidor:', error);
    }
}

//Crear funcion para cancelar una cita cancelAppointment
export const cancelAppointment = async (req, res) => {
    try {
        // Obtener el ID de la cita
        const appointmentID = parseInt(req.params.appointmentID);
        // Actualizar la cita
        const appointment = await prisma.Citas.update({
            where: {
                citaID: appointmentID
            },
            data: {
                estadoID: 3
            }
        });
        // Enviar respuesta
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}