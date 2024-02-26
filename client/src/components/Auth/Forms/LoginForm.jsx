import React from 'react'
import { useNavigate } from 'react-router-dom'; // Importa hook para navegar a otras páginas
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Importa componentes de Formik
import { toast } from 'react-toastify'; // Importa componente de notificaciones
// Funciones y helpers
import { validateLoginForm } from './helpers/formValidation'; // Importa la función de validación de formulario
import { handleLoginSubmit } from './helpers/formSubmission'; // Importa la función de envío de formulario
// Estilos personalizados
import customStyles from '../../custom/customStyles';

function LoginForm() {
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
        await handleLoginSubmit(values, { setSubmitting: formikHelpers, navigate }, notify);
    };

    return (
        <Formik initialValues={initialValues} validate={validateLoginForm} onSubmit={handleLoginForm}>
            {/* Formulario de login */}
            <Form className={customStyles.form} action="">
                <h1 className={customStyles.h1}>Access account</h1>
                <Field className={customStyles.input} type="email" name="email" placeholder='Email'/>
                <ErrorMessage name="email" component="div" className={customStyles.error}/>
                <Field className={customStyles.input} type="password" name="password" placeholder='Password'/>
                <ErrorMessage name="password" component="div" className={customStyles.error}/>
                <a className='text-[#333] text-sm no-underline my-4 hover:underline hover:text-gray-900' href="#">Forgot your password?</a>
                <button className={customStyles.button + ' hover:bg-primary_h'}>Login</button>
            </Form>
        </Formik >
    );
}

export default LoginForm;