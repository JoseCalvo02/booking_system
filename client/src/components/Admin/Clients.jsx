import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
// Funciones y estilos
import { getUsersByType } from '../../../api/userApi';
import customStyles from '../../custom/customStyles';
import useInputActive from '../../hooks/useInputActive';
import handleClientAction from '../Modals/Clients/StatusClientModal';
// Icons
import { TbUserSearch, TbFilterX } from "react-icons/tb";

const Clients = () => {
    const { inputActive, handleInputFocus, handleInputBlur } = useInputActive(); // Custom hook para manejar el estado del input de búsqueda
    const [searchClient, setSearchClient] = useState(''); // Search term for Clients
    const [clients, setClients] = useState([]); // Define el estado local para almacenar los usuarios

    useEffect(() => {
        // Llamar a la función para obtener todos los usuarios
        const fetchClients = async (type) => {
            try {
                const clients = await getUsersByType(type);
                setClients(clients); // Establecer el estado local con los usuarios obtenidos
            } catch (error) {
                console.error('Error al obtener los usuarios:', error.message);
            }
        };

        fetchClients('clients'); // Llamar a la función para obtener todos los clientes
    }, []);

    const handleSearchChange = (event) => {
        setSearchClient(event.target.value);
    };

    // Filtrar los estilistas según el término de búsqueda
    const filteredClients = clients.filter((client) => {
        // Filtrar por el término de búsqueda
        if (searchClient) {
            const searchRegex = new RegExp(searchClient, 'i');
            return (
                searchRegex.test(client.usuarioID.toString()) ||
                searchRegex.test(client.apellidos) ||
                searchRegex.test(client.nombre) ||
                searchRegex.test(client.correo) ||
                searchRegex.test(`${client.nombre} ${client.apellidos}`)
            );
        }
        return true;
    });

    const handleAction = (estado, usuarioID) => {
        handleClientAction(usuarioID, estado); // Llamar a la función para manejar la acción del cliente
    }

    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            {/* Title & search */}
            <header className='mb-4 text-gray-900'>
                <h1 className='p-1 mb-4 text-lg font-semibold text-center md:text-xl lg:text-2xl'>
                    Tabla de clientes
                </h1>
                <div className="relative flex items-center justify-center text-sm md:text-base lg:text-lg">
                    <input
                        type="text"
                        placeholder="Buscar ID, nombre, email..."
                        value={searchClient}
                        onChange={handleSearchChange}
                        onFocus={handleInputFocus} onBlur={handleInputBlur}
                        className="w-full py-2 pl-10 pr-4 border border-black rounded-md border-opacity-5 shadow-custom focus:outline-none focus:ring focus:ring-blue-500 "
                    />
                    <TbUserSearch className={`absolute inset-y-0 left-0 m-3 ${inputActive ? 'text-primary' : 'text-gray-400'}`} size={20}/>
                    <button className="absolute inset-y-0 right-0 flex items-center justify-center m-3 text-gray-400 hover:text-primary" onClick={() => setSearchClient('')}>
                        <TbFilterX size={20}/>
                    </button>
                </div>
            </header>

            {/* Table */}
            <section className='overflow-y-auto max-h-[65vh]'>
                <table className='w-full '>
                    <thead className={customStyles.thead}>
                        {/* Table Header */}
                        <tr>
                            <th className={customStyles.th}>ID</th>
                            <th className={customStyles.th}>Usuario</th>
                            <th className={customStyles.th}>Telefono</th>
                            <th className={customStyles.th}>Email</th>
                            <th className={customStyles.th}>Direccion</th>
                            <th className={twMerge(customStyles.th, 'max-w-20')}>Pts.Actuales</th>
                            <th className={twMerge(customStyles.th, 'max-w-20')}>Pts.Gastados</th>
                            <th className={customStyles.th}>Estado</th>
                            <th className={customStyles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='overflow-y-auto'>
                        {/* Map over clients and render each client as a table row */}
                        {filteredClients.map((client) => (
                            <tr key={client.usuarioID} className='hover:bg-gray-100'>
                                <td className={customStyles.td}>{client.usuarioID}</td>
                                <td className={customStyles.td}>{client.nombre} {client.apellidos}</td>
                                <td className={customStyles.td}>{client.telefono}</td>
                                <td className={customStyles.td}>{client.correo}</td>
                                <td className={customStyles.td}>{client.direccion}</td>
                                <td className={customStyles.td}>{client.points.puntosAcumulados}</td>
                                <td className={customStyles.td}>{client.points.puntosCanjeados}</td>
                                <td className={customStyles.td}>{client.estado}</td>
                                <td className={customStyles.td}>
                                <button onClick={() =>handleAction(client.estado, client.usuarioID)} className={`p-2 rounded-lg hover:bg-opacity-80 ${client.estado === 'Activo' ? 'bg-red-400 hover:bg-red-600' : 'bg-green-400 hover:bg-green-500'}`}>
                                    {client.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

        </div>
    );
}

export default Clients;
