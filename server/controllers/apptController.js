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

// Función para obtener las estadísticas de las citas del mes actual getApptsStats
export const getApptsStats = async (date) => {
    try {
        // Obtener el año y mes actual
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth() + 1;
        const day = new Date(date).getUTCDate();

        // Obtener las citas del mes actual
        const stats = await prisma.$transaction(async (prisma) => {
            const appointments = await prisma.HorariosReservados.findMany({
                where: {
                    dia: {
                        gte: new Date(Date.UTC(year, month - 1, 1)),
                        lt: new Date(Date.UTC(year, month, 0))
                    }
                }
            });

            const stats = {
                citasDelMes: appointments.length,
                citasPasadas: appointments.filter((appointment) => {
                    return appointment.dia.getUTCDate() < day;
                }).length,
                citasHoy: appointments.filter((appointment) => {
                    return appointment.dia.getUTCDate() === day;
                }).length,
                citasFuturas: appointments.filter((appointment) => {
                    return appointment.dia.getUTCDate() > day;
                }).length
            };
            return stats;
        });

        return stats;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Función para obtener todas las citas programadas
export const getAllAppointments = async () => {
    try {
        const appointments = await prisma.Citas.findMany({
            where: {
                estadoID: 1
            }
        });

        // dame el nombre del cliente y del estilista
        const appointmentsWithNames = await Promise.all(appointments.map(async (appointment) => {
            const client = await prisma.Usuarios.findUnique({
                where: {
                    usuarioID: appointment.clienteID
                }
            });
            const stylist = await prisma.Usuarios.findUnique({
                where: {
                    usuarioID: appointment.estilistaID
                }
            });

            return {
                ...appointment,
                nombreCliente: client.nombre,
                nombreEstilista: stylist.nombre
            };
        }));

        return appointmentsWithNames;
    }
    catch (error) {
        throw new Error(error);
    }
}