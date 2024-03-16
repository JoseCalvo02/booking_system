// Paquetes y bibliotecas externas
import React, { useState }  from 'react'
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
// Componentes
import Navbar from '../../components/Shared/Navbar/Navbar';
import SignupForm from '../../components/Auth/SignupForm';
import LoginForm from '../../components/Auth/LoginForm';
// Estilos personalizados
import customStyles from '../../custom/customStyles';
import Video3 from '../../assets/Video3.mp4';

//Componente Page "Auth"
export default function Auth() {
    const { search } = useLocation(); // Hook para obtener la ubicación actual
    const params = new URLSearchParams(search); // Objeto URLSearchParams para obtener los parámetros de la URL
    const signInParam = params.get('signIn'); // Obtener el valor del parámetro "signIn" de la URL
    const [signIn, setSignIn] = React.useState(signInParam === 'true'); // Estado para controlar ambos formularios

    // Función para cambiar entre los formularios de registro e inicio de sesión
    const toggleSignIn = () => {
        setSignIn(!signIn);
    };

    return (
        <div>
            <Navbar />

            {/* Auth page container */}
            <div className=' flex justify-center items-center flex-col h-[100vh]'>
                <video autoPlay loop muted className="absolute inset-0 object-cover w-full h-full opacity-30 filter" src={Video3}></video>
                <div className='relative max-h-full overflow-hidden shadow-2xl bg-white rounded-xl min-h-[700px] w-[850px] hover:shadow-none'>

                    {/* SignUp container */}
                    <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 ${signIn ? 'opacity-0 z-0' : 'opacity-100 z-10 transform translate-x-full'}`}>
                        {/* Signup Form component: Formik*/}
                        <SignupForm/>
                    </div>

                    {/* LogIn container */}
                    <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-2 ${signIn ? 'opacity-100' : 'opacity-0 transform translate-x-full'}`}>
                        {/* Login Form component: Formik */}
                        <LoginForm/>
                    </div>

                    {/* Overlay container */}
                    <div className={`absolute top-0 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out left-1/2 z-10 ${signIn ? '' : 'transform -translate-x-full'}`}>
                        {/* Overlay Panel */}
                        <div className={`bg-gradient-to-r from-primary to-primary_h relative -left-full text-white h-full w-[200%] transition-transform ease-in-out duration-700 ${signIn ? ' transform translate-x-0' : 'transform translate-x-1/2'}`}>

                            {/* Left Overlay panel - Signup Panel */}
                            <div className={`absolute flex flex-col justify-center items-center px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out transform ${signIn ? '-translate-x-[20%]' : 'translate-x-0'}`}>
                                <h1 className={customStyles.h1}>Hola, amigo(a)</h1>
                                <p className='text-sm font-thin leading-5 tracking-[0.5px] mt-5 mb-7'>Introduce tus datos personales y comienza un viaje con nosotros!</p>
                                <button className={twMerge(customStyles.button, 'bg-transparent border-white')} onClick={toggleSignIn}>Inicio Sesión</button>
                            </div>

                            {/* Right Overlay panel - Login Panel */}
                            <div className={`absolute flex flex-col justify-center items-center px-10 text-center top-0 right-0 h-full w-1/2 transition-transform duration-700 ease-in-out transform ${signIn ? 'translate-x-0' : ' translate-x-[20%]'}`}>
                                <h1 className={customStyles.h1}>Bienvenido(a) de Nuevo!</h1>
                                <p className='text-sm font-thin leading-5 tracking-[0.5px] mt-5 mb-7'>Para mantenerse conectado con nosotros, inicie sesión con su información personal</p>
                                <button className={twMerge(customStyles.button, 'bg-transparent border-white')} onClick={toggleSignIn}>registrarse</button>
                            </div>
                        </div>
                    </div>{/*End of Overlay container */}

                </div>
            </div>{/*End of Auth page container */}

        </div>
    );
}