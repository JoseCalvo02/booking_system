import Swal from 'sweetalert2';

const DeleteAccountModal = () => {
        Swal.fire({
        title: 'Estas Seguro?',
        text: 'No podrás recuperar tu cuenta!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Borrala!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonColor: '#ff0000',
        cancelButtonColor: '#0000ff'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminada!',
                    'Su cuenta ha sido eliminada.',
                    'success'
                );
            }
        }
    )};

export default DeleteAccountModal;