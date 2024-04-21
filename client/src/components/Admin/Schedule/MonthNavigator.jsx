import React, { useState } from 'react';

export const MonthNavigator = ({ currentDate, onChangeMonth }) => {
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    // Function to handle the change of month
    const handleMonthChange = (event) => {
        const newMonth = parseInt(event.target.value);
        setSelectedMonth(newMonth);
        const newDate = new Date(selectedYear, newMonth - 1, 1); // Set the new date with the selected month
        onChangeMonth(newDate);
    };

    // Function to handle the change of year
    const handleYearChange = (event) => {
        const newYear = parseInt(event.target.value);
        setSelectedYear(newYear);
        const newDate = new Date(newYear, selectedMonth - 1, 1); // Set the new date with the selected year
        onChangeMonth(newDate);
    };

    return (
        <div className='flex items-center gap-2'>
            {/* Selector for month */}
            <select className='px-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-blue-500 ' value={selectedMonth} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1} className={selectedMonth === i + 1 ? 'checked:bg-primary font-bold text-white' : ''}>
                        {new Date(selectedYear, i, 1).toLocaleString('default', { month: 'long' })} {/* Get the month name */}
                    </option>
                ))}
            </select>
            {/* Selector for year */}
            <select className='px-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-blue-500' value={selectedYear} onChange={handleYearChange}>
                {Array.from({ length: 9 }, (_, i) => {
                    const year = selectedYear - 4 + i;
                    return (
                        <option key={year} value={year} className={selectedYear === year ? 'checked:bg-primary font-bold text-white' : ''}>
                            {year}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};