import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createBlock } from '../../../../api/blockApi';
import { daysInMonth, getDayName, formatHour } from '../../../utils/dateUtils';

export const CreateBlockModal = (stylist, currentDate, setBlocks, typeBlocks) => {
    const MySwal = withReactContent(Swal);
    const totalDays = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    MySwal.fire({
        title: `Crear bloqueo para ${stylist.nombre + ' ' + stylist.apellidos}`,
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
                            <option className='checked:bg-primary checked:text-white' key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    {/* Select que contiene segmentos cada 15min  */}
                    <select id="startMinuteSelect" className="flex-grow p-2 border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary">
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                    </select>
                </div>
                {/* Label y select para la hora de fin */}
                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="endHourSelect" className="text-base text-gray-800 w-[150px]">Hora de fin:</label>
                    <select id="endHourSelect" className="flex-grow p-2 origin-bottom border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary">
                        {Array.from({ length: 10 }, (_, i) => i + 8).map(hour => (
                            <option className='checked:bg-primary checked:text-white' key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    {/* Select que contiene segmentos cada 15min  */}
                    <select id="endMinuteSelect" className="flex-grow p-2 border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary">
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                    </select>
                </div>
                {/* Label y select para el tipo de bloqueo */}
                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="blockTypeSelect" className="text-base text-gray-800 w-[150px]">Tipo de bloqueo:</label>
                    <select id="blockTypeSelect" className="flex-grow p-2 origin-bottom border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary">
                        {typeBlocks.map(type => (
                            <option className='checked:bg-primary checked:text-white' key={type.tipoBloqueoID} value={type.tipoBloqueoID}>{type.nombre}</option>
                        ))}
                    </select>
                </div>
                {/* Textarea for the description */}
                <textarea id="description" placeholder='Descripción' style={{ resize: "none" }} className='p-2 border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary'></textarea>
            </div>
        ),
        showCancelButton: true,
        confirmButtonText: 'Crear Bloqueo',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'text-white p-2 rounded-md hover:bg-blue-600',
            cancelButton: 'text-white p-2 rounded-md hover:bg-red-600',
        },
        preConfirm: async() => {
            const day = parseInt(document.getElementById('daySelect').value);
            const selectedStartHour = parseInt(document.getElementById('startHourSelect').value);
            const startMinute = document.getElementById('startMinuteSelect').value;
            const selectedEndHour = parseInt(document.getElementById('endHourSelect').value);
            const endMinute = document.getElementById('endMinuteSelect').value;
            const description = document.getElementById('description').value;

            if (selectedStartHour > selectedEndHour) {
                Swal.showValidationMessage('La hora de inicio debe ser anterior a la hora de fin.');
                return false;
            }

            if (selectedStartHour == selectedEndHour) {
                if (parseInt(startMinute) > parseInt(endMinute)) {
                    Swal.showValidationMessage('La hora de inicio debe ser anterior a la hora de final.');
                    return false;
                }
                if (parseInt(startMinute) == parseInt(endMinute)) {
                    Swal.showValidationMessage('La hora de inicio no puede ser igual a la hora de fin.');
                    return false;
                }
            }

            const startHour = formatHour(selectedStartHour, startMinute);
            const endHour = formatHour(selectedEndHour, endMinute);

            const block = {
                estilistaID: stylist.usuarioID,
                fecha: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
                tipoBloqueoID: parseInt(document.getElementById('blockTypeSelect').value),
                horaInicio: startHour,
                horaFinal: endHour,
                descripcion: description,
            };
            console.log('Block:', block);

            try {
                const addedBlock = await createBlock(block);
                setBlocks(prevBlocks => [...prevBlocks, addedBlock]);

                Swal.fire({
                    title: 'Bloqueo creado',
                    text: 'El bloqueo se ha creado correctamente',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error al crear el bloqueo',
                    text: error.message,
                    icon: 'error'
                });
            }
        }
    }); // End of MySwal.fire
}