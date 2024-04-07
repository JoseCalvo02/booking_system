import prisma from "../prisma/prisma.js"; // Importar el Prisma Client

// Función para obtener todos los cupones getAllCoupons y mostrar solo los cupones Activos
export const getAllCoupons = async (req, res) => {
    try {
        // Obtener todos los cupones
        const coupons = await prisma.Cupones.findMany({
            where: {
                estado: "Activo"
            }
        });
        // Enviar respuesta
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}