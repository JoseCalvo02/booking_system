import axiosInstance from '../config/axiosConfig';

const API_URL = '/api/admin';

// Función para obtener todos los usuarios
export const getClients = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/users`);
        return response.data;
    } catch (error){
        console.error("Error al obtener usuarios:", error.message);
        throw new Error('No se pudo obtener los usuarios: ' + error.message);
    }
};