import Swal from 'sweetalert2';

//Modal de confirmación de cambio de contraseña
const ChangePasswordModal = () => {
    Swal.fire({
        title: 'Cambio de Contraseña',
        text: 'Tu contraseña ha sido cambiada exitosamente!',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'green'
    });
};

export default ChangePasswordModal;