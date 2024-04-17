import axiosInstance from "../config/axiosConfig";
import { decodeToken } from "../src/utils/tokenUtils";

const API_URL = "/api/coupon"; // Base route for coupon requests

/**
 * Function to get all coupons
 *
 * @returns {Promise<Array>} Array of coupons
 */
export const getCoupons = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${API_URL}/coupons`, {
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
 * Function to redeem a coupon
 *
 * @param {string} cuponId - The ID of the coupon to redeem
 * @returns {Promise<number>} Cost of the coupon
 */
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
                Authorization: `Bearer ${token}` // Add the token as an authorization header
            }
        });

        // Actualiza el token en el almacenamiento local con el nuevo token recibido en la respuesta
        localStorage.setItem('token', response.data.newToken);

        return response.data.costeCupon;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Function to get redeemed coupons
 *
 * @returns {Promise<Array>} Array of redeemed coupons
 */
export const getRedeemedCoupons = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await axiosInstance.get(`${API_URL}/redeemedCoupons`, {
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
 * Function to get redeemed coupons by user
 *
 * @returns {Promise<Array>} Array of redeemed coupons by user
 */
export const getRedeemedCouponsByUser = async () => {
    try {
        const decodedToken = decodeToken();
        const token = localStorage.getItem('token');

        const response = await axiosInstance.get(`${API_URL}/redeemedCoupons${decodedToken.userId}`, {
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
 * Function to create a coupon
 *
 * @param {Object} newCoupon - Coupon to create
 * @returns {Promise<Object>} Response data
 */
export const createCoupon = async (newCoupon) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axiosInstance.post(`${API_URL}/createCoupon`, newCoupon, {
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
 * Function to edit a coupon
 *
 * @param {Object} editedCoupon - Edited coupon
 * @returns {Promise<Object>} Response data
 */
export const editCoupon = async (editedCoupon) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(`${API_URL}/editCoupon`, editedCoupon, {
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
 * Function to change the status of a coupon
 *
 * @param {Object} coupon - Coupon to delete
 * @returns {Promise<Object>} Response data
 */
export const ChangeCouponStatus = async (coupon) => {
    try {
        const token = localStorage.getItem('token');
        const data = {
            cuponId: coupon.cuponID,
            estado: coupon.estado
        };
        const response = await axiosInstance.put(`${API_URL}/changeStatus`, data, {
            headers: {
                Authorization: `Bearer ${token}` // Add the token as an authorization header
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}