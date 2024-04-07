import express from "express";

import * as appt from "../controllers/apptController.js";

const router = express.Router();

// Obtener todas las citas de un cliente
router.get("/appointments/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const appointments = await appt.getAppointments(userId);

        res.status(200).json({appointments, message: "Citas cargadas exitosamente"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cancelar una cita de un cliente
router.delete("/appointment/:appointmentID", appt.cancelAppointment);

export default router;