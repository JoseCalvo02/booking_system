import React from 'react';
import FondoClient from '../../../assets/Sunset.jpg';
import prueba2 from '../../../assets/prueba2.jpg';
import prueba3 from '../../../assets/prueba3.jpg';

function ServicesContent() {
    return (
        <main className='flex flex-col w-3/4 m-auto'>
            <section className='flex flex-grow gap-8 m-auto mt-24'>
                <div className='w-full'>
                    <h2 className='p-2 text-4xl font-bold text-center'>Servicios</h2>
                    <div className='grid grid-cols-1 p-4 md:grid-cols-2'>
                        <div className='overflow-hidden transition duration-300 transform scale-100 shadow-xl group h-96'>
                            <div className='border border-gray-300 shadow-md h-96'>
                                <div className='p-4'>
                                    <h3 className='mb-4 text-2xl font-bold text-center'>Manicura</h3>
                                    <p className='text-lg text-gray-800'>Disfruta de un tratamiento de manicura profesional para cuidar y embellecer tus uñas. Nuestros especialistas te ofrecen una experiencia relajante y de alta calidad.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='overflow-hidden transition duration-300 transform shadow-xl group h-96'>
                            <div className='border-gray-300 shadow-md h-96 bg-zinc-300 '>
                                <div className='h-96'>
                                    <img src={prueba2} alt='Fondo' className='object-cover w-full h-full' />
                                </div>
                            </div>
                        </div>
                        
                        <div className='overflow-hidden transition duration-300 transform shadow-xl group h-96'>
                        <div className='h-96'>
                                    <img src={prueba3} alt='Fondo' className='object-cover w-full h-full' />
                                </div>
                        </div>

                        <div className='overflow-hidden transition duration-300 transform shadow-xl group h-96'>
                            <div className='border border-gray-300 shadow-md h-96'>
                                <div className='p-4'>
                                    <h3 className='mb-4 text-2xl font-bold text-center'>Facial</h3>
                                    <p className='text-lg text-gray-800'>Experimenta la frescura y rejuvenecimiento con nuestros tratamientos faciales personalizados. Utilizamos productos de alta calidad y técnicas avanzadas para cuidar tu piel.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='overflow-hidden transition duration-300 transform shadow-xl group h-96'>
                            <div className='border border-gray-300 shadow-md h-96'>
                                <div className='p-4'>
                                    <h3 className='mb-4 text-2xl font-bold text-center'>Facial</h3>
                                    <p className='text-lg text-gray-800'>Experimenta la frescura y rejuvenecimiento con nuestros tratamientos faciales personalizados. Utilizamos productos de alta calidad y técnicas avanzadas para cuidar tu piel.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='overflow-hidden transition duration-300 transform shadow-xl group h-96'>
                                <div className='h-96'>
                                    <img src={prueba2} alt='Fondo' className='object-cover w-full h-full' />
                                </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ServicesContent;


