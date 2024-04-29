import Swal from 'sweetalert2';

const CitaReservadaModal = () => {
    Swal.fire({
        title: 'Cita reservada',
        text: 'Tu cita ha sido reservada exitosamente',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true
    });
}

// CitaReservadaModal.js
export default CitaReservadaModal;