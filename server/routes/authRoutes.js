import express from "express";

const router = express.Router();

// Definir rutas de autenticación
router.post("/register", (req, res) => {
    // Lógica para registrar un nuevo usuario
});

router.post("/login", (req, res) => {
    // Lógica para iniciar sesión
});

// Exportar las rutas
export default router;