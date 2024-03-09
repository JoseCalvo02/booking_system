import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const JWT_SECRET = process.env.JWT_SECRET; // Clave secreta para firmar tokens JWT

// Middleware de autenticación global
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401); // Si no hay token, devuelve un error de autenticación

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Si el token es inválido, devuelve un error de acceso prohibido
        req.user = user; // Agrega el usuario decodificado al objeto de solicitud para su uso en rutas protegidas
        next(); // Continúa con la solicitud
    });
};

export default authenticateToken;