import axiosInstance from "../config/axiosConfig";

const API_URL = "/api/appt"; // Ruta base para las solicitudes de citas en el backend

// Obtener las citas de un usuario
export const getAppointments = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/appointments/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        console.log(response.data.appointments);
        return response.data.appointments; // Devuelve el arreglo de citas
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

// Obtener las estadísticas de las citas del mes actual
export const getApptsStats = async (date) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/stats/${date}`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data.stats;
    } catch (error) {
        throw new Error(error);
    }
}

// Obtener todas las citas
export const getAllAppointments = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/all`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data.appointmentsWithNames;
    } catch (error) {
        throw new Error(error);
    }
}