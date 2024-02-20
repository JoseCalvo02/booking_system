import { registerUser } from '../../../../api/authApi';

// Manejar el envío del formulario
export const handleSubmit = async (values, { setSubmitting }, notify) => {
    try {
        const response = await registerUser(values);
        // Verificar si hay algún mensaje de éxito en la respuesta y mostrarlo
        if (response && response.message) {
            notify('success', response.message);
        }
    } catch (error) {
        // Error al hacer la solicitud, manejarlo adecuadamente
        console.error('Error al registrar usuario:', error);

        // Verificar si el error contiene un mensaje específico del servidor
        if (error.message) {
            // Mostrar el mensaje de error específico del servidor
            notify('error', error.message);
        } else {
            // Si no hay un mensaje de error específico del servidor, mostrar el mensaje de error genérico
            notify('error', 'Error al registrar usuario');
        }
    } finally {
        setSubmitting(false);
    }
};