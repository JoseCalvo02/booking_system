import Swal from 'sweetalert2';
import { desactivateUser } from '../../../api/userApi';

const DeleteAccountModal = async ({ userId, currentPassword, newPassword }) => {
    try {
        const result = await Swal.fire({
            title: '¿Estás seguro de que deseas desactivar tu cuenta?',
            text: 'Tu cuenta se desactivará y no podrás acceder a ella de nuevo',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, desactivar cuenta',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            // Llamar a la función API para desactivar la cuenta
            const response = await desactivateUser(userId, currentPassword, newPassword);

            // Mostrar un mensaje de éxito
            await Swal.fire({
                title: 'Cuenta desactivada',
                text: 'Tu cuenta ha sido desactivada',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            }).then(() => {
                // Redireccionar a la página de home después de cerrar el modal
                window.location.href = '/'; // Redireccionar a la página de inicio
            });

            return response;
        }
    } catch (error) {
        // Verificar si error.response está definido antes de acceder a sus propiedades
        const errorMessage = error.response ? error.response.data.error || error.message : error.message;
        
        // En caso de error, mostrar un mensaje de error
        await Swal.fire({
            title: 'Error al desactivar cuenta',
            text: errorMessage,
            icon: 'error',
            confirmButtonColor: '#3085d6',
        });
    }
};

export default DeleteAccountModal;
