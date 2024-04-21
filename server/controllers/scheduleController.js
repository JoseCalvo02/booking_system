import prisma from '../prisma/prisma.js';

// Función para obtener los horarios de un estilista en un mes y año específico
export const getSchedulesByStylist = async (stylistId, year, month) => {
    try {
        stylistId = parseInt(stylistId);

        // Obtener los horarios de un estilista en un mes y año específico
        const schedule = await prisma.Horarios.findMany({
            where: {
                estilistaID: stylistId,
                fecha: {
                    gte: new Date(year, month - 1, 1),
                    lt: new Date(year, month, 1)
                }
            }
        });

        // Enviar respuesta
        return schedule;
    } catch (error) {
        console.error('Error al obtener el horario:', error.message);
        throw new Error('Error al obtener el horario: ' + error.message);
    }
}

// Función para crear un nuevo horario diario
export const createDailySchedule = async (schedule) => {
    try {
        console.log(schedule);

        const newSchedule = await prisma.Horarios.create({
            data: {
                estilistaID: schedule.estilistaID,
                fecha: schedule.fecha,
                diaSemana: schedule.dia,
                horaInicio: schedule.horaInicio,
                horaFinal: schedule.horaFin,
                esDiaLibre: false
            }
        });

        // Enviar respuesta
        return newSchedule;
    } catch (error) {
        console.error('Error al crear el horario:', error.message);
        throw new Error('Error al crear el horario: ' + error.message);
    }
}