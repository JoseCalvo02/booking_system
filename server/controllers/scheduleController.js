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
                    gte: new Date(year, month - 1, 1), // Fecha mayor o igual al primer día del mes y año especificados
                    lt: new Date(year, month, 1) // Fecha menor que el primer día del mes siguiente al mes y año especificados
                }
            }
        });
        console.log(schedule);

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
                horaFinal: schedule.horaFin,
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