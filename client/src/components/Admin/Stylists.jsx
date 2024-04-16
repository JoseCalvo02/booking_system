import React, { useState, useEffect } from 'react';
import BarLoader from "react-spinners/BarLoader";
// Functions / Api / Hooks / Modals
import useInputActive from '../../hooks/useInputActive';
import { getUsersByType } from '../../../api/userApi';
import handleClientAction from '../Modals/Users/ChangeStatusModal';
import ChangeRoleModal from '../Modals/Users/ChangeRoleModal';
// Styles & Icons
import customStyles from '../../custom/customStyles';
import { TbUserSearch, TbFilterX } from "react-icons/tb";

const Stylists = () => {
    const { inputActive, handleInputFocus, handleInputBlur } = useInputActive(); // Custom hook para manejar el estado del input de búsqueda
    const [searchStylist, setSearchStylist] = useState(''); // Search term for Stylists
    const [stylists, setStylists] = useState([]); // Define el estado local para almacenar los usuarios
    const [loading, setLoading] = useState(true); // Handle loading state

    useEffect(() => {
        // Llamar a la función para obtener todos los estilistas
        const fetchStylists = async (type) => {
            try {
                const stylists = await getUsersByType(type);
                setStylists(stylists); // Establecer el estado local con los usuarios obtenidos
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error.message);
            }
        };

        fetchStylists('stylists'); // Llamar a la función para obtener todos los estilistas
    }, []);

    const handleSearchChange = (event) => {
        setSearchStylist(event.target.value);
    };

    // Filtrar los estilistas según el término de búsqueda
    const filteredStylists = stylists.filter((stylist) => {
        // Filtrar por el término de búsqueda
        if (searchStylist) {
            const searchRegex = new RegExp(searchStylist, 'i');
            return (
                searchRegex.test(stylist.usuarioID.toString()) ||
                searchRegex.test(stylist.apellidos) ||
                searchRegex.test(stylist.nombre) ||
                searchRegex.test(stylist.correo) ||
                searchRegex.test(`${stylist.nombre} ${stylist.apellidos}`)
            );
        }
        return true;
    });

    const handleAction = (usuarioID, nombreCliente, estado) => {
        handleClientAction(usuarioID, nombreCliente, estado); // Llamar a la función para manejar la acción del cliente
    }

    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            {/* Title & search */}
            <div className='mb-4 text-gray-900'>
                <h1 className='p-1 mb-4 text-lg font-semibold text-center md:text-xl lg:text-2xl'>
                    Tabla de Estilistas
                </h1>
                <div className="relative flex items-center justify-center text-sm md:text-base lg:text-lg">
                    <input
                        type="text"
                        placeholder="Buscar ID, nombre, email..."
                        value={searchStylist}
                        onChange={handleSearchChange}
                        onFocus={handleInputFocus} onBlur={handleInputBlur}
                        className="w-full py-2 pl-10 pr-4 border border-black rounded-md border-opacity-5 shadow-custom focus:outline-none focus:ring focus:ring-blue-500 "
                    />
                    <TbUserSearch className={`absolute inset-y-0 left-0 m-3 ${inputActive ? 'text-primary' : 'text-gray-400'}`} size={20}/>
                    <button className="absolute inset-y-0 right-0 flex items-center justify-center m-3 text-gray-400 hover:text-primary" onClick={() => setSearchStylist('')}>
                        <TbFilterX size={20}/>
                    </button>
                </div>
            </div>

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
                            <th className={customStyles.th}>Estado</th>
                            <th className={customStyles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='overflow-y-auto '>
                        {/* Map over stylists and render each stylist as a table row */}
                        {filteredStylists.map((stylist) => (
                            <tr key={stylist.usuarioID} className='hover:bg-gray-100'>
                                <td className={customStyles.td}>{stylist.usuarioID}</td>
                                <td className={customStyles.td}>{stylist.nombre} {stylist.apellidos}</td>
                                <td className={customStyles.td}>{stylist.telefono}</td>
                                <td className={customStyles.td}>{stylist.correo}</td>
                                <td className={customStyles.td}>{stylist.direccion}</td>
                                <td className={customStyles.td}>{stylist.estado}</td>
                                <td className={customStyles.td}>
                                    <button onClick={() =>handleAction(stylist.usuarioID, `${stylist.nombre} ${stylist.apellidos}`, stylist.estado)}
                                        className={ `p-2 w-[105px] mr-2 rounded-lg hover:bg-opacity-80 text-white ${stylist.estado === 'Activo' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
                                        {stylist.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                                    </button>
                                    <button onClick={() => ChangeRoleModal({user: stylist})} className='w-12 p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'>Rol</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Loader */}
                {loading && (
                <div className="flex items-center justify-center mt-8">
                    <BarLoader color="#111827" width={200} height={10} />
                </div>
                )}
            </section>

        </div>
    );
}

export default Stylists;
