import React from 'react';
import {
    FaWhatsapp,
    FaInstagram,
    FaTwitterSquare,
} from 'react-icons/fa';

export default function Footer() {
    return (
        <section className='w-full text-white bg-gray-900'>
            <div className='grid gap-8 px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:grid-cols-2'>
                <div className="lg:col-span-1">
                    {/* Logo y Nombre */}
                    <div className='flex w-full gap-1 text-2xl font-bold'>
                        <h1 className="text-white">Studio</h1>
                        <h1 className="text-primary">Once Once</h1>
                    </div>
                    <p className='py-4 text-sm text-gray-400 sm:text-base md:text-lg lg:text-base'>Un espacio creativo donde tus ideas cobran vida. Explora nuestro mundo de diseño y creatividad.</p>
                    <div className='flex justify-between md:w-[30%] my-6'>
                        <a href='https://www.instagram.com/studionce_once/' target='_blank'><FaInstagram size={30} className='hover:text-blue-500' /></a>
                        <a href='https://www.instagram.com/fabistudio_nails/' target='_blank'><FaTwitterSquare size={30} className='hover:text-blue-500' /></a>
                        <a href='https://api.whatsapp.com/send?phone=50689312332' target='_blank'><FaWhatsapp size={30} className='hover:text-blue-500' /></a>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between lg:col-span-1'>
                    <div className="w-full mb-8 sm:w-auto sm:mb-0">
                        <h6 className='mb-2 font-bold'>Citas</h6>
                        <ul className='py-2'>
                            <li><a href="/client" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Agendar cita</a></li>
                            <li><a href="/client" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Reprogramar cita</a></li>
                            <li><a href="/client" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Cancelar cita</a></li>
                        </ul>
                    </div>
                    
                    <div className="w-full mb-8 sm:w-auto sm:mb-0">
                        <h6 className='mb-2 font-bold'>Dirección</h6>
                        <ul className='py-2'>
                            <li>Alajuela, San Carlos</li>
                            <li>Ciudad Quesada, Barrio el Jardin</li>
                            <li>300 metros norte de Maxi Pali, Local #4</li>
                        </ul>
                    </div>                      
                </div>
            </div>
            <p>
                <span className='block py-4 text-sm text-center text-gray-400'>
                    &copy; 2024 Studio Once Once. Todos los derechos reservados.
                </span>
            </p>
        </section>
    );
}



