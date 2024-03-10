import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Clave secreta para firmar tokens JWT

// Middleware de autenticación global
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.log('No se proporcionó un token');
        return res.sendStatus(401); // Si no hay token, devuelve un error de autenticación
    }

    const token = authHeader.split(' ')[1]; // Extraer el token de la cabecera de autorización

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Error al verificar el token:', err);
            return res.sendStatus(403); // Si el token es inválido, devuelve un error de acceso prohibido
        }
        req.user = user; // Agrega el usuario decodificado al objeto de solicitud para su uso en rutas protegidas
        next(); // Continúa con la solicitud
    });
};

export default authenticateToken;