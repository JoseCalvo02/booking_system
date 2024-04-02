import React from 'react'
import { useNavigate } from 'react-router-dom'; // Importa hook para navegar a otras páginas
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Importa componentes de Formik
import { toast } from 'react-toastify'; // Importa componente de notificaciones
import { twMerge } from 'tailwind-merge';
// Funciones y helpers
import { validateLoginForm } from '../../../utils/formValidation'; // Importa la función de validación de formulario
import { handleLoginSubmit } from '../../../utils/formSubmission'; // Importa la función de envío de formulario
// Estilos personalizados
import customStyles from '../../custom/customStyles';

function LoginForm({ onLogin }) {
    const navigate = useNavigate(); // Hook para navegar a otras páginas

    const initialValues = {
        email: '',
        password: '',
    };

    // Función para manejar el envío del formulario de Login
    const handleLoginForm = async (values, formikHelpers) => {
        // Función para mostrar notificaciones
        const notify = (type, message) => {
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            }
        };

        // Enviar solicitud de inicio de sesión y manejar la respuesta
        await handleLoginSubmit(values, formikHelpers, navigate, notify, onLogin );
    };

    return (
        <Formik initialValues={initialValues} validate={validateLoginForm} onSubmit={handleLoginForm}>
            {/* Formulario de login */}
            <Form className={customStyles.form} action="">
                <h1 className={customStyles.h1}>Acceder a la Cuenta</h1>
                <Field className={customStyles.input} type="email" name="email" placeholder='Correo'/>
                <ErrorMessage name="email" component="div" className={customStyles.error}/>
                <Field className={customStyles.input} type="password" name="password" placeholder='Contraseña'/>
                <ErrorMessage name="password" component="div" className={customStyles.error}/>
                <a className='text-[#333] text-sm no-underline my-4 hover:underline hover:text-gray-900' href="#">Olvido su contraseña?</a>
                <button className={twMerge(customStyles.button, 'hover:bg-primary_h')} type="submit">Iniciar Sesión</button>
            </Form>
        </Formik >
    );
}

export default LoginForm;