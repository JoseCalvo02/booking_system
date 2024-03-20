import React, { useState, useEffect } from 'react'
import { getServices } from '../../../../api/serviceApi';
import { getUsersByType } from '../../../../api/userApi';

function MainContent() {
    const [services, setServices] = useState([]); // Define el estado local para almacenar los servicios
    const [selectedService, setSelectedService] = useState('');
    const [stylists, setStylists] = useState([]); // Define el estado local para almacenar los estilistas
    const [selectedStylist, setSelectedStylist] = useState('');

    // Calendario con las fechas anteriores desactivadas
    const currentDate = new Date().toISOString().split('T')[0];
        const handleDateChange = (event) => {
            setSelectedDate(event.target.value);
        };

    useEffect(() => {
        // Llamar a la función para obtener todos los servicios y estilistas
        const fetchData = async () => {
            try {
                const [services, stylists] = await Promise.all([getServices(), getUsersByType('stylists')]);
                setServices(services); // Establecer el estado local con los servicios obtenidos
                setStylists(stylists); // Establecer el estado local con los estilistas obtenidos
            } catch (error) {
                console.error('Error al obtener los datos:', error.message);
            }
        };

        fetchData (); // Llamar a la función para obtener todos los servicios
    }, []);

    // Handle service change option
    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    // Handle stylist change option
    const handleStylistChange = (event) => {
        setSelectedStylist(event.target.value);
    };

    return (
        <main className='flex flex-col w-full'>
            <h1 className="m-auto mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 align-middle md:text-5xl lg:text-6xl dark:text-black my-28">
                Reserve aqui
            </h1>
            <section className='flex flex-grow gap-8 m-auto mt-10'>
                <div className='w-auto rounded-lg'>
                    <div className='flex flex-grow w-auto gap-8 p-1 ml-6 mr-6 bg-gray-600 rounded-lg' >
                        <select value={selectedService} onChange={handleServiceChange} className='p-3 mt-2 mb-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-md w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            <option value='' disabled={selectedService !== ''} defaultValue hidden className="text-gray-900">Seleccionar servicio</option>
                            {services.map((service) => (
                                <option key={service.servicioID} value={service.nombreServicio}>{service.nombreServicio + '  - Precio - ₡' + service.precio}</option>
                            ))}
                        </select>
                        
                        <input
                            type='DATE'
                            className='p-3 mt-2 mb-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-md w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            min={currentDate}
                            onChange={handleDateChange}
                        />
                        
                        {/* Stylist and time select options */}
                        <select value={selectedStylist} onChange={handleStylistChange} className='p-3 mt-2 mb-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-md w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            <option value='' disabled={selectedStylist !== ''} defaultValue hidden className="text-gray-500">Seleccionar estilista</option>
                            {stylists.map((stylist) => (
                                <option key={stylist.usuarioID} value={stylist.nombre}>{stylist.nombre}</option>
                            ))}
                        </select>

                        <select className='p-3 mt-2 mb-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-md w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            <option value=''>Seleccionar hora</option>
                            <option value=''>7:00 am</option>
                            <option value=''>8:00 am</option>
                            <option value=''>9:00 am</option>
                            <option value=''>10:00 am</option>
                            <option value=''>11:00 am</option>
                            <option value=''>1:00 pm</option>
                            <option value=''>2:00 pm</option>
                            <option value=''>3:00 pm</option>
                            <option value=''>4:00 pm</option>
                            
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