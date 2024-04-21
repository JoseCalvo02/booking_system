// Function to get the number of days in a given month and year
export const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
};

// Function to get the name of the day from a given date
export const getDayName = (date) => {
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dayNames[date.getDay()];
};