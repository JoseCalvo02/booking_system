import { jwtDecode } from 'jwt-decode';

// Función para decodificar el token JWT y obtener las propiedades del usuario
export const decodeToken = () => {
    // Obtener el token JWT del almacenamiento local
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token en el almacenamiento local.');
    }

    try {
        // Decodificar el token JWT para obtener las propiedades del usuario
        const decodedToken = jwtDecode(token);
        return decodedToken;
    } catch (error) {
        throw new Error('Error al decodificar el token JWT:', error.message);
    }
};