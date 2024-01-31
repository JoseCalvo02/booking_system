import express from "express";

const router = express.Router();

// Definir rutas de servicios
router.get("/", (req, res) => {
    // Lógica para obtener todos los servicios disponibles en el salón
});

router.get("/:id", (req, res) => {
    // Lógica para obtener un servicio específico por su ID
});

router.post("/", (req, res) => {
    // Lógica para crear un nuevo servicio
});

router.put("/:id", (req, res) => {
    // Lógica para actualizar un servicio existente por su ID
});

router.delete("/:id", (req, res) => {
    // Lógica para eliminar un servicio por su ID
});

// Exportar las rutas
export default router;