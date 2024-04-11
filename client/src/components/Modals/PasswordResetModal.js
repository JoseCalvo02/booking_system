import swal from 'sweetalert2';
import { sendPasswordResetEmail } from '../../utils/emailService';

const PasswordResetModal = async () => {
    const { value: email } = await swal.fire({
        title: 'Por favor, introduce tu correo electrónico para restablecer tu contraseña:',
        input: 'email',
        inputPlaceholder: 'Correo Electrónico',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        customClass: {
            confirmButton: 'font-bold',
        },
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes ingresar un correo electrónico válido!';
            }
        },
    });

    if (email) {
        sendPasswordResetEmail(email);
        swal.fire({
            icon: 'info',
            title: 'Correo Enviado',
            text: 'Se ha enviado un correo electrónico para restablecer tu contraseña.',
            timer: 2000,
            timerProgressBar: true,
            onClose: () => {
            }
        });
    }
}

export default PasswordResetModal;
