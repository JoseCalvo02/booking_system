import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Ruta base para las solicitudes de autenticación en el backend

export const registerUser = async (userData) => {
    try {
        console.log("Valores recibidos: " , userData);
        console.log("Ruta");
        const response = await axios.post(`${API_URL}/register`, userData);
        console.log("Respuesta del servidor:", response.data);
        return response.data; // Podrías retornar datos adicionales desde el servidor si es necesario
    } catch (error) {
        throw new Error('No ingresa a la ruta: ' + error.message);
    }
};