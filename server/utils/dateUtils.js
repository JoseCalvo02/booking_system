// Function to convert hh:mm time format to minutes
const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Function to check if there's any overlap between blocks
export const checkOverlap = (block, blocks) => {
    const newBlockStart = timeToMinutes(block.horaInicio);
    const newBlockEnd = timeToMinutes(block.horaFinal);

    for (const existingBlock of blocks) {
        const existingBlockStart = timeToMinutes(existingBlock.horaInicio);
        const existingBlockEnd = timeToMinutes(existingBlock.horaFinal);

        if (
            (newBlockStart >= existingBlockStart && newBlockStart < existingBlockEnd) || // Verifica si el nuevo bloque comienza durante la duración de un bloque existente.
            (newBlockEnd > existingBlockStart && newBlockEnd <= existingBlockEnd) || // Verifica si el nuevo bloque termina durante la duración de un bloque existente.
            (existingBlockStart >= newBlockStart && existingBlockStart < newBlockEnd) || // Verifica si un bloque existente comienza durante la duración del nuevo bloque.
            (existingBlockEnd > newBlockStart && existingBlockEnd <= newBlockEnd) // Verifica si un bloque existente termina durante la duración del nuevo bloque.
        ) {
            return true; // There's overlap
        }
    }

    return false; // No overlap
};