import { registerUser } from '../../../../api/authApi';

// Manejar el envío del formulario
export const handleSubmit = async (values, { setSubmitting }) => {
    try {
        console.log("Valores enviados: " , values);
        await registerUser(values);
        // Aquí podrías manejar la redirección o mostrar un mensaje de éxito
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
        setSubmitting(false);
    }
};