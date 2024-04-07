import Swal from 'sweetalert2';
import { cancelAppointment } from '../../../../api/apptApi';

const CancelarCitaModal = async (appointmentID) => {
    const result = await Swal.fire({
        title: '¿Estás seguro de cancelar la cita?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cancelar'
    });

    if (result.isConfirmed) {
        try {
            await cancelAppointment(appointmentID);
            Swal.fire(
                '¡Cita cancelada!',
                'La cita ha sido cancelada correctamente',
                'success'
            );
        } catch (error) {
            Swal.fire(
                '¡Error!',
                'Ha ocurrido un error al cancelar la cita',
                'error'
            );
        }
    }
}

export default CancelarCitaModal;
