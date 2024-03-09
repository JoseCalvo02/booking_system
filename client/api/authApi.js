import axiosInstance from '../config/axiosConfig';

const API_URL = '/api/auth'; // Ruta base para las solicitudes de autenticación en el backend

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
    try {
        // Enviar la solicitud de registro de usuario al backend
        const response = await axiosInstance.post(`${API_URL}/register`, userData);

        // La solicitud fue exitosa, retornar la respuesta
        console.log("Usuario creado exitosamente");
        return response.data; // Retornar la respuesta completa para más procesamiento si es necesario
    } catch (error) {
        // Error al hacer la solicitud, manejarlo adecuadamente
        console.error("Error al registrar usuario:", error.message);

        // Verificar si la respuesta contiene un mensaje de error del servidor
        if (error.response && error.response.data && error.response.data.error) {
            // Mostrar el mensaje de error específico recibido del servidor
            console.error("Error específico:", error.response.data.error);
            throw new Error(error.response.data.error); // Propagar el mensaje de error específico al cliente
        } else {
            // Si no hay un mensaje de error específico del servidor, mostrar un mensaje genérico
            throw new Error('No se pudo registrar el usuario: ' + error.message);
        }
    }
};

// Función para iniciar sesión
export const loginUser = async (userData) => {
    try {
        // Enviar la solicitud de inicio de sesión al backend
        const response = await axiosInstance.post(`${API_URL}/login`, userData);

        // La solicitud fue exitosa, retornar la respuesta
        console.log("Usuario autenticado exitosamente");
        localStorage.setItem('token', response.data.token); // Almacena el token JWT en localStorage
        return response.data; // Retornar la respuesta completa para más procesamiento si es necesario
    } catch (error) {
        // Error al hacer la solicitud, manejarlo adecuadamente
        console.error("Error al iniciar sesión:", error.message);

        // Verificar si la respuesta contiene un mensaje de error del servidor
        if (error.response && error.response.data && error.response.data.error) {
            console.error("Error específico:", error.response.data.error); // Mostrar el mensaje de error específico recibido del servidor
            throw new Error(error.response.data.error); // Propagar el mensaje de error específico al cliente
        } else {
            // Si no hay un mensaje de error específico del servidor, mostrar un mensaje genérico
            throw new Error('No se pudo iniciar sesión: ' + error.message);
        }
    }
};