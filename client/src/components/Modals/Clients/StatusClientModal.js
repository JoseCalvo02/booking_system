import Swal from 'sweetalert2';
import { changeUserStatus } from '../../../../api/userApi';

const handleClientAction = async (usuarioID, estado, nombreCliente) => {
    let action = '';
    let message = '';
    let icon = '';
    let color = '';

    switch (estado) {
        case 'Activo':
            action = 'Desactivar';
            message = `El usuario ${nombreCliente} ha sido Desactivado`;
            icon = 'success';
            color = '#f44336'; 
            break;
        case 'Inactivo':
            action = 'Activar';
            message = `El usuario ${nombreCliente} ha sido Activado`;
            icon = 'success';
            color = '#4caf50';
            break;
        default:
            break;
    }

    const result = await Swal.fire({
        title: `¿Estás seguro de ${action} a ${nombreCliente}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: color,
        cancelButtonColor: '#333',
        confirmButtonText: `Sí, ${action}`,
        cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
        try {
            // Llama a la función changeUserStatus para cambiar el estado del usuario
            const response = await changeUserStatus(usuarioID, estado);
            
            // Si la solicitud es exitosa, muestra un mensaje de éxito
            Swal.fire({
                title: '¡Hecho!',
                text: message,
                icon: icon,
                confirmButtonColor: color,
                timer: 2000, // Duración en milisegundos (2 segundos)
                timerProgressBar: true, // Muestra una barra de progreso durante el tiempo que queda
                showConfirmButton: false // No mostrar el botón de confirmación
            });

            // Espera dos segundos antes de recargar la página
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            // Si hay un error, muestra un mensaje de error utilizando Swal
            Swal.fire({
                title: 'Error',
                text: `Hubo un error al ${action} el usuario: ${error.message}`,
                icon: 'error',
                confirmButtonColor: '#f44336',
            });
        }
    }
};

export default handleClientAction;

