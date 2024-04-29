import React, { useState, useEffect  } from 'react';

import { roundServiceDuration } from '../../../utils/dateUtils';

const SelectHour = ({ selectedStylist, selectedService, stylistSchedule, stylistBlocks, selectedTimeSlot, setSelectedTimeSlot }) => {
    // Estados para almacenar los datos de los estilistas y horarios disponibles
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    useEffect(() => {
        // Función para generar los segmentos de tiempo disponibles
        const generateAvailableTimeSlots = () => {
            if (!selectedStylist || !selectedService || !stylistSchedule || !stylistBlocks) {
                return;
            }

            const availableSlots = [];

            // Obtener el tiempo estimado del servicio seleccionado
            const serviceTimeEstimate = selectedService ? roundServiceDuration(selectedService.tiempoEstimado) : '00:30'; // Tiempo estimado por defecto: 30 minutos

            // Convertir el tiempo estimado a minutos
            const [hours, minutes] = serviceTimeEstimate.split(':');
            const serviceTimeInMinutes = parseInt(hours) * 60 + parseInt(minutes);

            // Obtener hora de inicio y fin del horario de la estilista
            const { horaInicio, horaFinal } = stylistSchedule;

            // Convertir hora de inicio y fin a objetos Date
            const startDateTime = new Date(`2000-01-01T${horaInicio}`);
            const endDateTime = new Date(`2000-01-01T${horaFinal}`);

            // Filtrar los bloqueos del horario de la estilista
            const blockedTimeRanges = stylistBlocks.map(block => {
                const blockStartDateTime = new Date(`2000-01-01T${block.horaInicio}`);
                const blockEndDateTime = new Date(`2000-01-01T${block.horaFinal}`);
                return [blockStartDateTime, blockEndDateTime];
            });

            // Iterar desde la hora de inicio hasta la hora final y agregar los segmentos disponibles
            let currentTime = startDateTime;
            while (currentTime < endDateTime) {
                // Calcular el tiempo final sumando el tiempo estimado del servicio
                let endTime = new Date(currentTime.getTime() + serviceTimeInMinutes * 60000); // Convertir minutos a milisegundos

                // Verificar si el tiempo final excede la hora de salida
                if (endTime > endDateTime) {
                    break; // Salir del bucle si el tiempo final excede la hora de salida
                }

                // Verificar si el segmento disponible choca con algún bloque de tiempo
                const isOverlap = blockedTimeRanges.some(([blockStart, blockEnd]) => {
                    // Condición 1: El tiempo actual está dentro del bloque de tiempo
                    const condition1 = currentTime >= blockStart && currentTime < blockEnd;
                    // Condición 2: El tiempo final está dentro del bloque de tiempo
                    const condition2 = endTime > blockStart && endTime <= blockEnd;
                    // Condición 3: El bloque de tiempo está completamente dentro del segmento disponible
                    const condition3 = currentTime <= blockStart && endTime >= blockEnd;

                    // Si alguna de las condiciones es verdadera, hay solapamiento
                    return condition1 || condition2 || condition3;
                });

                if (!isOverlap && endTime <= endDateTime) {
                    // Formatear el tiempo actual y el tiempo final a cadenas de formato HH:MM
                    const formattedStartTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    availableSlots.push(`${formattedStartTime}-${formattedEndTime}`)
                    // Establecer el tiempo actual en el tiempo final del bloque
                    currentTime = endTime;
                } else {
                    // Si hay solapamiento, establecer el tiempo actual en el tiempo final del bloque
                    currentTime = blockedTimeRanges.reduce((nextTime, [blockStart, blockEnd]) => {
                        if (blockEnd > currentTime && (nextTime === null || blockStart < nextTime)) {
                            return blockEnd;
                        }
                        return nextTime;
                    }, null);
                }
            }


            console.log(availableSlots);
            setAvailableTimeSlots(availableSlots);
        };

        generateAvailableTimeSlots();
    }, [selectedStylist, selectedService, stylistSchedule, stylistBlocks]);

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    return (
        <select
            disabled={selectedStylist === ''}
            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTimeSlot} // Establecer el valor seleccionado del select
            onChange={handleTimeSlotChange}
        >
            <option value="" defaultValue hidden className="text-gray-500">
                Seleccionar hora
            </option>
            {availableTimeSlots.map((timeSlot) => (
                <option key={timeSlot} value={timeSlot}>
                    {timeSlot}
                </option>
            ))}
        </select>
    );
}

export default SelectHour;
