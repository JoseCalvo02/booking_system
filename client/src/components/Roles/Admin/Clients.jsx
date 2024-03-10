import React, { useState, useEffect } from 'react';
import { getClients } from '../../../../api/adminApi';
import customStyles from '../../../custom/customStyles';

const Clients = () => {
    const [clients, setClients] = useState([]); // Define el estado local para almacenar los usuarios

    useEffect(() => {
        // Llamar a la función para obtener todos los usuarios
        const fetchClients = async () => {
            try {
                const clients = await getClients();
                setClients(clients); // Establecer el estado local con los usuarios obtenidos
            } catch (error) {
                console.error('Error al obtener los usuarios:', error.message);
            }
        };

        fetchClients(); // Llamar a la función para obtener todos los usuarios
    }, []);


    return (
        <>
            <div className='w-full h-full p-8 bg-white shadow-custom rounded-xl'>
                <h2>Clients</h2>

                {/* Table */}
                <div className='overflow-y-auto max-h-[75vh]'>
                    <table className='w-full '>
                        <thead className='sticky top-0 z-10 text-white bg-gray-900'>
                            {/* Table Header */}
                            <tr className=''>
                                <th className={customStyles.th}>ID</th>
                                <th className={customStyles.th}>Nombre</th>
                                <th className={customStyles.th}>Apellido</th>
                                <th className={customStyles.th}>Telefono</th>
                                <th className={customStyles.th}>Email</th>
                                <th className={customStyles.th}>Direccion</th>
                                <th className={customStyles.th}>Points</th>
                                <th className={customStyles.th}>Estado</th>
                                <th className={customStyles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-y-auto'>
                            {/* Map over clients and render each client as a table row */}
                            {clients.map((client) => (
                                <tr key={client.id} className='hover:bg-gray-100'>
                                    <td className={customStyles.td}>{client.id}</td>
                                    <td className={customStyles.td}>{client.name}</td>
                                    <td className={customStyles.td}>{client.lastName}</td>
                                    <td className={customStyles.td}>{client.phone}</td>
                                    <td className={customStyles.td}>{client.email}</td>
                                    <td className={customStyles.td}>{client.address}</td>
                                    <td className={customStyles.td}>{client.points}</td>
                                    <td className={customStyles.td}>{client.status}</td>
                                    <td className={customStyles.td}>
                                        <button className='p-2 text-white bg-green-500 rounded-lg'>Edit</button>
                                        <button className='p-2 text-white bg-red-500 rounded-lg'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}

export default Clients;
