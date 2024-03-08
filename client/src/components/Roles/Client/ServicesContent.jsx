import React from 'react';
import Manicure from '../../../assets/Manicure.jpg';
import Pedicure from '../../../assets/Pedicure.jpg';
import Masaje from '../../../assets/Masaje.jpg';
import Facial from '../../../assets/Facial.jpg';
import Ceja from '../../../assets/Ceja.jpg';

function ServicesContent() {
    return (
        <main className='flex flex-col w-full m-auto mt-32' id='services'>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black mt-10 align-middle m-auto">Servicios más Utilizados</h1>
            <section className='flex flex-wrap justify-center w-full gap-8 m-auto mb-20 mt-'>
                {/* Card 1 */}
                <div className="flex flex-col overflow-hidden text-gray-700 transition duration-500 transform bg-white shadow-md bg-clip-border rounded-xl w-96 hover:scale-105 hover:shadow-xl">
                    <div className="relative overflow-hidden">
                        <img
                            src={Manicure}
                            alt="card-image" className="object-cover w-full h-56 md:h-64 lg:h-72 xl:h-96" />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                Manicure
                            </p>
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                ₡ 15,000
                            </p>
                        </div>
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                            Nuestro servicio de manicura ofrece un cuidado completo para tus uñas. Incluye limado, pulido,
                            eliminación de cutículas y aplicación de esmalte según tu preferencia.
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <button className='bg-primary hover:bg-primary_h text-white align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'>
                            Reservar</button>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="flex flex-col overflow-hidden text-gray-700 transition duration-500 transform bg-white shadow-md bg-clip-border rounded-xl w-96 hover:scale-105 hover:shadow-xl">
                    <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border rounded-t-xl">
                        <img
                            src={Pedicure}
                            alt="card-image" className="object-cover w-full h-56 md:h-64 lg:h-72 xl:h-96" />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                Pedicure
                            </p>
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                ₡ 15,000
                            </p>
                        </div>
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                            Nuestro pedicure es un tratamiento completo para tus pies. Incluye remojo, limado, eliminación de callosidades, 
                            masaje relajante y aplicación de esmalte si lo deseas.
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <button className='bg-primary hover:bg-primary_h text-white align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'>
                            Reservar</button>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="flex flex-col overflow-hidden text-gray-700 transition duration-500 transform bg-white shadow-md bg-clip-border rounded-xl w-96 hover:scale-105 hover:shadow-xl">
                    <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border rounded-t-xl">
                        <img
                            src={Masaje}
                            alt="card-image" className="object-cover w-full h-56 md:h-64 lg:h-72 xl:h-96" />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                Masaje Relajante
                            </p>
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                ₡ 25,000
                            </p>
                        </div>
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                        Disfruta de un masaje relajante diseñado para aliviar la tensión muscular y proporcionar una sensación de bienestar. 
                        Nuestros terapeutas expertos utilizan técnicas especializadas.
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <button className='bg-primary hover:bg-primary_h text-white align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'>
                            Reservar</button>
                    </div>
                </div>
                {/* Card 4 */}
                <div className="flex flex-col overflow-hidden text-gray-700 transition duration-500 transform bg-white shadow-md bg-clip-border rounded-xl w-96 hover:scale-105 hover:shadow-xl">
                    <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border rounded-t-xl">
                        <img
                            src={Facial}
                            alt="card-image" className="object-cover w-full h-56 md:h-64 lg:h-72 xl:h-96" />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                Tratamiento Facial
                            </p>
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                ₡ 35,000
                            </p>
                        </div>
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                        Nuestros tratamientos faciales están diseñados para rejuvenecer y revitalizar tu piel. Personalizados según tu tipo 
                        de piel y preocupaciones específicas, incluyen limpieza profunda.
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <button className='bg-primary hover:bg-primary_h text-white align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'>
                            Reservar</button>
                    </div>
                </div>
                {/* Card 5 */}
                <div className="flex flex-col overflow-hidden text-gray-700 transition duration-500 transform bg-white shadow-md bg-clip-border rounded-xl w-96 hover:scale-105 hover:shadow-xl">
                    <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border rounded-t-xl">
                        <img
                            src={Ceja}
                            alt="card-image" className="object-cover w-full h-56 md:h-64 lg:h-72 xl:h-96" />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                Depilacion de cejas
                            </p>
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                ₡ 12,000
                            </p>
                        </div>
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                            Define y da forma a tus cejas con nuestro servicio de depilación. Nuestros expertos utilizan técnicas precisas 
                            para lograr la forma perfecta que realce tus rasgos faciales.
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <button className='bg-primary hover:bg-primary_h text-white align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'>
                            Reservar</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ServicesContent;

