import prisma from "../prisma/prisma.js";

// Función para obtener todas las citas que tenga estado 1 del usuario logueado
export const getAppointments = async (userId) => {
    try {
        // Obtener el ID del usuario
        userId = parseInt(userId);

        // Obtener todas las citas del usuario con estado 1
        const appointments = await prisma.Citas.findMany({
            where: {
                clienteID: userId,
                estadoID: 1
            },
            include: {
                HorariosReservados: true,
                DetallesCita: {
                    include: {
                        Servicios: true
                    }
                }
            }
        });

        // Obtener el nombre del estilista
        const appointmentsWithNames = await Promise.all(appointments.map(async (appointment) => {
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

        return appointmentsWithNames;
    } catch (error) {
        console.log(error);
        throw new Error(error);
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

// Función para obtener todas las citas getAllAppointments
export const getAllAppointments = async () => {
    try {
        const appointments = await prisma.Citas.findMany();

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

// Función para obtener todas las citas programadas
export const getAllPendingAppointments = async () => {
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

// Función para crear una cita
export const bookAppointment = async (appointmentData) => {
    try {
        // Inicia una transacción
        const appointment = await prisma.$transaction(async (prisma) => {
            // Obtener los datos de la cita
            const { clienteID, servicio, cupon, fecha, estilista, hora } = appointmentData;
            // Obtener el ID del servicio
            const serviceId = servicio.servicioID;
            // Verificar si existe un cupon
            const couponId = cupon ? cupon.cuponCanjeadoID : null;
            // Obtener el ID del estilista
            const stylistId = estilista;
            // Obtener la fecha y hora de la cita
            const appointmentDate = new Date(fecha);
            const [startTime, endTime] = hora.split('-');
            // Calcular los puntos a generar (10% del precio del servicio)
            const servicioPrecio = servicio.precio;
            const puntosGenerados = Math.floor(servicioPrecio * 0.1);

            // Crear la cita en la tabla Citas
            const appointment = await prisma.Citas.create({
                data: {
                    clienteID,
                    estilistaID: stylistId,
                    estadoID: 1,
                }
            });

            // Crear el horario reservado en la tabla HorariosReservados
            await prisma.HorariosReservados.create({
                data: {
                    citaID: appointment.citaID,
                    dia: appointmentDate,
                    horaInicio: startTime,
                    horaFinal: endTime,
                }
            });

            // Crear los detalles de la cita en la tabla DetallesCita
            await prisma.DetallesCita.create({
                data: {
                    citaID: appointment.citaID,
                    servicioID: serviceId,
                }
            });

            // Buscar el puntosID asociado al clienteID
            const puntosCliente = await prisma.PuntosClientes.findFirst({
                where: {
                    clienteID: clienteID
                }
            });

            // Generar puntos para el cliente en la tabla PuntosClientes
            await prisma.PuntosClientes.update({
                where: {
                    puntosID: puntosCliente.puntosID
                },
                data: {
                    puntosAcumulados: {
                        increment: puntosGenerados
                    },
                }
            });

            // Si hay un cupón, actualizar su estado a "Canjeado" en la tabla CuponesCanjeados
            if (couponId) {
                await prisma.CuponesCanjeados.update({
                    where: { cuponCanjeadoID: couponId },
                    data: { estado: "Canjeado" }
                });
            }

            // Devolver la cita creada
            return appointment;
        });

        return appointment;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}