import axiosInstance from "../config/axiosConfig";

const API_URL = "/api/appt"; // Ruta base para las solicitudes de citas en el backend

// Obtener todas las citas del cliente logueado
export const getAppointments = async (userId) => {
    try {
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