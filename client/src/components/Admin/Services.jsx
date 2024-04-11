import React, { useEffect, useState } from 'react';
import { getServices } from '../../../api/serviceApi';
import { openEditModal } from '../Modals/Services/EditServModal';

const Services = () => {
    const [services, setServices] = useState([]); // Array of cards for services

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const services = await getServices();
                setServices(services);
            } catch (error) {
                console.error('Error fetching services:', error.message);
            }
        }
        fetchServices();
    }, []);

    // Función para actualizar el servicio en el estado
    const updateService = (editedService) => {
        // Encuentra el índice del servicio editado en el array de servicios
        const index = services.findIndex(service => service.servicioID === editedService.servicioID);
        // Actualiza el array de servicios con el servicio editado
        setServices(prevServices => {
            const updatedServices = [...prevServices];
            updatedServices[index] = editedService;
            console.log('Updated services:', updatedServices);
            return updatedServices;
        });
    };

    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            <header className='m-auto mb-4'>
                <h1 className='p-1 text-lg font-semibold text-center md:text-xl lg:text-2xl '>Servicios</h1>
                <button className='p-2 bg-green-400 rounded text-md hover:bg-green-500 lg:text-lg'>Agregar +</button>
            </header>

            {/* Services section for services */}
            <section className='flex flex-col flex-wrap justify-between md:flex-row lg:gap-3'>
                { services.map((service, i) => (
                    <div key={i} className='w-full md:w-[48%] lg:w-[31%] h-64 p-8 bg-white rounded-xl mb-4 shadow-custom hover:shadow-none text-center content-center border border-gray-300'>
                        <h3 className='text-xl font-semibold'>{service.nombreServicio}</h3>
                        <p className='max-w-full'>{service.descripcion}</p>
                        <p>{service.tiempoEstimado}</p>
                        <p>₡{service.precio}</p>
                        <div className='mt-4 space-x-2'>
                            <button className='p-2 bg-blue-400 rounded-md hover:bg-blue-500' onClick={() => openEditModal(service, updateService)}>Editar</button>
                            <button className='p-2 bg-red-400 rounded-md hover:bg-red-500'>Eliminar</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Services;