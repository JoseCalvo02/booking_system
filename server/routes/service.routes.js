import express from "express";

import * as service from "../controllers/serviceController.js";

const router = express.Router();

// Definir rutas de services

// Obtener todos los servicios
router.get("/services", service.getAllServices);

// Exportar las rutas
export default router;