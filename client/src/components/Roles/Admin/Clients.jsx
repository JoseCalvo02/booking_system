import React, { useState, useEffect } from 'react';
import { getClients } from '../../../../api/clientApi';
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
                <h1 className='mb-4 text-2xl font-semibold text-center text-gray-900 border border-black rounded-md shadow-custom border-opacity-5'>
                    Tabla de clientes
                </h1>

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
                                <tr key={client.usuarioID} className='hover:bg-gray-100'>
                                    <td className={customStyles.td}>{client.usuarioID}</td>
                                    <td className={customStyles.td}>{client.nombre}</td>
                                    <td className={customStyles.td}>{client.apellidos}</td>
                                    <td className={customStyles.td}>{client.telefono}</td>
                                    <td className={customStyles.td}>{client.correo}</td>
                                    <td className={customStyles.td}>{client.direccion}</td>
                                    <td className={customStyles.td}>0</td>
                                    <td className={customStyles.td}>{client.estado}</td>
                                    <td className={customStyles.td}>
                                        <button className='p-2 mr-2 text-white bg-green-400 rounded-lg hover:bg-green-500'>Edit</button>
                                        <button className='p-2 text-white bg-red-400 rounded-lg hover:bg-red-500'>Delete</button>
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
