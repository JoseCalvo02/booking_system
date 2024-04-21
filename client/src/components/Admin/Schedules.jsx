// Libraries
import React, { useState, useEffect } from 'react';
import MoonLoader from "react-spinners/MoonLoader";
// Functions / Api / Components / Hooks
import useInputActive from '../../hooks/useInputActive';
import { getUsersByType } from '../../../api/userApi';
import StylistSchedulePanel from './Schedule/StylistSchedulePanel';
// Styles / Icons
import { TbUserSearch, TbFilterX } from "react-icons/tb";

const Schedules = () => {
    const { inputActive, handleInputFocus, handleInputBlur } = useInputActive(); // Custom hook para manejar el estado del input de búsqueda
    const [stylists, setStylists] = useState([]);
    const [searchStylist, setSearchStylist] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Llamar a la función para obtener todos los estilistas
        const fetchStylists = async (type) => {
            try {
                const estilistas  = await getUsersByType(type);
                // Almacenar los nombres y apellidos en el estado
                setStylists(estilistas);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las estilistas:', error.message);
            }
        };

        fetchStylists('stylists'); // Llamar a la función para obtener todos los estilistas
    }, []);

    const handleSearch = (event) => {
        setSearchStylist(event.target.value);
    };

    const handleOptionClick = (stylist) => {
        const fullName = `${stylist.nombre} ${stylist.apellidos}`;
        setSearchStylist(fullName);
        handleInputBlur();
    };

    // Filtrar las opciones de estilistas según el término de búsqueda
    const filteredEstilistas = stylists.filter(stylist => {
        // Convertir el nombre y el apellido a minúsculas
        const nombre = stylist.nombre ? stylist.nombre.toLowerCase() : '';
        const apellido = stylist.apellidos ? stylist.apellidos.toLowerCase() : '';
        const fullName = `${nombre} ${apellido}`;
        // Verificar si el término de búsqueda está incluido en el nombre, el apellido o el nombre completo
        return (
            nombre.includes(searchStylist.toLowerCase()) ||
            apellido.includes(searchStylist.toLowerCase()) ||
            fullName.includes(searchStylist.toLowerCase())
        );
    });

    const selectedStylist = stylists.find(stylist => `${stylist.nombre} ${stylist.apellidos}`.toLowerCase() === searchStylist.toLowerCase());

    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            <header className='mb-4 text-gray-900'>
                <h1 className='p-1 mb-4 text-lg font-semibold text-center md:text-xl lg:text-2xl'>Gestión de Horarios de Estilistas</h1>
                <div className='flex items-center gap-2'>
                    <label className={`text-sm text-gray-400 lg:text-lg md:text-base ${inputActive ? 'text-primary' : 'text-gray-400'}`} htmlFor="inputStylist">Seleccionar Estilista:</label>
                    <div className='relative flex items-center justify-center text-sm md:text-base lg:text-lg' onMouseEnter={handleInputFocus} onMouseLeave={handleInputBlur}>
                        <input
                                type="text"
                                list='stylistsList'
                                id='inputStylist'
                                value={searchStylist}
                                onChange={handleSearch}
                                className='w-full py-2 pl-10 pr-8 border border-black rounded-md border-opacity-5 shadow-custom focus:outline-none focus:ring focus:ring-blue-500'
                        />
                        <TbUserSearch className={`absolute inset-y-0 left-0 m-3 ${inputActive ? 'text-primary' : 'text-gray-400'}`} size={20}/>
                        <button className="absolute inset-y-0 right-0 flex items-center justify-center m-3 text-gray-400 hover:text-primary" onClick={() => setSearchStylist('')}>
                            <TbFilterX size={20}/>
                        </button>
                        {/* Lista desplegable personalizada */}
                        {inputActive && (
                            <div className="absolute left-0 z-20 h-32 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg w-[300px] top-[39px] md:top-[43px] lg:top-[47px]"  onClick={() => document.getElementById('inputStylist').blur()}>
                                {filteredEstilistas.length > 0 ? (
                                    filteredEstilistas.map((stylist, index) => (
                                        <div key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleOptionClick(stylist)}
                                        >
                                            {stylist.nombre} {stylist.apellidos}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2">No hay opciones disponibles.</div>
                                )}
                            </div>
                        )}
                    </div>
                    <MoonLoader color={'#3085d6'} loading={loading} size={25}/> {/* Spinner de carga */}
                </div>
            </header>

            <section>
                {/* Condición para verificar si se ha ingresado un valor de búsqueda */}
                {searchStylist === '' && (
                    <div className='mt-6'>
                        <p>Por favor, ingresa un valor de búsqueda.</p>
                    </div>
                )}

                {/* Condición para verificar si no se ha encontrado ningún estilista */}
                {searchStylist !== '' && !stylists.some(stylist => `${stylist.nombre} ${stylist.apellidos}`.toLowerCase() === searchStylist.toLowerCase()) && (
                    <div className='mt-6'>
                        <p>No se encontró ningún estilista que coincida con la búsqueda (Debes seleccionar una estilista).</p>
                    </div>
                )}

                {/* Condición para verificar si la entrada del usuario coincide exactamente con un estilista */}
                {searchStylist !== '' && stylists.some(stylist => `${stylist.nombre} ${stylist.apellidos}`.toLowerCase() === searchStylist.toLowerCase()) && (
                    <div className='mt-6'>
                        <StylistSchedulePanel stylist={selectedStylist}/>
                    </div>
                )}
            </section>

        </div>
    );
}

export default Schedules;