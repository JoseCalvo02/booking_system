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

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
    try{
        const token = localStorage.getItem('token');
        return !!token; // Devuelve true si el token existe, de lo contrario, false
    }catch(error){
        return false; // Devuelve false si hay un error al verificar la autenticación
    }

};

// Función para obtener el rol del usuario del token
export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = decodeToken();
            return decodedToken.role; // Devuelve el rol del usuario desde el token
        } catch (error) {
            return null; // Devuelve null si hay un error al decodificar el token
        }
    } else{
        return null;
    }
};