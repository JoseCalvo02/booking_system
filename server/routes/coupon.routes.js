import express from "express";

import * as coupon from "../controllers/couponController.js";

const router = express.Router();

// Obtener todos los cupones disponibles
router.get("/coupons", coupon.getAllCoupons);

// Redimir un cupón por un cliente logueado
router.post("/redeemCoupon", async (req, res) => {
    try {
        const { userId, cuponId } = req.body;

        const { costeCupon, newToken } = await coupon.redeemCoupon(userId, cuponId);

        res.status(200).json({ costeCupon, newToken, message: "Cupón canjeado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener todos los cupones canjeados
router.get("/redeemedCoupons", async (req, res) => {
    try {
        const redeemedCoupons = await coupon.getRedeemedCoupons();

        res.status(200).json(redeemedCoupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener todos los cupones canjeados por un usuario
router.get("/redeemedCoupons:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const redeemedCouponsByUser = await coupon.getRedeemedCouponsByUser(userId);

        res.status(200).json(redeemedCouponsByUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para crear un nuevo cupón
router.post("/createCoupon", async (req, res) => {
    try {
        const { nombreCupon, costoPuntos } = req.body;

        const newCoupon = await coupon.createCoupon(nombreCupon, costoPuntos);

        res.status(200).json(newCoupon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para editar un cupón
router.put("/editCoupon", async (req, res) => {
    try {
        const { cuponID, nombreCupon, valorPuntos } = req.body;

        const editedCoupon = await coupon.editCoupon(cuponID, nombreCupon, valorPuntos);

        res.status(200).json(editedCoupon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para desactivar un cupón
router.put("/changeStatus", async (req, res) => {
    try {
        const { cuponId } = req.body;
        const { estado } = req.body;
        const couponChanged = await coupon.changeStatus(cuponId, estado);

        res.status(200).json(couponChanged);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;