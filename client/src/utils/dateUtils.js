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

// Función para obtener la fecha actual en formato yyyy-mm-dd
export const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Función para formatear la fecha en "dd/mm/yyyy" desde una cadena de fecha ISO
export const formatDate = (dateString) => {
    // Parsear la cadena de fecha ISO 8601 directamente en UTC
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
    const year = date.getUTCFullYear();

    // Formatear la fecha manualmente
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};