import Swal from 'sweetalert2';
import { deleteSchedule } from '../../../../api/scheduleApi';

export const DeleteScheduleModal = (schedule, setSchedule) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#3b82f6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await deleteSchedule(schedule.horarioID);
                setSchedule((prevSchedule) => prevSchedule.filter((item) => item.horarioID !== schedule.horarioID));
                Swal.fire({
                    title: 'Horario Eliminado',
                    text: 'El horario se ha eliminado correctamente',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
        }
    });
};