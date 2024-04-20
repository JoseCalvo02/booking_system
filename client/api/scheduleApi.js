import axiosInstance from '../config/axiosConfig';

const API_URL = '/api/schedule';

// Function to get all schedules
export const getSchedules = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await axiosInstance.get(`${API_URL}`, {
            headers: {
                Authorization: `Bearer ${token}` // Add the token as an authorization header
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

// Function to get all schedules by stylist and month/year
export const getSchedulesByStylist = async (stylistId, year, month) => {
    try {
        const token = localStorage.getItem('token');
        console.log(year, month);
        const data = { year, month };

        const response = await axiosInstance.get(`${API_URL}/stylist/${stylistId}`, data, {
            headers: {
                Authorization: `Bearer ${token}` // Add the token as an authorization header
            }
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error);
    }
}