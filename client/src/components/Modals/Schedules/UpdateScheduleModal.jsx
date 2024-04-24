import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { updateSchedule } from '../../../../api/scheduleApi';
import { formatHour } from '../../../utils/dateUtils';

export const UpdateScheduleModal = (schedule, setSchedule) => {
    const MySwal = withReactContent(Swal);

    // Obtener la hora de inicio y fin del horario actual para mostrarla en los selects
    const startHour = parseInt(schedule.horaInicio.split(':')[0]);
    const endHour = parseInt(schedule.horaFinal.split(':')[0]);

    MySwal.fire({
        title: 'Editar Horario',
        html: (
            <div className='flex flex-col max-w-full gap-4 p-2'>
                {/* Label and select to select the start time */}
                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="startHourSelect" className="text-base text-gray-800 w-[150px]">Hora de inicio:</label>
                    <select id="startHourSelect" className="flex-grow p-2 origin-bottom border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary" defaultValue={startHour}>
                        {Array.from({ length: 9 }, (_, i) => i + 8).map(hour => (
                            <option className='checked:bg-primary checked:text-white' key={hour} value={hour}>{`${hour}:00`}</option>
                        ))}
                    </select>
                </div>
                {/* Label y select para la hora de fin */}
                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="endHourSelect" className="text-base text-gray-800 w-[150px]">Hora de fin:</label>
                    <select id="endHourSelect" className="flex-grow p-2 origin-bottom border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary" defaultValue={endHour}>
                        {Array.from({ length: 9 }, (_, i) => i + 9).map(hour => (
                            <option className='checked:bg-primary checked:text-white' key={hour} value={hour}>{`${hour}:00`}</option>
                        ))}
                    </select>
                </div>
            </div>
        ),
        showCancelButton: true,
        confirmButtonText: 'Actualizar Horario',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'text-white p-2 rounded-md hover:bg-blue-600',
            cancelButton: 'text-white p-2 rounded-md hover:bg-red-600',
        },
        preConfirm: async() => {
            // Get the selected values
            const selectedStartHour = parseInt(document.getElementById('startHourSelect').value);
            const selectedEndHour = parseInt(document.getElementById('endHourSelect').value);

            // Validar que la hora de inicio no sea igual o posterior a la hora de salida
            if (selectedStartHour > selectedEndHour) {
                Swal.showValidationMessage('La hora de inicio debe ser anterior a la hora de fin.');
                return false; // Impide que se cierre el modal si la validación falla
            }

            if (selectedStartHour == selectedEndHour) {
                Swal.showValidationMessage('La hora de inicio no puede ser igual a la hora de fin.');
                return false; // Impide que se cierre el modal si la validación falla
            }

            const startHour = formatHour(selectedStartHour);
            const endHour = formatHour(selectedEndHour);

            const updatedSchedule = {
                ...schedule,
                horaInicio: startHour,
                horaFinal: endHour
            };

            try {
                await updateSchedule(updatedSchedule);
                setSchedule(prev => prev.map(item => item.horarioID === schedule.horarioID ? updatedSchedule : item));

                Swal.fire({
                    icon: 'success',
                    title: 'Horario actualizado',
                    text: 'El horario se ha actualizado correctamente.',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error al actualizar el horario.'
                });
            }
        } // End of preConfirm
    })
}