import prisma from '../prisma/prisma.js';

// Función para obtener los horarios de un estilista en un mes y año específico
export const getSchedulesByStylist = async (stylistId, year, month) => {
    try {
        stylistId = parseInt(stylistId);
        const startOfMonth = new Date(Date.UTC(year, month - 1, 1)).toISOString();
        const endOfMonth = new Date(Date.UTC(year, month, 0)).toISOString();

        // Obtener los horarios de un estilista en un mes y año específico
        const schedule = await prisma.Horarios.findMany({
            where: {
                estilistaID: stylistId,
                fecha: {
                    gte: startOfMonth,
                    lte: endOfMonth,
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
        const dateOnly = schedule.fecha.substring(0, 10);

        // Verificar si ya existe un horario para la fecha proporcionada
        const existingSchedule = await prisma.Horarios.findFirst({
            where: {
                estilistaID: schedule.estilistaID,
                fecha: {
                    equals: new Date(dateOnly),
                },
            },
        });

        // Si ya existe un horario para la fecha proporcionada, lanzar un error
        if (existingSchedule) {
            throw new Error('Ya existe un horario de esta estilista para este día.');
        }

        const newSchedule = await prisma.Horarios.create({
            data: {
                estilistaID: schedule.estilistaID,
                fecha: new Date(schedule.fecha),
                diaSemana: schedule.dia,
                horaInicio: schedule.horaInicio,
                horaFinal: schedule.horaFinal,
                esDiaLibre: false
            }
        });

        // Enviar respuesta
        return newSchedule;
    } catch (error) {
        console.error('Error al crear el horario:', error.message);
        throw new Error(error.message);
    }
}

// Función para crear un nuevo horario semanal


// Función para eliminar un horario
export const deleteSchedule = async (scheduleId) => {
    try {
        scheduleId = parseInt(scheduleId);
        const schedule = await prisma.Horarios.delete({
            where: {
                horarioID: scheduleId
            }
        });

        // Enviar respuesta
        return schedule;
    } catch (error) {
        console.error('Error al eliminar el horario:', error.message);
        throw new Error(error.message);
    }
}

// Función para actualizar un horario
export const updateSchedule = async (schedule) => {
    try {
        const updatedSchedule = await prisma.Horarios.update({
            where: {
                horarioID: schedule.horarioID
            },
            data: {
                horaInicio: schedule.horaInicio,
                horaFinal: schedule.horaFinal
            }
        });

        // Enviar respuesta
        return updatedSchedule;
    } catch (error) {
        console.error('Error al actualizar el horario:', error.message);
        throw new Error(error.message);
    }
}