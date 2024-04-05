import express from "express";
import { getUsersByType, updateUserEmail, updateUserAddress, updateUserPhone, desactivateUser } from "../controllers/userController.js";


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
        const newToken = await updateUserEmail(userId, newEmail);
        res.status(200).json({ newToken, message: 'Correo electrónico actualizado'});
    } catch (error) {
        console.error("Error:", error);
        // Enviar mensajes específicos de error al frontend
        res.status(error.message === 'El correo electrónico ya está en uso' ? 400 : 500)
            .json({ error: error.message === 'El correo electrónico ya está en uso' ? 'El correo electrónico ya está en uso' : 'Error de servidor' });
    }
});

// Ruta para que un administrador actualice la dirección de un usuario
router.put("/:userId/address", async (req, res) => {
    try {
        const { userId } = req.params;
        const { newAddress } = req.body;
        // Llamar a la función para actualizar la dirección de un usuario
        const newToken = await updateUserAddress(userId, newAddress);
        res.status(200).json({ newToken, message: 'Dirección actualizada' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error de servidor' });
    }
});

// Ruta para que un administrador actualice el teléfono de un usuario
router.put("/:userId/phone", async (req, res) => {
    try {
        const { userId } = req.params;
        const { newPhone } = req.body;
        // Llamar a la función para actualizar el teléfono de un usuario
        const newToken = await updateUserPhone(userId, newPhone);
        res.status(200).json({ newToken, message: 'Teléfono actualizado' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error de servidor' });
    }
});

// Ruta para desactivar un usuario
router.put("/desactivate/:userId", async (req, res) => {
    try {
        const { userId } = req.params; // Obtener el userId de los parámetros de la URL
        // Llamar a la función para desactivar un usuario
        const newToken = await desactivateUser(userId);
        res.status(200).json({ newToken, message: 'Usuario desactivado' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error de servidor' });
    }
});

export default router;
