import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
// Funciones y helpers
import { validateForm } from './helpers/formValidation';
import { handleSubmit } from './helpers/formSubmission';
// Estilos personalizados
import customStyles from '../../custom/customStyles';

function SignupForm() {
    const initialValues = {
        name: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: '',
    };

    // Función para manejar el envío del formulario de signup
    const handleSignupForm = async (values, formikHelpers) => {
        // Función para mostrar notificaciones
        const notify = (type, message) => {
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            }
        };

        // Enviar solicitud de registro de usuario y manejar la respuesta
        await handleSubmit(values, formikHelpers, notify);
    };

    return (
        <Formik initialValues={initialValues} validate={validateForm} onSubmit={handleSignupForm}>
            {({ isSubmitting }) => (
                <Form className={customStyles.form}>
                    <h1 className={customStyles.h1}>Registrar Cuenta</h1>
                    <Field className={customStyles.input} type="text" name="name" placeholder="Nombre"/>
                    <ErrorMessage name="name" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="text" name="lastName" placeholder="Apellidos"/>
                    <ErrorMessage name="lastName" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="phone" name="phone" placeholder="Telefono"/>
                    <ErrorMessage name="phone" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="email" name="email" placeholder="Correo"/>
                    <ErrorMessage name="email" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="text" name="address" placeholder="Dirección"/>
                    <ErrorMessage name="address" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="password" name="password" placeholder="Contraseña"/>
                    <ErrorMessage name="password" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="password" name="confirmPassword" placeholder="Contraseña nuevamente"/>
                    <ErrorMessage name="confirmPassword" component="div" className={customStyles.error}/>
                    <button className={twMerge(customStyles.button, 'mt-4 hover:bg-primary_h')} type="submit" disabled={isSubmitting}>Registrarse</button>
                </Form>
            )}
        </Formik>
    )
}

export default SignupForm