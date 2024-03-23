import Swal from 'sweetalert2';
import { updateUserEmail } from '../../../api/userApi';

const EmailChangeModal = async (setUserData) => {
    const { value: newEmail } = await Swal.fire({
        title: 'Ingrese su nuevo correo electrónico',
        input: 'email',
        inputPlaceholder: 'Correo electrónico',
        showCancelButton: true,
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        customClass: {
            confirmButton: 'font-bold',
        },
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes ingresar un correo electrónico!';
            }
            // Validación básica del correo electrónico
            if (!/^\S+@\S+\.\S+$/.test(value)) {
                return '¡El correo electrónico no es válido!';
            }
        },
    });

    if (newEmail) {
        // Imprimir el nuevo correo electrónico en la consola
        console.log('Nuevo correo electrónico ingresado:', newEmail);

        try {
            // Actualiza el correo electrónico en el backend y en el estado local
            await updateUserEmail(newEmail);
            setUserData((prevUserData) => ({ ...prevUserData, email: newEmail }));

            // Mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Correo electrónico actualizado',
                text: `El correo electrónico se ha actualizado a ${newEmail}`
            });
        } catch (error) {
            console.error('Error al actualizar el correo electrónico:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el correo electrónico',
                text: error.message
            });
        }
    }
};

export default EmailChangeModal;