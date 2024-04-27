import express from "express";
import * as Users from "../controllers/userController.js";

const router = express.Router();

// Ruta para obtener todos los usuarios por tipo
router.get("/getUsers/:type", async (req, res) => {
    try {
        const { type } = req.params;
        const users = await Users.getUsersByType(type);
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

        const newToken = await Users.updateUserEmail(userId, newEmail);
        res.status(200).json({ newToken, message: 'Correo electrónico actualizado'});
    } catch (error) {
        console.error("Error:", error);

        res.status(error.message === 'El correo electrónico ya está en uso' ? 400 : 500)
            .json({ error: error.message === 'El correo electrónico ya está en uso' ? 'El correo electrónico ya está en uso' : 'Error de servidor' });
    }
});

// Ruta para que un administrador actualice la dirección de un usuario
router.put("/:userId/address", async (req, res) => {
    try {
        const { userId } = req.params;
        const { newAddress } = req.body;

        const newToken = await Users.updateUserAddress(userId, newAddress);
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

        const newToken = await Users.updateUserPhone(userId, newPhone);
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

        const newToken = await Users.desactivateUser(userId);
        res.status(200).json({ newToken, message: 'Usuario desactivado' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error de servidor' });
    }
});

// Ruta para cambiar la contraseña de un usuario
router.put("/password/:userId", async (req, res) => {
    try {
        const { userId } = req.params; // Obtener el userId de los parámetros de la URL
        const { currentPassword, newPassword } = req.body; // Obtener las contraseñas actuales y nuevas del cuerpo de la petición

        // Validar que currentPassword y newPassword no estén vacíos
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Las contraseñas no pueden estar vacías' });
        }

        const newToken = await Users.changePassword(userId, currentPassword, newPassword); // Obtener el nuevo token

        res.status(200).json({ newToken, message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
});

// Funcion para cambiar el estado de un usuario (activar o desactivar)
router.put("/status/:userId", async (req, res) => {
    try {
        const { userId } = req.params; // Obtener el userId de los parámetros de la URL
        const { estado } = req.body; // Obtener el estado del cuerpo de la petición
        // Llamar a la función para cambiar el estado de un usuario

        const updatedUser = await Users.changeUserStatus(userId, estado); // Obtener el usuario actualizado
        // Si la función no arroja ningún error, enviar una respuesta exitosa al frontend
        res.status(200).json({ updatedUser, message: 'Estado de usuario cambiado exitosamente' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error al cambiar el estado del usuario' });
    }
});

// Funcion para cambiar el rol de un usuario
router.put("/role/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { newRole } = req.body;

        const updatedUser = await Users.changeUserRole(userId, newRole); // Obtener el usuario actualizado

        res.status(200).json({ updatedUser, message: 'Rol de usuario cambiado exitosamente' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error al cambiar el rol del usuario' });
    }
});

// Funcion para obtener los stats de los usuarios
router.get("/stats", async (req, res) => {
    try {
        const stats = await Users.getUsersStats();

        res.status(200).json(stats);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error al obtener los stats de los usuarios' });
    }
});

export default router;
