import axiosInstance from "../config/axiosConfig";
import { decodeToken } from "../src/utils/tokenUtils";

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

// Redimir un cupón por un cliente logueado
export const redeemCoupon = async (cuponId) => {
    try {
        const decodedToken = decodeToken();
        const token = localStorage.getItem('token');
        const data = {
            userId: decodedToken.userId,
            cuponId: cuponId
        };
        const response = await axiosInstance.post(`${API_URL}/redeemCoupon`, data, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });

        // Actualiza el token en el almacenamiento local con el nuevo token recibido en la respuesta
        localStorage.setItem('token', response.data.newToken);

        return response.data.costeCupon;
    } catch (error) {
        throw new Error(error);
    }
}

// Obtener los cupones canjeados
export const getRedeemedCoupons = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await axiosInstance.get(`${API_URL}/redeemedCoupons`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

// Obtener los cupones canjeados por un cliente logueado
export const getRedeemedCouponsByUser = async () => {
    try {
        const decodedToken = decodeToken();
        const token = localStorage.getItem('token');

        const response = await axiosInstance.get(`${API_URL}/redeemedCoupons${decodedToken.userId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

// Crear un nuevo cupón
export const createCoupon = async (newCoupon) => {
    try {
        console.log(newCoupon, 'newCoupon API');
        const token = localStorage.getItem('token');

        const response = await axiosInstance.post(`${API_URL}/createCoupon`, newCoupon, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

// Desactivar un cupón
export const disableCoupon = async (coupon) => {
    try {
        const token = localStorage.getItem('token');
        const data = {
            cuponId: coupon.cuponID
        };
        console.log(data, 'data');

        const response = await axiosInstance.put(`${API_URL}/disableCoupon`, data, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token como encabezado de autorización
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}