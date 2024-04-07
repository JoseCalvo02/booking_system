import express from "express";

import * as service from "../controllers/serviceController.js";

const router = express.Router();

// Definir rutas de services

// Obtener todos los servicios
router.get("/services", service.getAllServices);

// Actualizar un servicio
router.put("/services/:serviceID", async (req, res) => {
    try {
        const { serviceID } = req.params;
        const { nombreServicio, descripcion, tiempoEstimado, precio } = req.body;

        const updatedService = await service.updateService(serviceID, nombreServicio, descripcion, tiempoEstimado, precio);

        res.status(200).json({ updatedService, message: "Servicio actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todos los cupones disponibles
router.get("/coupons", service.getAllCoupons);

// Exportar las rutas
export default router;