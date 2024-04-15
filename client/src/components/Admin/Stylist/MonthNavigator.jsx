import React, { useState } from 'react';

export const MonthNavigator = ({ currentDate, onChangeMonth }) => {
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    const handleMonthChange = (event) => {
        const newMonth = parseInt(event.target.value);
        setSelectedMonth(newMonth);
        const newDate = new Date(selectedYear, newMonth - 1, 1);
        onChangeMonth(newDate);
    };

    const handleYearChange = (event) => {
        const newYear = parseInt(event.target.value);
        setSelectedYear(newYear);
        const newDate = new Date(newYear, selectedMonth - 1, 1);
        onChangeMonth(newDate);
    };

    return (
        <div className='flex items-center gap-2'>
            <select className='px-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-blue-500 ' value={selectedMonth} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1} className={selectedMonth === i + 1 ? 'font-bold bg-gray-900 text-white' : ''}>
                        {new Date(selectedYear, i, 1).toLocaleString('default', { month: 'long' })}
                    </option>
                ))}
            </select>
            <select className='px-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-blue-500' value={selectedYear} onChange={handleYearChange}>
                {Array.from({ length: 9 }, (_, i) => {
                    const year = selectedYear - 4 + i;
                    return (
                        <option key={year} value={year} className={`hover:bg-gray-200 ${selectedYear === year ? 'font-bold bg-gray-900 text-white' : ''}`}>
                            {year}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};