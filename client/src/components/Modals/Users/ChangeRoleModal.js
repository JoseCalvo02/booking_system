import Swal from 'sweetalert2';
import { changeUserRole } from '../../../../api/userApi';

const ChangeRoleModal = async ({user}) => {
    const { value: newRole } = await Swal.fire({
        title: `Cambiar el rol de ${user.nombre} ${user.apellidos}`,
        input: 'select',
        inputOptions: {
            'Administrador': 'Administrador',
            'Estilista': 'Estilista',
            'Cliente': 'Cliente'
        },
        inputPlaceholder: 'Selecciona un rol',
        showCancelButton: true,
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value !== '') {
                    resolve();
                } else {
                    resolve('Debes seleccionar un rol');
                }
            });
        }
    });

    if (newRole) {
        try {
            await changeUserRole(user.usuarioID, newRole);
            Swal.fire({
                title: 'Rol cambiado',
                text: `El rol de ${user.nombre} ${user.apellidos} ha sido cambiado a ${newRole}`,
                icon: 'success',
                timer: 2000, // Duración del mensaje de éxito en milisegundos
                timerProgressBar: true,
                showConfirmButton: false,
                willClose: () => {
                    // Recargar la página después de que se cierre el mensaje de éxito
                    window.location.reload();
                }
            });
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    }
};

export default ChangeRoleModal;