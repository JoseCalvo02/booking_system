import express from "express";
import * as auth from "../controllers/authController";
import {body, validationResult} from "express-validator";


const router = express.Router();

// Definir rutas de autenticación
router.post("/register",
                        // Validaciones en backend de campos vacios
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
    body('phone').notEmpty().withMessage('El teléfono es obligatorio'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

    auth.createUser
);

router.post("/login", (req, res) => {
    // Lógica para iniciar sesión
});

// Exportar las rutas
export default router;