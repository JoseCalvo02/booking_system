import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
// Funciones y utils
import { validateForm } from "../../utils/formValidation";
// Estilos personalizados
import customStyles from "../../custom/customStyles";


function PasswordResetForm () {
    const initialValues = {
        passwordNew: "",
        passwordConfirm: "",
    };

    // Función para manejar el envío del formulario de reseteo de contraseña
    const handlePasswordResetForm = async (values, formikHelpers) => {
        // Función para mostrar notificaciones
        const notify = (type, message) => {
            if (type === "success") {
                toast.success(message);
            } else if (type === "error") {
                toast.error(message);
            }
        };

        // Enviar solicitud de reseteo de contraseña y manejar la respuesta
        await handleResetSubmit(values, formikHelpers, notify);
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={handlePasswordResetForm}
        >
            {({ isSubmitting }) => (
                <Form className={customStyles.form}>
                    <h1 className={customStyles.h1}>Restablecer Contraseña</h1>
                    <Field
                        className={customStyles.input}
                        type="password"
                        name="passwordNew"
                        placeholder="Nueva Contraseña"
                    />
                    <ErrorMessage
                        name="passwordNew"
                        component="div"
                        className={customStyles.error}
                    />
                    <Field
                        className={customStyles.input}
                        type="password"
                        name="passwordConfirm"
                        placeholder="Confirmar Contraseña"
                    />
                    <ErrorMessage
                        name="passwordConfirm"
                        component="div"
                        className={customStyles.error}
                    />
                    <button
                        className={twMerge(customStyles.button, "mt-4 hover:bg-primary_h")}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Restablecer
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default PasswordResetForm;