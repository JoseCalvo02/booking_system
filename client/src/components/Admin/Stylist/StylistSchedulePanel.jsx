import React, { useEffect, useState } from 'react';
// Functions / Api / Components
import { getSchedulesByStylist } from '../../../../api/scheduleApi';
import { MonthNavigator } from './MonthNavigator';
// Styles
import customStyles from '../../../custom/customStyles';

const StylistSchedulePanel = ({stylist}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const schedules = await getSchedulesByStylist(stylist._id, currentMonth.getFullYear(), currentMonth.getMonth()+1);
                setSchedule(schedules);
            } catch (error) {
                console.error('Error al obtener el horario:', error.message);
            }
        }
        fetchSchedule();
    }, [currentMonth]);

    // Function to get the number of days in a given month and year
    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Function to get the name of the day from a given date
    const getDayName = (date) => {
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return dayNames[date.getDay()];
    };

    // Function to handle the change of month
    const handleChangeMonth = (newMonth) => {
        setCurrentMonth(newMonth);
    };

    return (
        <>
        <div className='flex mb-2 '>
            <MonthNavigator currentDate={currentMonth} onChangeMonth={handleChangeMonth} />
            <div className='flex justify-end flex-grow gap-2 text-white' >
                <button className='p-2 bg-green-500 rounded-lg hover:bg-green-600'>+ Horario</button>
                <button className='p-2 bg-red-500 rounded-lg hover:bg-red-600'>+ Bloqueo</button>
            </div>
        </div>


        <div className='overflow-y-auto max-h-[58vh]'>
            {/* Renderización de los días y horas del horario */}
            <table className='w-full'>
                <thead className={customStyles.thead}>
                    <tr>
                        <th className={customStyles.th}>Fecha</th>
                        <th className={customStyles.th}>Día</th>
                        <th className={customStyles.th}>Hora Inicio</th>
                        <th className={customStyles.th}>Hora Salida</th>
                        <th className={customStyles.th}>Bloqueos</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                    {/* Creating an array with the number of days in the current month, and mapping over it to generate elements */}
                    {Array.from({ length: daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear()) }, (_, index) => {
                        const day = index + 1; // Obtener el día actual en el bucle, empezando desde 1
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day); // Crear una nueva fecha con el día actual en el bucle
                        const dayName = getDayName(date); // Obtener el nombre del día

                        return (
                            <tr key={day} className='hover:bg-gray-100'>
                                <td className={customStyles.td}>{day}</td>
                                <td className={customStyles.td}>{dayName}</td>
                                <td className={customStyles.td}></td>
                                <td className={customStyles.td}></td>
                                <td className={customStyles.td}>
                                    <button className='p-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'>Ver Bloqueos</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default StylistSchedulePanel;
