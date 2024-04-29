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

// Function to get all block types
export const getTypeBlocks = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/types`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los tipos de bloqueos: ' + error.message);
    }
}

// Function to create a new block
export const createBlock = async (block) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`${API_URL}/create`, block, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

// Function to delete a block
export const deleteBlock = async (blockId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.delete(`${API_URL}/delete/${blockId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

// Funcion para obtener los blockes por fecha y estilista
export const getBlocksByDateAndStylist = async (date, stylistId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/date/${date}/${stylistId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los bloqueos: ' + error.message);
    }
}