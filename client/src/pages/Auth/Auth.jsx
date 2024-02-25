// Paquetes y bibliotecas externas
import React, { useState }  from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
// Componentes
import Navbar from '../../components/Shared/Navbar/Navbar';
// Funciones y helpers
import { validateForm, validateLoginForm } from './helpers/formValidation';
import { handleSubmit, handleLoginSubmit } from './helpers/formSubmission';
// Estilos personalizados
import customStyles from '../../config/customStyles';


//Componente Page "Auth"
export default function Auth() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const signInParam = params.get('signIn');
    const [signIn, setSignIn] = React.useState(signInParam === 'true');

    const toggleSignIn = () => {
        setSignIn(!signIn);
    };

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
        <div>
            <Navbar />

            {/* Auth page container */}
            <div className='bg-[#f6f5f7] flex justify-center items-center flex-col h-[100vh]'>
                <div className='relative max-h-full overflow-hidden shadow-2xl bg-white rounded-lg min-h-[700px] w-[850px] hover:shadow-none'>

                    {/* SignUp container */}
                    <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 ${signIn ? 'opacity-0 z-0' : 'opacity-100 z-10 transform translate-x-full'}`}>
                        {/* Signup Form*/}
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
                    </div>

                    {/* LogIn container */}
                    <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-2 ${signIn ? 'opacity-100' : 'opacity-0 transform translate-x-full'}`}>
                        <Formik initialValues={initialValues} validate={validateLoginForm} onSubmit={handleLoginSubmit}>
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
                    </div>

                    {/* Overlay container */}
                    <div className={`absolute top-0 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out left-1/2 z-10 ${signIn ? '' : 'transform -translate-x-full'}`}>
                        {/* Overlay Panel */}
                        <div className={`bg-gradient-to-r from-primary to-primary_h relative -left-full text-white h-full w-[200%] transition-transform ease-in-out duration-700 ${signIn ? ' transform translate-x-0' : 'transform translate-x-1/2'}`}>

                            {/* Left Overlay panel - Signup Panel */}
                            <div className={`absolute flex flex-col justify-center items-center px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out transform ${signIn ? '-translate-x-[20%]' : 'translate-x-0'}`}>
                                <h1 className={customStyles.h1}>Hello, Friend!</h1>
                                <p className='text-sm font-thin leading-5 tracking-[0.5px] mt-5 mb-7'>Enter your personal details and start a journey with us!</p>
                                <button className={customStyles.button + ' bg-transparent border-white'} onClick={toggleSignIn}>Login</button>
                            </div>

                            {/* Right Overlay panel - Login Panel */}
                            <div className={`absolute flex flex-col justify-center items-center px-10 text-center top-0 right-0 h-full w-1/2 transition-transform duration-700 ease-in-out transform ${signIn ? 'translate-x-0' : ' translate-x-[20%]'}`}>
                                <h1 className={customStyles.h1}>Welcome Back!</h1>
                                <p className='text-sm font-thin leading-5 tracking-[0.5px] mt-5 mb-7'>To keep connected with us please login with your personal info</p>
                                <button className={customStyles.button + ' bg-transparent border-white'} onClick={toggleSignIn}>SignUp</button>
                            </div>
                        </div>
                    </div>{/*End of Overlay container */}

                </div>
            </div>{/*End of Auth page container */}

        </div>
    );
}

