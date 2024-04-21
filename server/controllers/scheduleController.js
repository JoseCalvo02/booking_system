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