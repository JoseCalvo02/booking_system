import express from "express";
import { getUsersByType } from "../controllers/userController.js";

const router = express.Router();

// Ruta para obtener todos los usuarios por tipo
router.get("/:type", async (req, res) => {
    try {
        const { type } = req.params;
        const users = await getUsersByType(type);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error de servidor' });
    }
});

export default router;