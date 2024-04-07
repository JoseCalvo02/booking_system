import React, { useState, useEffect } from 'react';
import { getUsersByType } from '../../../api/userApi';
import customStyles from '../../custom/customStyles';

import { TbUserSearch } from "react-icons/tb";

const Stylists = () => {
    const [inputActive, setInputActive] = useState(false);
    const [stylists, setStylists] = useState([]); // Define el estado local para almacenar los usuarios

    useEffect(() => {
        // Llamar a la función para obtener todos los estilistas
        const fetchStylists = async (type) => {
            try {
                const stylists = await getUsersByType(type);
                setStylists(stylists); // Establecer el estado local con los usuarios obtenidos
            } catch (error) {
                console.error('Error al obtener los usuarios:', error.message);
            }
        };

        fetchStylists('stylists'); // Llamar a la función para obtener todos los estilistas
    }, []);

    const handleInputFocus = () => {
        setInputActive(true);
    };

    const handleInputBlur = () => {
        setInputActive(false);
    };

    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            {/* Title & search */}
            <div className='mb-4 text-gray-900'>
                <h1 className='p-1 mb-4 text-lg font-semibold text-center md:text-xl lg:text-2xl'>
                    Tabla de Estilistas
                </h1>
                <div className="relative flex items-center justify-center sm:text-sm md:text-md lg:text-lg">
                    <input
                        type="text"
                        placeholder="Buscar estilista"
                        onFocus={handleInputFocus} onBlur={handleInputBlur}
                        className="w-full py-2 pl-10 pr-4 border border-black rounded-md border-opacity-5 shadow-custom focus:outline-none focus:ring focus:ring-blue-500 "
                    />
                    <TbUserSearch className={`absolute inset-y-0 left-0 m-3 ${inputActive ? 'text-primary' : 'text-gray-400'}`} size={20}/>
                    <button className="absolute inset-y-0 right-0 flex items-center justify-center m-3 text-gray-400 hover:text-primary">
                        Buscar
                    </button>
                </div>
            </div>

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
                            <th className={customStyles.th}>Estado</th>
                            <th className={customStyles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='overflow-y-auto'>
                        {/* Map over stylists and render each stylist as a table row */}
                        {stylists.map((stylist) => (
                            <tr key={stylist.usuarioID} className='hover:bg-gray-100'>
                                <td className={customStyles.td}>{stylist.usuarioID}</td>
                                <td className={customStyles.td}>{stylist.nombre}</td>
                                <td className={customStyles.td}>{stylist.apellidos}</td>
                                <td className={customStyles.td}>{stylist.telefono}</td>
                                <td className={customStyles.td}>{stylist.correo}</td>
                                <td className={customStyles.td}>{stylist.direccion}</td>
                                <td className={customStyles.td}>{stylist.estado}</td>
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
    );
}

export default Stylists;
