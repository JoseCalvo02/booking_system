import Swal from 'sweetalert2';
import { changePassword } from '../../../api/userApi';

//Modal de confirmación de cambio de contraseña
const ChangePasswordModal = async ({ userId, currentPassword, newPassword }) => {
    try {
        console.log(userId, currentPassword, newPassword, 'changePassword MODAL');
        const result = await Swal.fire({
            title: '¿Estás seguro de que deseas cambiar tu contraseña?',
            text: 'Tu contraseña será cambiada y deberás iniciar sesión de nuevo',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cambiar contraseña',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            // Llamar a la función API para cambiar la contraseña
            const response = await changePassword(userId, currentPassword, newPassword);

            // Mostrar un mensaje de éxito
            await Swal.fire({
                title: 'Contraseña cambiada',
                text: 'Tu contraseña ha sido cambiada',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            });
                return response;
        }
    }
    catch (error) {
        // Verificar si error.response está definido antes de acceder a sus propiedades
        const errorMessage = error.response ? error.response.data.error || error.message : error.message;

        // En caso de error, mostrar un mensaje de error
        await Swal.fire({
            title: 'Error al cambiar contraseña',
            text: errorMessage,
            icon: 'error',
            confirmButtonColor: '#3085d6',
        });
    }
}

export default ChangePasswordModal;
