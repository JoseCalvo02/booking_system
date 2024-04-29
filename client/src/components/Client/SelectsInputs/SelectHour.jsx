import React, { useState, useEffect  } from 'react';

const SelectHour = ({ selectedStylist, selectedService, stylistSchedule, stylistBlocks }) => {
    // Estados para almacenar los datos de los estilistas y horarios disponibles
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    useEffect(() => {
        // Función para generar los segmentos de tiempo disponibles
        const generateAvailableTimeSlots = () => {
            const availableSlots = [];

            // Obtener el tiempo estimado del servicio seleccionado
            const serviceTimeEstimate = selectedService ? roundServiceDuration(selectedService.tiempoEstimado) : '00:30'; // Tiempo estimado por defecto: 30 minutos
            console.log(serviceTimeEstimate);

            // Convertir el tiempo estimado a minutos
            const [hours, minutes] = serviceTimeEstimate.split(':');
            const serviceTimeInMinutes = parseInt(hours) * 60 + parseInt(minutes);

            // Obtener hora de inicio y fin del horario de la estilista
            const { horaInicio, horaFinal } = stylistSchedule;

            // Convertir hora de inicio y fin a objetos Date
            const startDateTime = new Date(`2000-01-01T${horaInicio}`);
            const endDateTime = new Date(`2000-01-01T${horaFinal}`);

            // Iterar desde la hora de inicio hasta la hora final y agregar los segmentos disponibles
            let currentTime = startDateTime;
            while (currentTime <= endDateTime) {
                // Calcular el tiempo final sumando el tiempo estimado del servicio
                const endTime = new Date(currentTime.getTime() + serviceTimeInMinutes * 60000); // Convertir minutos a milisegundos

                // Si el tiempo final supera la hora de salida, no agregar más segmentos y salir del bucle
                if (endTime > endDateTime) {
                    break;
                }

                // Formatear el tiempo actual y final a una cadena de formato HH:MM
                const formattedStartTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                // Agregar el intervalo de tiempo al array de slots disponibles
                availableSlots.push(`${formattedStartTime}-${formattedEndTime}`);

                // Aumentar el tiempo actual por el tiempo estimado del servicio en minutos para la siguiente iteración
                currentTime = endTime;
            }

            console.log(availableSlots);
            setAvailableTimeSlots(availableSlots);
        };

        if (selectedStylist && selectedService && stylistSchedule && stylistBlocks) {
            generateAvailableTimeSlots();
        }
    }, [selectedStylist, selectedService, stylistSchedule, stylistBlocks]);

    // Función para redondear la duración del servicio a intervalos de 30 minutos o 1 hora
    const roundServiceDuration = (serviceTimeEstimate) => {
        const [hours, minutes] = serviceTimeEstimate.split(':');
        let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

        // Si los minutos son 00 o 30, no se redondea
        if (minutes !== '00' && minutes !== '30') {
            // Redondear la duración del servicio a intervalos de 30 minutos o 1 hora
            totalMinutes = totalMinutes % 60 < 30 ? Math.floor(totalMinutes / 60) * 60 : Math.ceil(totalMinutes / 60) * 60;
        }

        // Calcular la duración redondeada en formato HH:MM
        const roundedDurationHours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
        const roundedDurationMinutes = String(totalMinutes % 60).padStart(2, '0');

        return `${roundedDurationHours}:${roundedDurationMinutes}`;
    };

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
