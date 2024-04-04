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

// Obtener todos los cupones disponibles
export const getCoupons = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/coupons`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

// Obtener todas las citas del cliente logueado
export const getAppointments = async (userId) => {
    try {
        console.log("userId en api service", userId);
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/appointments/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data.appointments;
    } catch (error) {
        throw new Error(error);
    }
}


// Cancelar una cita de un cliente
export const cancelAppointment = async (appointmentID) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.delete(`${API_URL}/appointment/${appointmentID}`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
