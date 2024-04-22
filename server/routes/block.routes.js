import express from "express";
import * as block from "../controllers/blockController.js";

const router = express.Router();

// Route to get all blocks by stylist and month/year
router.get('/stylist/:stylistId', async (req, res) => {
    try {
        const { stylistId } = req.params;
        const { year, month } = req.query;

        const stylistBlocks = await block.getBlocksByStylist(stylistId, year, month);
        res.json(stylistBlocks);
    } catch (error) {
        console.error('Error getting blocks:', error.message);
        res.status(500).json({ message: 'Error getting blocks' });
    }
});

export default router;