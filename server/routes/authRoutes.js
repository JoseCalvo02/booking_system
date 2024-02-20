import express from "express";
import * as auth from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

// Definir rutas de autenticación

// Ruta para registrar un nuevo usuario
router.post(
    "/register",
    // Validaciones en backend de campos vacios
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
    body('phone').notEmpty().withMessage('El teléfono es obligatorio'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    (req, res, next) => {
        // Middleware para verificar datos antes de createUser
        console.log('Valores recibidos antes de createUser:', req.body);
        // Puedes hacer cualquier procesamiento adicional aquí si es necesario
        next(); // Llama a la siguiente función de middleware o controlador en la cadena
    },
    auth.createUser, // Controlador
);

// Ruta para iniciar sesión
router.post("/login", (req, res) => {
    // Lógica para iniciar sesión
});

// Exportar las rutas
export default router;