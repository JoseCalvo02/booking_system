import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
// Constants / API / Modals
import { getServices } from '../../../api/serviceApi';
import { openEditModal } from '../Modals/Services/EditServModal';
import { CreateServModal } from '../Modals/Services/CreateServModal';
import { DeleteServModal } from '../Modals/Services/DeleteServModal';

const Services = () => {
    const [services, setServices] = useState([]); // Array of cards for services
    const [loading, setLoading] = useState(true); // Handle loading state

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const services = await getServices();
                setServices(services);
                setLoading(false);
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
                <button className='p-2 text-white bg-green-500 rounded text-md hover:bg-green-600 lg:text-lg' onClick={() => CreateServModal()}>Agregar +</button>
            </header>

            {/* Services section for services */}
            <section className='grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3'>
                { services.map((service, i) => (
                    <div key={i} className='content-center h-64 p-8 text-center bg-white border border-gray-300 rounded-xl shadow-custom hover:shadow-none'>
                        <h3 className='text-xl font-semibold'>{service.nombreServicio}</h3>
                        <p className='max-w-full'>{service.descripcion}</p>
                        <p>{service.tiempoEstimado}</p>
                        <p>₡{service.precio}</p>
                        <div className='mt-4 space-x-2 text-white'>
                            <button className='p-2 bg-blue-500 rounded-md w-28 hover:bg-blue-600' onClick={() => openEditModal(service, updateService)}>Editar</button>
                            <button className='p-2 bg-red-500 rounded-md w-28 hover:bg-red-600' onClick = {() => DeleteServModal(service)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Loading spinner */}
            { loading &&
                <div className='flex items-center justify-center h-[50vh] w-full'>
                    <ClipLoader color='#111827' size={200} />
                </div>
            }
        </div>
    );
}

export default Services;