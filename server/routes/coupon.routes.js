import express from "express";

import * as coupon from "../controllers/couponController.js";

const router = express.Router();

// Obtener todos los cupones disponibles
router.get("/coupons", coupon.getAllCoupons);

// Redimir un cupón por un cliente logueado
router.post("/redeemCoupon", async (req, res) => {
    try {
        const { userId, cuponId } = req.body;

        const updatedPoints = await coupon.redeemCoupon(userId, cuponId);

        res.status(200).json({ updatedPoints, message: "Cupón canjeado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;