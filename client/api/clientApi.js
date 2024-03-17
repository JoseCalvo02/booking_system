import axiosInstance from "../config/axiosConfig";

const API_URL = "/api/client"; // Ruta base para las solicitudes de cliente en el backend

// Función para obtener todos los usuarios
export const getClients = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/clients`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error){
        console.error("Error al obtener usuarios:", error.message);
        throw new Error('No se pudo obtener los usuarios: ' + error.message);
    }
};

// Función para obtener todos los estilistas
export const getStylists = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/stylists`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error){
        console.error("Error al obtener estilistas:", error.message);
        throw new Error('No se pudo obtener los estilistas: ' + error.message);
    }
};
