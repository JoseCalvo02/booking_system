import express from "express";
import { getUsersByType, updateUserEmail } from "../controllers/userController.js";

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

// Ruta para que un administrador actualice el correo de un usuario
router.put("/:userId/email", async (req, res) => {
    try {
        const { userId } = req.params;
        const { newEmail } = req.body;
        // Llamar a la función para actualizar el correo electrónico de un usuario
        const { updatedUser, newToken  } = await updateUserEmail(userId, newEmail);
        res.status(200).json({ updatedUser, newToken, message: 'Correo electrónico actualizado'});
    } catch (error) {
        console.error("Error:", error);
        // Enviar mensajes específicos de error al frontend
        res.status(error.message === 'El correo electrónico ya está en uso' ? 400 : 500)
            .json({ error: error.message === 'El correo electrónico ya está en uso' ? 'El correo electrónico ya está en uso' : 'Error de servidor' });
    }
});

// Ruta para que un administrador actualice la dirección de un usuario
//router.put("/:userId/address", updateUserAddress);

export default router;