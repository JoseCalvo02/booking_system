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

// Función para redimir un cupón por un cliente logueado redeemCoupon
export const redeemCoupon = async (userId, cuponId) => {
    try {
        // Obtener el ID del usuario y el cupón
        userId = parseInt(userId);
        cuponId = parseInt(cuponId);

        const coupon = await prisma.Cupones.findUnique({
            where: {
                cuponID: cuponId
            }
        });

        // Obtener los puntos del usuario recorriendo la tabla PuntosClientes y buscando el clienteID que coincida con el userId
        const userPoints = await prisma.PuntosClientes.findFirst({
            where: {
                clienteID: userId
            }
        });

        if (!userPoints) {
            throw new Error('No se encontraron los puntos del usuario');
        }

        // Verificar si el usuario tiene suficientes puntos para canjear el cupón
        if (userPoints.puntosAcumulados < coupon.valorPuntos) {
            throw new Error('El usuario no tiene suficientes puntos para canjear el cupón');
        }

        // Actualizar los puntos del usuario
        const updatedPoints = await prisma.PuntosClientes.update({
            where: {
                puntosID: userPoints.puntosID,
                clienteID: userId
            },
            data: {
                puntosAcumulados: {
                    decrement: coupon.valorPuntos // Restar los puntos del cupón
                },
                puntosCanjeados: {
                    increment: coupon.valorPuntos // Agregar los puntos canjeados
                }
            }
        });

        
        // Ingresar los datos en la tabla CuponesCanjeados
        await prisma.CuponesCanjeados.create({
            data: {
                cuponID: cuponId,
                clienteID: userId,
                fecha: new Date().toISOString(),
                valorPuntos: coupon.valorPuntos,
                estado: "Pendiente"

            }
        });

        // Enviar respuesta
        return updatedPoints;
    } catch (error) {
        throw new Error('Error de servidor: ' + error.message); // Concatenar el mensaje de error correctamente
    }
}

export const getRedeemedCoupons = async (userId) => {
    try {

        // Convertir userId a entero si es necesario
        userId = parseInt(userId);

        // Obtener los cupones canjeados por el usuario
        const redeemedCoupons = await prisma.CuponesCanjeados.findMany({
            where: {
                clienteID: userId
            }
        });

        // Obtener el nombre del cupón canjeado
        for (let i = 0; i < redeemedCoupons.length; i++) {
            const coupon = await prisma.Cupones.findUnique({
                where: {
                    cuponID: redeemedCoupons[i].cuponID
                }
            });
            redeemedCoupons[i].nombreCupon = coupon.nombreCupon;
        }

        // Enviar respuesta
        return redeemedCoupons;
    } catch (error) {
        throw new Error('Error al obtener los cupones canjeados: ' + error.message);
    }
}
