import React from 'react'
import FondoClient from '../../../assets/Sunset.jpg';

function MainContent() {
    return (
        <main className='flex flex-col w-full'>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black align-middle m-auto my-28">Reserve aqui</h1>
            <section className='flex flex-grow gap-8 m-auto mt-10'>
                <div className='w-auto rounded-lg'>
                    <div className='flex flex-grow w-auto gap-8 p-1 ml-6 mr-6 bg-gray-600 rounded-lg' >
                        <select className='p-3 mt-2 mb-2 ml-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-md w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            <option value='' disabled selected className="text-gray-500">Seleccionar servicio</option>
                            <option value='Pedicure'>Pedicure</option>
                            <option value='Manicure'>Manicure</option>
                            <option value='Corte de cabello'>Corte de cabello</option>
                            {/* Add more service options here */}
                        </select>

                        <input type='date' className='p-3 mt-2 mb-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-md w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500' />

                        <select className='p-3 mt-2 mb-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-md w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            <option value='' disabled selected className="text-gray-500">Seleccionar estilista</option>
                            <option value='Fabiola Hernandez'>Fabiola Hernandez</option>
                            <option value='Luis Martinez'>Luis Martinez</option>
                            <option value='Maria Lopez'>Maria Lopez</option>
                            {/* Add more stylist options here */}
                        </select>

                        <select className='p-3 mt-2 mb-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-md w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            <option value='' disabled selected className="text-gray-500">Seleccionar hora</option>
                            <option value='8:00 am'>8:00 am</option>
                            <option value='9:00 am'>9:00 am</option>
                            <option value='10:00 am'>10:00 am</option>
                            {/* Add more time options here */}
                        </select>   
                        <button className='w-40 px-4 py-2 mt-1 mb-1 mr-1 text-white transition duration-300 ease-in-out bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 hover:shadow-lg'>
                            Reservar cita
                        </button> 
                    </div>
                </div>
            </section>
        </main>
    )
}

export default MainContent