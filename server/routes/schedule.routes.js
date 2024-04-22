import express from "express";
import * as schedule from "../controllers/scheduleController.js";

const router = express.Router();

// Ruta para obtener los horarios de un estilista en un mes y año específico
router.get('/stylist/:stylistId', async (req, res) => {
    try {
        const { stylistId } = req.params;
        const { year, month } = req.query;

        const stylistSchedule = await schedule.getSchedulesByStylist(stylistId, year, month);
        res.json(stylistSchedule);
    } catch (error) {
        console.error('Error al obtener el horario:', error.message);
        res.status(500).json({ message: 'Error al obtener el horario' });
    }
});

// Ruta para crear un nuevo horario
router.post('/create', async (req, res) => {
    try {
        const { type, newSchedule } = req.body;

        let addedSchedule;

        if (type === 'Daily') {
            // Crear un nuevo horario diario
            addedSchedule = await schedule.createDailySchedule(newSchedule);
        } else if (type === 'Weekly') {
            // Crear un nuevo horario semanal
            addedSchedule = await schedule.createWeeklySchedule(newSchedule);
        }

        res.json(addedSchedule);
    } catch (error) {
        console.error('Error al crear el horario:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar un horario
router.delete('/delete/:scheduleId', async (req, res) => {
    try {
        const { scheduleId } = req.params;

        await schedule.deleteSchedule(scheduleId);
        res.json({ message: 'Horario eliminado' });
    } catch (error) {
        console.error('Error al eliminar el horario:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Ruta para actualizar un horario
router.put('/update', async (req, res) => {
    try {
        const updatedSchedule = req.body;

        const newSchedule = await schedule.updateSchedule(updatedSchedule);
        res.json(newSchedule);
    } catch (error) {
        console.error('Error al actualizar el horario:', error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;