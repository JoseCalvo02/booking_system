import React, { useState, useEffect } from 'react';
import { getWorkingStylistsByDate } from '../../../../api/userApi';

const DateInput = ({ selectedService,  setAvailableStylists, selectedDate, setSelectedDate }) => {
    // Obtener la fecha actual en formato ISO
    const currentDate = new Date().toISOString().split('T')[0];

    // Función de manejo de eventos para actualizar el estado selectedDate
    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
    };

    useEffect(() => {
        if (selectedDate !== '') {
            const fetchStylists = async () => {
                try {
                    const stylists = await getWorkingStylistsByDate(selectedDate);
                    setAvailableStylists(stylists);

                } catch (error) {
                    console.error('Error al obtener los estilistas:', error.message);
                }
            };

            fetchStylists();
        }
    }, [selectedDate]);

    return (
        <input
            disabled={selectedService === ''}
            type="date"
            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={currentDate}
            value={selectedDate}
            onChange={handleDateChange}
        />
    );
}

export default DateInput;