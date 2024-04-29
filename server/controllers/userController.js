import prisma from '../prisma/prisma.js';
import { generateNewToken } from '../utils/jwtService.js';
import bcrypt from "bcrypt"; // Importar la biblioteca bcrypt para encriptar contraseñas

// Función genérica para obtener usuarios por tipo
export const getUsersByType = async (type) => {
    let roleId;
    switch(type) {
        case 'clients':
            roleId = 3;
            break;
        case 'stylists':
            roleId = 2;
            break;
        default:
            throw new Error('Tipo de usuario no válido');
    }
    try {
        const users = await prisma.$transaction(async (prisma) => {
            const usersWithRole = await prisma.usuarios.findMany({
                where: {
                    rolID: roleId
                }
            });

            const usersWithRewards = await Promise.all(usersWithRole.map(async (user) => {
                const userPoints = await prisma.puntosClientes.findFirst({
                    where: {
                        clienteID: user.usuarioID
                    },
                    select: {
                        puntosAcumulados: true,
                        puntosCanjeados: true
                    }
                });
                return { ...user, points: userPoints };
            }));

            return usersWithRewards;
        });

        return users;
    } catch(error) {
        console.error("Error:", error);
        throw new Error('Error de servidor');
    }
};

// Función para actualizar el correo electrónico de un usuario
export const updateUserEmail = async (userId, newEmail) => {
    try {
        // Convertir userId a tipo Int si es una cadena
        userId = parseInt(userId);

        // Validar que el correo no exista
        const existingUser = await prisma.Usuarios.findUnique({
            where: {
                correo: newEmail
            }
        });
        if(existingUser) {
            throw new Error('El correo electrónico ya está en uso');
        }

        // Actualizar el correo del usuario
        const updatedUser = await prisma.Usuarios.update({
            where: {
                usuarioID: userId
            },
            data: {
                correo: newEmail
            }
        });

        // Generar un nuevo token con los datos actualizados del usuario
        const newToken = await generateNewToken(updatedUser);

        return newToken;
    } catch(error) {
        console.error("Error:", error);
        // Enviar mensajes específicos de error al frontend
        throw new Error(error.message === 'El correo electrónico ya está en uso' ? 'El correo electrónico ya está en uso' : 'Error de servidor');
    }
};

// Función para actualizar la dirección de un usuario
export const updateUserAddress = async (userId, newAddress) => {
    try {
        // Convertir userId a tipo Int si es una cadena
        userId = parseInt(userId);

        // Actualizar la dirección del usuario
        const updatedUser = await prisma.Usuarios.update({
            where: {
                usuarioID: userId
            },
            data: {
                direccion: newAddress
            }
        });

        // Generar un nuevo token con los datos actualizados del usuario
        const newToken = await generateNewToken(updatedUser);

        return newToken ;
    } catch(error) {
        console.error("Error:", error);
        throw new Error('Error de servidor');
    }
}

// Funcion para actualizar el telefono de un usuario
export const updateUserPhone = async (userId, newPhone) => {
    try {
        // Convertir userId a tipo Int si es una cadena
        userId = parseInt(userId);

        // Actualizar el teléfono del usuario
        const updatedUser = await prisma.Usuarios.update({
            where: {
                usuarioID: userId
            },
            data: {
                telefono: newPhone
            }
        });

        // Generar un nuevo token con los datos actualizados del usuario
        const newToken = await generateNewToken(updatedUser);

        return newToken;
    } catch(error) {
        console.error("Error:", error);
        throw new Error('Error de servidor');
    }
}

// Función para desactivar un usuario
export const desactivateUser = async (userId) => {
    try {
        // Validar que userId sea un número entero
        const userIdInt = parseInt(userId);
        if (isNaN(userIdInt) || userIdInt <= 0) {
            throw new Error('El userId no es válido');
        }

        // Desactivar la cuenta del usuario
        const updatedUser = await prisma.usuarios.update({
            where: {
                usuarioID: userIdInt
            },
            data: {
                estado: 'Inactivo'
            }
        });

        return updatedUser;
    } catch (error) {
        console.error("Error en desactivateUser:", error);
        throw new Error('No se pudo desactivar la cuenta del usuario');
    }
};

// Función para cambiar la contraseña de un usuario utilizando bcrypt para encriptar la nueva contraseña antes de guardarla y desencriptar la contraseña actual para compararla
export const changePassword = async (userId, currentPassword, newPassword) => {
    try {
        // Convertir userId a tipo Int si es una cadena
        userId = parseInt(userId);

        // Buscar al usuario por su ID
        const user = await prisma.Usuarios.findUnique({
            where: {
                usuarioID: userId
            }
        });

        // Verificar si el usuario existe
        if (!user) {
            throw new Error('El usuario no existe');
        }

        // Verificar si la contraseña actual coincide
        const passwordMatch = await bcrypt.compare(currentPassword, user.contra);
        if (!passwordMatch) {
            throw new Error('La contraseña actual no coincide');
        }

        // Encriptar la nueva contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario
        const updatedUser = await prisma.Usuarios.update({
            where: {
                usuarioID: userId
            },
            data: {
                contra: hashedPassword
            }
        });

        // Generar un nuevo token con los datos actualizados del usuario
        const newToken = await generateNewToken(updatedUser);

        return newToken;
    } catch (error) {
        console.error("Error en changePassword:", error);
        // Enviar mensajes específicos de error al frontend
        throw new Error(error.message === 'El usuario no existe' ? 'El usuario no existe' : error.message === 'La contraseña actual no coincide' ? 'La contraseña actual no coincide' : 'Error de servidor');
    }
};

// Función para cambiar el estado de un usuario (activar o desactivar)
export const changeUserStatus = async (userId, estado) => {
    try {
        // Convertir userId a tipo Int si es una cadena
        userId = parseInt(userId);

        // Validar que el estado sea 'Activo' o 'Inactivo'
        if (estado !== 'Activo' && estado !== 'Inactivo') {
            throw new Error('El estado no es válido');
        }

        // Determinar el nuevo estado
        const nuevoEstado = estado === 'Activo' ? 'Inactivo' : 'Activo'; // Cambiar el estado al opuesto

        // Actualizar el estado del usuario al estado opuesto
        const updatedUser = await prisma.Usuarios.update({
            where: {
                usuarioID: userId
            },
            data: {
                estado: nuevoEstado
            }
        });

        return updatedUser;

    } catch (error) {
        console.error("Error en changeUserStatus:", error);
        // Enviar mensajes específicos de error al frontend
        throw new Error(error.message === 'El estado no es válido' ? 'El estado no es válido' : 'Error de servidor');
    }
};

// Función para cambiar el rol de un usuario
export const changeUserRole = async (userId, newRole) => {
    try {
        // Convertir userId a tipo Int si es una cadena
        userId = parseInt(userId);

        // Validar que el nuevo rol sea 'admin', 'stylist' o 'client'
        if (newRole !== 'Administrador' && newRole !== 'Estilista' && newRole !== 'Cliente') {
            throw new Error('El rol no es válido');
        }

        // Determinar el nuevo rol
        let roleId;
        switch(newRole) {
            case 'Administrador':
                roleId = 1;
                break;
            case 'Estilista':
                roleId = 2;
                break;
            case 'Cliente':
                roleId = 3;
                break;
            default:
                throw new Error('El rol no es válido');
        }

        // Actualizar el rol del usuario
        const updatedUser = await prisma.Usuarios.update({
            where: {
                usuarioID: userId
            },
            data: {
                rolID: roleId
            }
        });

        return updatedUser;
    } catch (error) {
        console.error("Error en changeUserRole:", error);
        // Enviar mensajes específicos de error al frontend
        throw new Error(error.message === 'El rol no es válido' ? 'El rol no es válido' : 'Error de servidor');
    }
};

// Función para obtener las estadísticas de los usuarios
export const getUsersStats = async () => {
    try {
        const stats = await prisma.$transaction(async (prisma) => {
            const totalUsers = await prisma.Usuarios.count({
                where: {
                    rolID: 3
                }
            }); // Contar el total de usuarios
            const activeUsers = await prisma.Usuarios.count({ // Contar el total de usuarios activos
                where: {
                    rolID: 3,
                    estado: 'Activo'
                }
            });
            const inactiveUsers = await prisma.Usuarios.count({ // Contar el total de usuarios inactivos
                where: {
                    rolID: 3,
                    estado: 'Inactivo'
                }
            });

            return {
                totalUsers,
                activeUsers,
                inactiveUsers
            };
        });

        return stats;
    } catch (error) {
        console.error("Error en getUsersStats:", error);
        throw new Error('Error de servidor');
    }
};

// Función para obtener las estilistas trabajando en un horario específico
export const getWorkingStylistsByDate = async (date) => {
    try {
        const formattedDate = new Date(date);
        // Obtener las estilistas trabajando en la fecha especificada
        const stylists = await prisma.$transaction(async (prisma) => {
            const workingStylists = await prisma.Horarios.findMany({
                where: {
                    fecha: formattedDate
                },
                select: {
                    estilistaID: true
                }
            });

            const stylistDetails = await Promise.all(workingStylists.map(async (stylist) => {
                const stylistData = await prisma.Usuarios.findUnique({
                    where: {
                        usuarioID: stylist.estilistaID
                    },
                    select: {
                        usuarioID: true,
                        nombre: true,
                        apellidos: true,
                    }
                });
                return stylistData;
            }));

            return stylistDetails;
        });

        return stylists;
    } catch (error) {
        console.error("Error en getWorkingStylistsByDate:", error);
        throw new Error('Error de servidor');
    }
};