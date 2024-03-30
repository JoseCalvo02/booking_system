import Swal from 'sweetalert2';

const CancelarCitaModal = () => {
    
// Modal que diga si esta seguro de cancelar la cita y si acepta se cancela la cita
    Swal.fire({
        title: 'Estas Seguro?',
        text: 'No podrás recuperar tu cita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Cancelar!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonColor: '#ff0000',
        cancelButtonColor: '#0000ff'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancelada!',
                    'Su cita ha sido cancelada.',
                    'success'
                );
            }
        }
    )};

export default CancelarCitaModal;