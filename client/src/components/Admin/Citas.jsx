import React, { useState, useEffect } from 'react';
import BarLoader from "react-spinners/BarLoader";
// Functions / Api / Hooks / Modals
import useInputActive from '../../hooks/useInputActive';
import { getAllAppointments } from '../../../api/apptApi';
// Styles & Icons
import customStyles from '../../custom/customStyles';
import { TbUserSearch, TbFilterX } from "react-icons/tb";

const Citas = () => {
    const { inputActive, handleInputFocus, handleInputBlur } = useInputActive(); // Custom hook para manejar el estado del input de búsqueda
    const [searchAppt, setSearchAppt] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const appointments = await getAllAppointments();
                setAppointments(appointments);
                console.log(appointments);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las citas:', error.message);
            }
        };

        fetchAppointments();
    }, []);

    // Filtrar los estilistas según el término de búsqueda
    const filteredAppts = appointments.filter((appointment) => {
        // Filtrar por el término de búsqueda
        if (searchAppt) {
            const searchRegex = new RegExp(searchAppt, 'i');
            return (
                searchRegex.test(appointment.citaID.toString()) ||
                searchRegex.test(appointment.Usuarios_Clientes.apellidos) ||
                searchRegex.test(appointment.Usuarios_Clientes.nombre) ||
                searchRegex.test(`${appointment.Usuarios_Clientes.nombre} ${appointment.Usuarios_Clientes.apellidos}`) ||
                searchRegex.test(appointment.Usuarios_Estilistas.apellidos) ||
                searchRegex.test(appointment.Usuarios_Estilistas.nombre) ||
                searchRegex.test(`${appointment.Usuarios_Estilistas.nombre} ${appointment.Usuarios_Estilistas.apellidos}`)
            );
        }
        return true;
    });

    const handleSearchChange = (event) => {
        setSearchAppt(event.target.value);
    };

    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            {/* Title & search */}
            <header className='mb-4 text-gray-900'>
                <h1 className='p-1 mb-4 text-lg font-semibold text-center md:text-xl lg:text-2xl'>
                    Tabla de Citas
                </h1>
                <div className="relative flex items-center justify-center text-sm md:text-base lg:text-lg">
                    <input
                        type="text"
                        placeholder="Buscar ID, nombre, email..."
                        value={searchAppt}
                        onChange={handleSearchChange}
                        onFocus={handleInputFocus} onBlur={handleInputBlur}
                        className="w-full py-2 pl-10 pr-4 border border-black rounded-md border-opacity-5 shadow-custom focus:outline-none focus:ring focus:ring-blue-500 "
                    />
                    <TbUserSearch className={`absolute inset-y-0 left-0 m-3 ${inputActive ? 'text-primary' : 'text-gray-400'}`} size={20}/>
                    <button className="absolute inset-y-0 right-0 flex items-center justify-center m-3 text-gray-400 hover:text-primary" onClick={() => setSearchAppt('')}>
                        <TbFilterX size={20}/>
                    </button>
                </div>
            </header>

             {/* Table */}
             <section className='overflow-y-auto max-h-[65vh]'>
                <table className='w-full'>
                    <thead className={customStyles.thead}>
                        {/* Table Header */}
                        <tr>
                            <th className={customStyles.th}>ID</th>
                            <th className={customStyles.th}>Cliente</th>
                            <th className={customStyles.th}>Estilista</th>
                            <th className={customStyles.th}>Servicio</th>
                            <th className={customStyles.th}>Cupon</th>
                            <th className={customStyles.th}>Estado</th>
                            <th className={customStyles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='overflow-x-auto'>
                        {/* Map over clients and render each client as a table row */}
                        {filteredAppts.map((appt) => (
                            <tr key={appt.citaID} className='hover:bg-gray-100'>
                                <td className={customStyles.td}>{appt.citaID}</td>
                                <td className={customStyles.td}>{appt.Usuarios_Clientes.nombre + ' ' + appt.Usuarios_Clientes.apellidos}</td>
                                <td className={customStyles.td}>{appt.Usuarios_Estilistas.nombre + ' ' + appt.Usuarios_Estilistas.apellidos}</td>
                                <td className={customStyles.td}>D</td>
                                {/** Si no hay cupon imprimir mensaje y si lo hay entonces imprimir  */}
                                <td className={customStyles.td}>{}</td>
                                <td className={customStyles.td}>H</td>
                                <td className={customStyles.td}>
                                    <button className='w-12 p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'>Rol</button>
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

export default Citas;
