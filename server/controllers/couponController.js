import prisma from "../prisma/prisma.js"; // Importar el Prisma Client
import { generateNewToken } from "../utils/jwtService.js"; // Importar la función para generar un nuevo token

// Función para obtener todos los cupones y mostrar solo los cupones Activos
export const getAllCoupons = async (req, res) => {
    try {
        // Obtener todos los cupones
        const coupons = await prisma.Cupones.findMany();
        // Enviar respuesta
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Función para redimir un cupón por un cliente logueado
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
        await prisma.PuntosClientes.update({
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
                estado: "Pendiente"
            }
        });

        const updatedUser = await prisma.Usuarios.findUnique({
            where: {
                usuarioID: userId
            }
        });

        const costeCupon = coupon.valorPuntos; // Coste del cupón

        // Generar un nuevo token con los datos actualizados del usuario
        const newToken = await generateNewToken(updatedUser);

        // Enviar respuesta
        return {costeCupon, newToken};
    } catch (error) {
        console.error('Error al canjear el cupón:', error.message);
        throw new Error('Error de servidor: ' + error.message); // Concatenar el mensaje de error correctamente
    }
}

// Función para obtener todos los cupones canjeados
export const getRedeemedCoupons = async () => {
    try {
         // Obtener todos los cupones canjeados
         const redeemedCoupons = await prisma.CuponesCanjeados.findMany({
            include: {
                Cupones: {
                    select: {
                        nombreCupon: true,
                        valorPuntos: true
                    }
                },
                Usuarios: {
                    select: {
                        nombre: true,
                        apellidos: true
                    }
                }
            }
        });

        return redeemedCoupons; // Enviar respuesta
    } catch (error) {
        throw new Error('Error al obtener los cupones canjeados: ' + error.message);
    }
}

// Función para obtener todos los cupones canjeados por un usuario
export const getRedeemedCouponsByUser = async (userId) => {
    try {

        // Convertir userId a entero si es necesario
        userId = parseInt(userId);

        // Obtener los cupones canjeados por el usuario
        const redeemedCoupons = await prisma.CuponesCanjeados.findMany({
            where: {
                clienteID: userId

            },
            include: {
                Cupones: {
                    select: {
                        nombreCupon: true,
                        valorPuntos: true
                    }
                }
            }
        });

        // Enviar respuesta
        return redeemedCoupons;
    } catch (error) {
        throw new Error('Error al obtener los cupones canjeados: ' + error.message);
    }
}

// Función para crear un nuevo cupón
export const createCoupon = async (nombreCupon, costoPuntos) => {
    try {
        // Crear un nuevo cupón
        const newCoupon = await prisma.Cupones.create({
            data: {
                nombreCupon,
                valorPuntos: costoPuntos,
                estado: "Activo"
            }
        });

        // Enviar respuesta
        return newCoupon;
    } catch (error) {
        throw new Error('Error al crear un nuevo cupón: ' + error.message);
    }
}

// Función para editar un cupón
export const editCoupon = async (cuponId, nombreCupon, valorPuntos) => {
    try {
        // Convertir cuponId a entero si es necesario
        cuponId = parseInt(cuponId);

        // Editar el cupón
        const editedCoupon = await prisma.Cupones.update({
            where: {
                cuponID: cuponId
            },
            data: {
                nombreCupon,
                valorPuntos
            }
        });

        // Enviar respuesta
        return editedCoupon;
    } catch (error) {
        console.error('Error al editar el cupón:', error.message);
        throw new Error('Error al editar el cupón: ' + error.message);
    }
}

// Función para activar y desactivar un cupón
export const changeStatus = async (cuponId, estado) => {
    try {
        // Convertir cuponId a entero si es necesario
        cuponId = parseInt(cuponId);

        // Validar que el estado sea 'Activo' o 'Inactivo'
        if (estado !== 'Activo' && estado !== 'Inactivo') {
            throw new Error('El estado no es válido');
        }

        // Determinar el nuevo estado
        const nuevoEstado = estado === 'Activo' ? 'Inactivo' : 'Activo'; // Cambiar el estado al opuesto

        // Actualizar el estado del cupón al estado opuesto
        const couponChanged = await prisma.Cupones.update({
            where: {
                cuponID: cuponId
            },
            data: {
                estado: nuevoEstado
            }
        });

        // Enviar respuesta
        return couponChanged;

    } catch (error) {
        throw new Error('Error al desactivar el cupón: ' + error.message);
    }
}



