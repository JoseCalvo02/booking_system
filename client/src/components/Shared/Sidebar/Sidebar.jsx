import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { handleLogout } from '../../../../api/authApi';
import customStyles from '../../../custom/customStyles';
import { decodeToken } from '../../../utils/tokenUtils';
// Icons
import {
    TbLayoutGrid, TbCalendarEvent, TbUserSearch, TbNotebook, TbUserEdit , TbCalendarUser, TbTicket , TbReport, TbSettings, TbLogout2
} from "react-icons/tb";

const Sidebar = () => {
    const [activeOption, setActiveOption] = useState(null); // Estado para la opción activa
    const location = useLocation(); // Hook para obtener la ubicación actual de la aplicación
    const navigate = useNavigate(); // Hook para navegar a una ubicación diferente

    useEffect(() => {
        // Obtener la ruta actual y extraer el nombre de la opción
        const currentPath = location.pathname;
        const currentOption = currentPath.split('/').pop();
        setActiveOption(currentOption);
    }, [location.pathname]); // Se ejecutará cuando la ubicación actual cambie

    const decodedToken = decodeToken(); // Decodificar el token JWT para obtener la información del usuario
    console.log(decodedToken);

    return (
        <aside className='flex flex-col max-h-screen p-4 font-semibold text-white bg-gray-900 md:p-8 text-md rounded-r-2xl'>
            {/* Logo */}
            <div className='flex-col hidden gap-1 p-2 mb-4 md:flex md:text-md lg:text-xl'>
                <h1 className='text-white'>Studio</h1>
                <h1 className='text-primary'>Once Once</h1>
            </div>

            {/* Navigation */}
            <div className='flex flex-grow '>
                <nav className='flex flex-grow '>
                    <ul className='flex flex-col flex-grow gap-1 text-md'>
                        {/* Enlace a la opción Dashboard */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "dashboard" && customStyles.activeLink}`}
                                to={decodedToken.role === 'Estilista' ? "/stylist/dashboard" : "/admin/dashboard"}
                            >
                                <TbLayoutGrid size={20}/>
                                <span className={customStyles.span}>Panel de control</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Citas */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "citas" && customStyles.activeLink}`}
                                to={decodedToken.role === 'Estilista' ? "/stylist/citas" : "/admin/citas"}
                            >
                                <TbCalendarEvent size={20}/>
                                <span className={customStyles.span}>Citas</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Clientes */}
                        {decodedToken.role !== 'Estilista' && (
                            <li>
                                <Link className={`${customStyles.link} ${activeOption === "clientes" && customStyles.activeLink}`}
                                    to="/admin/clientes"
                                >
                                    <TbUserSearch size={20}/>
                                    <span className={customStyles.span}>Clientes</span>
                                </Link>
                            </li>
                        )}
                        {/* Enlace a la opción Catálogo */}
                        {decodedToken.role !== 'Estilista' && (
                            <li>
                                <Link className={`${customStyles.link} ${activeOption === "services" && customStyles.activeLink}`}
                                    to="/admin/services"
                                >
                                    <TbNotebook size={20}/>
                                    <span className={customStyles.span}>Servicios</span>
                                </Link>
                            </li>
                        )}
                        {/* Enlace a la opción Estilistas */}
                        {decodedToken.role !== 'Estilista' && (
                            <li>
                                <Link className={`${customStyles.link} ${activeOption === "estilistas" && customStyles.activeLink}`}
                                    to="/admin/estilistas"
                                >
                                    <TbUserEdit  size={20}/>
                                    <span className={customStyles.span}>Estilistas</span>
                                </Link>
                            </li>
                        )}
                        {/* Enlace a la opción Horarios */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "schedules" && customStyles.activeLink}`}
                                to={decodedToken.role === 'Estilista' ? "/stylist/schedules" : "/admin/schedules"}
                            >
                                <TbCalendarUser size={20}/>
                                <span className={customStyles.span}>Horarios</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Canjes */}
                        {decodedToken.role !== 'Estilista' && (
                            <li>
                                <Link className={`${customStyles.link} ${activeOption === "canjes" && customStyles.activeLink}`}
                                    to="/admin/canjes"
                                >
                                    <TbTicket   size={20}/>
                                    <span className={customStyles.span}>Cupones</span>
                                </Link>
                            </li>
                        )}
                        {/* Enlace a la opción Reportes */}
                        {decodedToken.role !== 'Estilista' && (
                            <li>
                                <Link className={`${customStyles.link} ${activeOption === "reports" && customStyles.activeLink}`}
                                    to="/admin/reports"
                                >
                                    <TbReport  size={20}/>
                                    <span className={customStyles.span}>Reportes</span>
                                </Link>
                            </li>
                        )}
                        {/* Enlace a la opción Perfil */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "profile" && customStyles.activeLink}`}
                                to={decodedToken.role === 'Estilista' ? "/stylist/profile" : "/admin/profile"}
                            >
                                <TbSettings  size={20}/>
                                <span className={customStyles.span}>Perfil</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Log out */}
                        <li className='mt-auto'>
                            <a className={customStyles.link} onClick={ () => handleLogout(navigate) }>
                                <TbLogout2 size={20}/>
                                <span className={customStyles.span}>Cerrar Sesión</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;