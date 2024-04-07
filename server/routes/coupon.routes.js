import express from "express";

import * as coupon from "../controllers/couponController.js";

const router = express.Router();

// Obtener todos los cupones disponibles
router.get("/coupons", coupon.getAllCoupons);

export default router;