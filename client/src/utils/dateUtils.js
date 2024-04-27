// Function to get the number of days in a given month and year
export const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
};

// Function to get the name of the day from a given date
export const getDayName = (date) => {
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dayNames[date.getDay()];
};

// Función para convertir un número de hora en un formato de tiempo compatible con la base de datos
export const formatHour = (hour, min = '') => {
    // Añadir un cero delante si la hora es menor que 10 (para que tenga dos dígitos)
    const formattedHour = hour < 10 ? `0${hour}` : hour.toString();

    if (min !== '') {
        return `${formattedHour}:${min}`;
    }

    // Retornar la hora formateada en formato de 24 horas (HH:mm)
    return `${formattedHour}:00`;
};

export const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};