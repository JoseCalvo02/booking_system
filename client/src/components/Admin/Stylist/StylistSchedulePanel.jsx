import React, { useState } from 'react';

import {MonthNavigator} from './MonthNavigator';
import customStyles from '../../../custom/customStyles';

const StylistSchedulePanel = ({stylist}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getDayName = (date) => {
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return dayNames[date.getDay()];
    };

    const renderDaysOfMonth = () => {
        const days = [];
        const numDays = daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());

        for (let day = 1; day <= numDays; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const dayName = getDayName(date);
            days.push(
                <tr key={day} className='hover:bg-gray-100'>
                    <td className={customStyles.td}>{day}</td>
                    <td className={customStyles.td}>{dayName}</td>
                    <td className={customStyles.td}></td>
                    <td className={customStyles.td}></td>
                    <td className={customStyles.td} >
                        <button className='p-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'>Ver Bloqueos</button>
                    </td>
                </tr>
            );
        }

        return days;
    };

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
                    {renderDaysOfMonth()}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default StylistSchedulePanel;
