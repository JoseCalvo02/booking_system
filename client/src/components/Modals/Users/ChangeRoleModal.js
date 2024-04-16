import Swal from 'sweetalert2';

const ChangeRoleModal = async ({user}) => {
    const { value: newRole } = await Swal.fire({
        title: `Cambiar el rol de ${user.nombre} ${user.apellidos}`,
        input: 'select',
        inputOptions: {
            'Cliente': 'Cliente',
            'Estilista': 'Estilista',
            'Administrador': 'Administrador'
        },
        inputPlaceholder: 'Selecciona un rol',
        showCancelButton: true,
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        customClass: {
            confirmButton: 'font-bold',
        },
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes seleccionar un rol!';
            }
        },
    });
}

export default ChangeRoleModal;