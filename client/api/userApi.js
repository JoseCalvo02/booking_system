import axiosInstance from "../config/axiosConfig";

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
        console.error(`Error al obtener los ${type}:`, error.message);
        throw new Error(`No se pudieron obtener los ${type}: ${error.message}`);
    }
};

// Función para actualizar el correo electrónico de un usuario
export const updateUserEmail = async (userId, newEmail) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(`${API_URL}/${userId}/email`, { newEmail }, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el correo electrónico:', error.message);
        throw new Error(`No se pudo actualizar el correo electrónico: ${error.message}`);
    }
};