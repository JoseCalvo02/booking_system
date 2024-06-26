import React from 'react';
import { ReactTyped } from 'react-typed';
import VideoHome from '../../assets/VideoHome.mp4';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="h-screen overflow-hidden">
            <video autoPlay loop muted className="absolute inset-0 z-0 object-cover w-full h-full filter brightness-70" src={VideoHome}></video>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                {/* Contenedor de texto */}
                <div className="max-w-[800px] w-full mx-auto text-center">
                    <p className="p-2 font-bold text-white uppercase text-md md:text-xl">
                        Dale color a tu vida
                    </p>
                    <h1 className="text-4xl font-bold lg:text-6xl md:text-5xl md:py-6">
                        Con Studio Once Once
                    </h1>

                    {/* Typed.js */}
                    <div className='flex items-center justify-center '>
                        <p className="py-4 text-xl font-bold md:text-4xl sm:text-3xl">
                            Contamos con
                        </p>
                        <ReactTyped
                            className='pl-2 text-xl font-bold text-primary md:pl-4 md:text-4xl sm:text-3xl '
                            strings={['Esmaltado.', 'Pedicure.', 'Mucho Mas.']} typeSpeed={120} backSpeed={140} loop
                        />
                    </div>

                    <p className='text-xl font-bold text-white md:text-2xl'>
                        Encuentra tu estilo en cada detalle. Bienvenido(a) a Studio Once Once
                    </p>
                    <Link to="/auth?signIn=true">
                        <button className='bg-primary w-[150px] rounded-md font-medium my-6 py-3 text-white hover:bg-primary_h'>Comenzemos</button>
                    </Link>
                </div>{/*End of Text container */}
            </div>
        </section>
    );
}

export default Hero;
