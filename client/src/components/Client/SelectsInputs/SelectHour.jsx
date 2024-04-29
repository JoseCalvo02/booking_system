import React, { useState, useEffect  } from 'react';

import { roundServiceDuration } from '../../../utils/dateUtils';

const SelectHour = ({ selectedStylist, selectedService, stylistSchedule, stylistBlocks }) => {
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

            console.log(stylistBlocks);
            // Filtrar los bloqueos del horario de la estilista
            const blockedTimeRanges = stylistBlocks.map(block => {
                const [blockStartHour, blockStartMinute] = block.horaInicio.split(':');
                const [blockEndHour, blockEndMinute] = block.horaFinal.split(':');
            
                // Obtener la fecha real de los bloqueos
                const blockStartDateTime = new Date(block.fecha);
                console.log(blockStartHour, blockStartMinute)
                console.log(blockEndHour, blockEndMinute);
                blockStartDateTime.setHours(parseInt(blockStartHour), parseInt(blockStartMinute), 0, 0);
                console.log(blockStartDateTime);
            
                const blockEndDateTime = new Date(block.fecha);
                blockEndDateTime.setHours(parseInt(blockEndHour), parseInt(blockEndMinute), 0, 0);
            
                return [blockStartDateTime, blockEndDateTime];
            });

            console.log(blockedTimeRanges);

            // Iterar desde la hora de inicio hasta la hora final y agregar los segmentos disponibles
            let currentTime = startDateTime;
            while (currentTime < endDateTime) { // Cambiar la condición para que sea estrictamente menor que la hora de finalización
                // Calcular el tiempo final sumando el tiempo estimado del servicio
                let endTime = new Date(currentTime.getTime() + serviceTimeInMinutes * 60000); // Convertir minutos a milisegundos

                // Verificar si el tiempo final excede la hora de salida
                if (endTime > endDateTime) {
                    break; // Salir del bucle si el tiempo final excede la hora de salida
                }

                // Verificar si el segmento está bloqueado
                const isSegmentBlocked = blockedTimeRanges.some(([blockStart, blockEnd]) => {
                    return (currentTime >= blockStart && currentTime < blockEnd) || (endTime > blockStart && endTime <= blockEnd);
                });

                // Si el segmento no está bloqueado, agregarlo a la lista de segmentos disponibles
                if (!isSegmentBlocked) {
                    // Formatear el tiempo actual y el tiempo final a cadenas de formato HH:MM
                    const formattedStartTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    // Agregar el intervalo de tiempo al array de slots disponibles
                    availableSlots.push(`${formattedStartTime}-${formattedEndTime}`);
                }

                // Aumentar el tiempo actual por el tiempo estimado del servicio en minutos
                currentTime = new Date(endTime); // Usar el tiempo final como nuevo tiempo actual
            }

            console.log(availableSlots);
            setAvailableTimeSlots(availableSlots);
        };

        generateAvailableTimeSlots();
    }, [selectedStylist, selectedService, stylistSchedule, stylistBlocks]);


    return (
        <select
            disabled={selectedStylist === ''}
            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
