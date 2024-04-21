import express from "express";
import * as schedule from "../controllers/scheduleController.js";

const router = express.Router();

// Ruta para obtener los horarios de un estilista en un mes y año específico
router.get('/stylist/:stylistId', async (req, res) => {
    try {
        const { stylistId } = req.params;
        const { year, month } = req.query;
        console.log(year, month);
        // Obtener los horarios de un estilista en un mes y año específico
        const stylistSchedule = await schedule.getSchedulesByStylist(stylistId, year, month);
        res.json(stylistSchedule);
    } catch (error) {
        console.error('Error al obtener el horario:', error.message);
        res.status(500).json({ message: 'Error al obtener el horario' });
    }
});

export default router;