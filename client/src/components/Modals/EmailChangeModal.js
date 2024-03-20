import Swal from 'sweetalert2';

const EmailChangeModal = async () => {
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
    }
};

export default EmailChangeModal;