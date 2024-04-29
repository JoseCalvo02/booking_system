import prisma from "../prisma/prisma.js";
import { checkOverlap } from "../utils/dateUtils.js";

// Function to get all blocks by stylist and month/year
export const getBlocksByStylist = async (stylistId, year, month) => {
    try {
        stylistId = parseInt(stylistId);
        const startOfMonth = new Date(Date.UTC(year, month - 1, 1)).toISOString();
        const endOfMonth = new Date(Date.UTC(year, month, 0)).toISOString();

        // Get all blocks by stylist and month/year
        const blocks = await prisma.BloqueoHorarios.findMany({
            where: {
                estilistaID: stylistId,
                fecha: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
            include: {
                TipoBloqueo: true,
            }
        });

        // Send response
        return blocks;
    } catch (error) {
        console.error('Error getting blocks:', error.message);
        throw new Error('Error getting blocks: ' + error.message);
    }
}

// Function to get all block types
export const getTypeBlocks = async () => {
    try {
        const blockTypes = await prisma.TipoBloqueo.findMany();
        return blockTypes;
    } catch (error) {
        console.error('Error getting block types:', error.message);
        throw new Error('Error getting block types: ' + error.message);
    }
}

// Function to create a new block
export const createBlock = async (block) => {
    try {
        const dateOnly = block.fecha.substring(0, 10);
        // Check and select all blocks that day to avoid overlapping
        const blocks = await prisma.BloqueoHorarios.findMany({
            where: {
                estilistaID: block.estilistaID,
                fecha: {
                    equals: new Date(dateOnly),
                },
            }
        });

        // Check if the new block overlaps with any existing block
        if (checkOverlap(block, blocks)) {
            throw new Error('El bloqueo se superpone con otro bloqueo existente.');
        }

        const newBlock = await prisma.BloqueoHorarios.create({
            data: {
                estilistaID: block.estilistaID,
                fecha: new Date(block.fecha),
                tipoBloqueoID: block.tipoBloqueoID,
                horaInicio: block.horaInicio,
                horaFinal: block.horaFinal,
                descripcion: block.descripcion,
            },
            include: {
                TipoBloqueo: true, // Incluye el tipo de bloqueo en la respuesta
            },
        });

        // Send response
        return newBlock;
    } catch (error) {
        console.error('Error creating block:', error.message);
        throw new Error(error.message);
    }
}

// Function to delete a block
export const deleteBlock = async (blockId) => {
    try {
        blockId = parseInt(blockId);
        await prisma.BloqueoHorarios.delete({
            where: {
                bloqueoID: blockId,
            }
        });

        // Send response
        return { message: 'Block deleted' };
    } catch (error) {
        console.error('Error deleting block:', error.message);
        throw new Error(error.message);
    }
}

// Function to get all blocks by stylist and date
export const getBlocksByDateAndStylist = async (stylistId, date) => {
    try {
        stylistId = parseInt(stylistId);

        const blocks = await prisma.BloqueoHorarios.findMany({
            where: {
                estilistaID: stylistId,
                fecha: new Date(date),
            },
            include: {
                TipoBloqueo: true,
            }
        });

        // Send response
        return blocks;
    } catch (error) {
        console.error('Error getting blocks:', error.message);
        throw new Error('Error getting blocks: ' + error.message);
    }
}