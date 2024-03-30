import express from "express";

import * as service from "../controllers/serviceController.js";

const router = express.Router();

// Definir rutas de services

// Obtener todos los servicios
router.get("/services", service.getAllServices);

// Obtener todos los cupones disponibles
router.get("/coupons", service.getAllCoupons);

// Obtener todas las citas de un cliente
router.get("/appointments", service.getAppointments);

// Cancelar una cita de un cliente
router.delete("/appointment/:appointmentID", service.cancelAppointment);

// Exportar las rutas
export default router;