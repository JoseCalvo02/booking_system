import express from "express";

import * as service from "../controllers/serviceController.js";

const router = express.Router();

// Definir rutas de services

// Obtener todos los servicios
router.get("/services", service.getAllServices);

// Actualizar un servicio
router.put("/editService", async (req, res) => {
    try {
        const { servicioID, nombreServicio, descripcion, tiempoEstimado, precio } = req.body;

        const updatedService = await service.updateService(servicioID, nombreServicio, descripcion, tiempoEstimado, precio);

        res.status(200).json({ updatedService, message: "Servicio actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo servicio
router.post("/services", async (req, res) => {
    try {
        const { nombreServicio, descripcion, tiempoEstimado, precio } = req.body;

        const newService = await service.createService(nombreServicio, descripcion, tiempoEstimado, precio);

        res.status(201).json({ newService, message: "Servicio creado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un servicio
router.delete("/services/:serviceID", async (req, res) => {
    try {
        const { serviceID } = req.params;

        await service.deleteService(serviceID);

        res.status(200).json({ message: "Servicio eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Exportar las rutas
export default router;