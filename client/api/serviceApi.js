import axiosInstance from "../config/axiosConfig";

const API_URL = "/api/service"; // Ruta base para las solicitudes de cliente en el backend

// Obtener todos los servicios
export const getServices = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/services`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

// Actualizar un servicio
export const editService = async (editedService) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(`${API_URL}/services/${editedService.servicioID}`, editedService, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
       // Captura los errores específicos y muestra mensajes de error descriptivos
       if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error al actualizar el servicio");
        }
    }
}

// Crear un nuevo servicio 
export const createService = async (newService) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`${API_URL}/services`, newService, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error al crear el servicio");
        }
    }
}
