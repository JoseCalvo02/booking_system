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

// Route to get all block types
router.get('/types', async (req, res) => {
    try {
        const blockTypes = await block.getTypeBlocks();
        res.json(blockTypes);
    } catch (error) {
        console.error('Error getting block types:', error.message);
        res.status(500).json({ message: 'Error getting block types' });
    }
});

// Route to create a new block
router.post('/create', async (req, res) => {
    try {
        const newBlock = req.body;
        const createdBlock = await block.createBlock(newBlock);
        res.json(createdBlock);
    } catch (error) {
        console.error('Error creating block:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a block
router.delete('/delete/:blockId', async (req, res) => {
    try {
        const { blockId } = req.params;
        await block.deleteBlock(blockId);

        res.json({ message: 'Block deleted' });
    } catch (error) {
        console.error('Error deleting block:', error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;