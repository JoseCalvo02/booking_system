import axiosInstance from '../config/axiosConfig';

const API_URL = '/api/block';

// Function to get all blocks by stylist and month/year
export const getBlocksByStylist = async (stylistId, year, month) => {
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
        throw new Error('Error al obtener los bloqueos: ' + error.message);
    }
}