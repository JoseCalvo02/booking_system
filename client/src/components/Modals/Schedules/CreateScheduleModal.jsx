import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createSchedule } from '../../../../api/scheduleApi';
import { daysInMonth, getDayName } from '../../../utils/dateUtils';

// Function to choose the type of schedule to create
export const CreateScheduleModal = async(stylist, currentDate) => {
    const { value: scheduleType } = await Swal.fire({
        title: 'Crear Horario',
        text: '¿Qué tipo de horario deseas crear?',
        icon: 'question',
        input: 'radio',
        inputOptions: {
            daily: 'Diario',
            weekly: 'Semanal'
        },
        confirmButtonText: 'Continuar',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Debes seleccionar un tipo de horario';
            }
        },
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'text-white p-2 rounded-md hover:bg-blue-600',
            cancelButton: 'text-white p-2 rounded-md hover:bg-red-600',
        }
    });
    if (scheduleType) {
        if (scheduleType === 'daily') {
            CreateDailyScheduleModal(stylist, currentDate);
        } else {
            CreateWeeklyScheduleModal(stylist, currentDate);
        }
    }
}

// Function to create a new schedule per day
export const CreateDailyScheduleModal = async(stylist, currentDate) => {
    const MySwal = withReactContent(Swal);
    const totalDays = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    MySwal.fire({
        title: `Crear Horario para ${stylist.nombre + ' ' + stylist.apellidos}`,
        html: (
            <div className='flex flex-col max-w-full gap-2 p-2'>
                {/* Label y select para seleccionar el día */}
                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="daySelect" className="text-base text-gray-800 w-[150px]">Día:</label>
                    <select id="daySelect" className="flex-grow p-2 origin-bottom border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary">
                        {daysArray.map(day => (
                            <option className='checked:bg-primary checked:text-white' key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                {/* Label y select para la hora de inicio */}
                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="startHourSelect" className="text-base text-gray-800 w-[150px]">Hora de inicio:</label>
                    <select id="startHourSelect" className="flex-grow p-2 origin-bottom border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary">
                        {Array.from({ length: 9 }, (_, i) => i + 8).map(hour => (
                            <option className='checked:bg-primary checked:text-white' key={hour} value={hour}>{`${hour}:00`}</option>
                        ))}
                    </select>
                </div>
                {/* Label y select para la hora de fin */}
                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="endHourSelect" className="text-base text-gray-800 w-[150px]">Hora de fin:</label>
                    <select id="endHourSelect" className="flex-grow p-2 origin-bottom border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary">
                        {Array.from({ length: 9 }, (_, i) => i + 9).map(hour => (
                            <option className='checked:bg-primary checked:text-white' key={hour} value={hour}>{`${hour}:00`}</option>
                        ))}
                    </select>
                </div>
            </div>
        ),
        showCancelButton: true,
        confirmButtonText: 'Crear Horario',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'text-white p-2 rounded-md hover:bg-blue-600',
            cancelButton: 'text-white p-2 rounded-md hover:bg-red-600',
        },
        preConfirm: () => {
            // Obtener los valores seleccionados
            const selectedDay = parseInt(document.getElementById('daySelect').value);
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

            // Aquí puedes realizar las acciones necesarias con los valores seleccionados
            console.log(selectedDay, selectedStartHour, selectedEndHour);
        }
    });
}

// Function to create a new schedule per week
export const CreateWeeklyScheduleModal = async(stylist, currentDate) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: `Crear Horario para ${stylist.nombre + ' ' + stylist.apellidos}`,
        html: (
            <div>
                <div className='flex flex-col max-w-full gap-2 p-2'>
                    //Agregar horario semanal
                </div>
            </div>
        ),
        showCancelButton: true,
        confirmButtonText: 'Crear Horario',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'text-white p-2 rounded-md hover:bg-blue-600',
            cancelButton: 'text-white p-2 rounded-md hover:bg-red-600',
        },
        // Preconfirm function
    });
}