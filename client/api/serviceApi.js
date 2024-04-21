import axiosInstance from "../config/axiosConfig";

const API_URL = "/api/service"; // Base route for service requests

/**
 * Function to get all services
 *
 * @returns {Promise<Array>} Array of services
 */
export const getServices = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/services`, {
            headers: {
                Authorization: `Bearer ${token}` // Add the token as an authorization header
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Function to edit a service
 *
 * @param {Object} editedService - Edited service
 * @returns {Promise<Object>} Response data
 */
export const editService = async (editedService) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(`${API_URL}/editService`, editedService, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
       if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error al actualizar el servicio");
        }
    }
}

/**
 * Function to create a service
 *
 * @param {Object} newService - Service to create
 * @returns {Promise<Object>} Response data
 */
export const createService = async (newService) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`${API_URL}/services`, newService, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.newService;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error al crear el servicio");
        }
    }
}

/**
 * Function to delete a service
 *
 * @param {Object} service - Service to delete
 * @returns {Promise<Object>} Response data
 */
export const deleteService = async (service) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.delete(`${API_URL}/services/${service.servicioID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error al eliminar el servicio");
        }
    }
}

