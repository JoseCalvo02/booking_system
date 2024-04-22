import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createSchedule } from '../../../../api/scheduleApi';
import { daysInMonth, getDayName, formatHour } from '../../../utils/dateUtils';

// Function to choose the type of schedule to create
export const CreateScheduleModal = async(stylist, currentDate, setSchedule) => {
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
            CreateDailyScheduleModal(stylist, currentDate, setSchedule);
        } else {
            CreateWeeklyScheduleModal(stylist, currentDate, setSchedule);
        }
    }
}

// Function to create a new schedule per day
export const CreateDailyScheduleModal = async(stylist, currentDate, setSchedule) => {
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
                        {daysArray.map(day => {
                            const dayName = getDayName(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
                            return <option className='checked:bg-primary checked:text-white' key={day} value={day}>{`${day} - ${dayName}`}</option>
                        })}
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
        preConfirm: async() => {
            // Obtener los valores seleccionados
            const selectedDay = parseInt(document.getElementById('daySelect').value);
            const selectedStartHour = parseInt(document.getElementById('startHourSelect').value);
            const selectedEndHour = parseInt(document.getElementById('endHourSelect').value);

            const dayName = getDayName(new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay));

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

            const newSchedule = {
                estilistaID: stylist.usuarioID,
                fecha: new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay),
                dia: dayName,
                horaInicio: startHour,
                horaFinal: endHour
            };

            try{
                const addedSchedule = await createSchedule("Daily", newSchedule);
                Swal.fire({
                    title: 'Horario creado',
                    text: 'El horario se ha creado correctamente',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                // Agregar el horario con el setSchedule
                setSchedule((prevSchedule) => [...prevSchedule, addedSchedule]);
            }catch(error) {
                Swal.fire({
                    title: 'Error al crear el horario',
                    text: error.message,
                    icon: 'error'
                });
            };
        }
    });
}

// Function to create a new schedule per week
export const CreateWeeklyScheduleModal = async(stylist, currentDate, setSchedule) => {
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