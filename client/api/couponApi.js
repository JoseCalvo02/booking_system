import axiosInstance from "../config/axiosConfig";

const API_URL = "/api/coupon"; // Ruta base para las solicitudes de los cupones en el backend

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
