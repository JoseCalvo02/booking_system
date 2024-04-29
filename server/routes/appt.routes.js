import express from "express";

import * as appt from "../controllers/apptController.js";

const router = express.Router();

router.get("/appointments/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const appointments = await appt.getAppointments(userId);

        res.status(200).json({ appointments, message: "Citas cargadas exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Cancelar una cita de un cliente
router.delete("/appointment/:appointmentID", appt.cancelAppointment);

// Obtener las estadísticas de las citas del mes actual
router.get("/stats/:date", async (req, res) => {
    try {
        const { date } = req.params;

        const stats = await appt.getApptsStats(date);

        res.status(200).json({stats, message: "Estadísticas cargadas exitosamente"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todas las citas
router.get("/all", async (req, res) => {
    try {
        const appointments = await appt.getAllAppointments();

        res.status(200).json({appointments, message: "Citas cargadas exitosamente"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todas las citas programadas
router.get("/all/pending", async (req, res) => {
    try {
        const appointmentsWithNames = await appt.getAllPendingAppointments();

        res.status(200).json({appointmentsWithNames, message: "Citas cargadas exitosamente"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para crear una cita
router.post("/create/appoitnment", async (req, res) => {
    try {
        const appointmentData = req.body;
        const appointment = await appt.bookAppointment(appointmentData);

        res.status(200).json({ appointment, message: "Cita creada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Exportar el router
export default router;