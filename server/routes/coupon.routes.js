import express from "express";

import * as coupon from "../controllers/couponController.js";

const router = express.Router();

// Obtener todos los cupones disponibles
router.get("/coupons", coupon.getAllCoupons);

router.post("/redeemCoupon", async (req, res) => {
    try {
        const { userId, cuponId } = req.body;

        const updatedPoints = await coupon.redeemCoupon(userId, cuponId);

        res.status(200).json({ updatedPoints, message: "Cupón canjeado con éxito" }); // Utiliza .json() para enviar una respuesta JSON
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



export default router;