import prisma from "../prisma/prisma.js";

// Función para obtener todas las citas que tenga estado 1 del usuario logueado getAppointments
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

// Función para cancelar una cita cancelAppointment
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