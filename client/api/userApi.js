import axiosInstance from "../config/axiosConfig";
import { jwtDecode } from 'jwt-decode';

const API_URL = "/api/user"; // Ruta base para las solicitudes de cliente en el backend

// Función para obtener todos los usuarios por tipo
export const getUsersByType = async (type) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/${type}`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error){
        throw new Error(`No se pudieron obtener los ${type}: ${error.response.data.error || error.message}`);
    }
};

// Función para actualizar el correo electrónico de un usuario
export const updateUserEmail = async (newEmail) => {
    try {
        const token = localStorage.getItem('token');
        // Decodificar el token JWT para obtener las propiedades del usuario
        const decodedToken = jwtDecode(token);

        const response = await axiosInstance.put(`${API_URL}/${decodedToken.userId}/email`, { newEmail }, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });

        // Actualiza el token en el almacenamiento local con el nuevo token recibido en la respuesta
        localStorage.setItem('token', response.data.newToken);

        return response.data;
    } catch (error) {
        throw new Error(`No se pudo actualizar el correo electrónico: ${error.response.data.error || error.message}`);
    }
};

// Función para actualizar la dirección de un usuario
export const updateUserAddress = async (newAddress) => {
    try {
        const token = localStorage.getItem('token');
        // Decodificar el token JWT para obtener las propiedades del usuario
        const decodedToken = jwtDecode(token);

        const response = await axiosInstance.put(`${API_URL}/${decodedToken.userId}/address`, { newAddress }, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });

        // Actualiza el token en el almacenamiento local con el nuevo token recibido en la respuesta
        localStorage.setItem('token', response.data.newToken);

        return response.data;
    } catch (error) {
        throw new Error(`No se pudo actualizar la dirección: ${error.response.data.error || error.message}`);
    }
};

// Funcion para actualizar el telefono de un usuario
export const updateUserPhone = async (newPhone) => {
    try {
        const token = localStorage.getItem('token');
        // Decodificar el token JWT para obtener las propiedades del usuario
        const decodedToken = jwtDecode(token);

        const response = await axiosInstance.put(`${API_URL}/${decodedToken.userId}/phone`, { newPhone }, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });

        // Actualiza el token en el almacenamiento local con el nuevo token recibido en la respuesta
        localStorage.setItem('token', response.data.newToken);

        return response.data;
    } catch (error) {
        throw new Error(`No se pudo actualizar el teléfono: ${error.response.data.error || error.message}`);
    }
}

export const desactivateUser = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(`${API_URL}/desactivate/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });

        // Actualiza el token en el almacenamiento local con el nuevo token recibido en la respuesta
        localStorage.setItem('token', response.data.newToken);

        return response.data;
    } catch (error) {
        throw new Error(`No se pudo desactivar el usuario: ${error.response.data.error || error.message}`);
    }
}

// Función para cambiar la contraseña de un usuario
export const changePassword = async (userId, currentPassword, newPassword) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(`/api/user/password/${userId}`, { currentPassword, newPassword }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Actualiza el token en el almacenamiento local con el nuevo token recibido en la respuesta
        localStorage.setItem('token', response.data.newToken);

        return response.data;
    } catch (error) {
        // Si la solicitud falla, lanza un error con el mensaje apropiado
        throw new Error(`No se pudo cambiar la contraseña: ${error.response.data.error || error.message}`);
    }
};
