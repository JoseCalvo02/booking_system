import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
// Funciones y helpers
import { validateForm } from '../../components/Forms/helpers/formValidation';
import { handleSubmit } from '../../components/Forms/helpers/formSubmission';
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
                    <h1 className={customStyles.h1}>Create account</h1>
                    <Field className={customStyles.input} type="text" name="name" placeholder="Name"/>
                    <ErrorMessage name="name" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="text" name="lastName" placeholder="Last Name"/>
                    <ErrorMessage name="lastName" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="phone" name="phone" placeholder="Phone"/>
                    <ErrorMessage name="phone" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="email" name="email" placeholder="Email"/>
                    <ErrorMessage name="email" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="text" name="address" placeholder="Address"/>
                    <ErrorMessage name="address" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="password" name="password" placeholder="Password"/>
                    <ErrorMessage name="password" component="div" className={customStyles.error}/>
                    <Field className={customStyles.input} type="password" name="confirmPassword" placeholder="Password again"/>
                    <ErrorMessage name="confirmPassword" component="div" className={customStyles.error}/>
                    <button className={customStyles.button + ' mt-4 hover:bg-primary_h'} type="submit" disabled={isSubmitting}>Signup</button>
                </Form>
            )}
        </Formik>
    )
}

export default SignupForm