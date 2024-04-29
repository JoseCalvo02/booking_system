import axiosInstance from '../config/axiosConfig';

const API_URL = '/api/schedule';

// Function to get all schedules by stylist and month/year
export const getSchedulesByStylist = async (stylistId, year, month) => {
    try {
        const token = localStorage.getItem('token');
        const data = { year, month };

        const response = await axiosInstance.get(`${API_URL}/stylist/${stylistId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: data
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener el horario: ' + error.message);
    }
}

// Function to create a new schedule
export const createSchedule = async (type, schedule) => {
    try {
        const data = { type, newSchedule: schedule};
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`${API_URL}/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

// Function to delete a schedule
export const deleteSchedule = async (scheduleId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.delete(`${API_URL}/delete/${scheduleId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

// Function to update a schedule
export const updateSchedule = async (schedule) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(`${API_URL}/update`, schedule, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

// Function to get week schedule types
export const getWeeklySchedules = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/weekly`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

// Funcion para obtener los horarios por fecha
export const getSchedulesByDate = async (date) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/date/all/${date}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener el horario: ' + error.message);
    }
}

// Funcion para obtener los horarios por fecha y estilista
export const getScheduleByDateAndStylist = async (date, stylistId) => {
    try {
        const data = { stylistId, date };
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/date/stylist`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los horarios: ' + error.message);
    }
}