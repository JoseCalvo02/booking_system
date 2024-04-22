import prisma from "../prisma/prisma.js";

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
                }
            }
        });
        console.log(blocks);

        // Send response
        return blocks;
    } catch (error) {
        console.error('Error getting blocks:', error.message);
        throw new Error('Error getting blocks: ' + error.message);
    }
}