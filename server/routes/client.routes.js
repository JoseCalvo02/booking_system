import express from "express";
import { getAllClients } from "../controllers/clientController.js";

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/clients", getAllClients);

export default router;