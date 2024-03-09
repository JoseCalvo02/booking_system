import { registerUser, loginUser } from '../../../../api/authApi';
import { jwtDecode } from 'jwt-decode';

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

// Manejar el envío del formulario de login
export const handleLoginSubmit = async (values, { setSubmitting }, navigate, notify) => {
    try {
        // Enviar solicitud de inicio de sesión y manejar la respuesta
        const response = await loginUser(values);

        if (response && response.token) { // Verificar si hay algún mensaje de éxito en la respuesta y mostrarlo
            notify('success', response.message);

            // Decodificar el token JWT para obtener la información del usuario, como el rol
            const decodedToken = jwtDecode(response.token);
            const userRole = decodedToken.role;

            // Redirigir al usuario según su rol
            if (userRole === 'Administrador') {
                navigate('/admin');
            } else if (userRole === 'Estilista') {
                navigate('/stylist');
            } else {
                navigate('/client');
            }
        }
    } catch (error) {
        // Error al hacer la solicitud, manejarlo adecuadamente
        console.error('Error al iniciar sesión', error);

        // Verificar si el error contiene un mensaje específico del servidor
        if (error.message) {
            // Mostrar el mensaje de error específico del servidor
            notify('error', error.message);
        } else {
            // Si no hay un mensaje de error específico del servidor, mostrar el mensaje de error genérico
            notify('error', 'Error al iniciar sesión');
        }
    } finally {
        setSubmitting(false);
    }
};