import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import customStyles from '../../../custom/customStyles';
import {
    TbLayoutGrid, TbCalendarEvent, TbUserSearch, TbNotebook, TbUserEdit , TbCalendarUser, TbCoins, TbReport, TbSettings, TbLogout2
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

    const handleLogout = () => {
        // Eliminar el token del localStorage
        localStorage.removeItem('token');
        // Redirigir al usuario a la página de inicio utilizando navigate
        navigate("/");
    };

    return (
        <aside className='flex flex-col p-4 font-semibold text-white bg-gray-900 md:p-8 text-md rounded-r-2xl'>
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
                                to="/admin/dashboard"
                            >
                                <TbLayoutGrid size={20}/>
                                <span className={customStyles.span}>Dashboard</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Citas */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "citas" && customStyles.activeLink}`}
                                to="/admin/citas"
                            >
                                <TbCalendarEvent size={20}/>
                                <span className={customStyles.span}>Citas</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Clientes */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "clientes" && customStyles.activeLink}`}
                                to="/admin/clientes"
                            >
                                <TbUserSearch size={20}/>
                                <span className={customStyles.span}>Clientes</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Catálogo */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "services" && customStyles.activeLink}`}
                                to="/admin/services"
                            >
                                <TbNotebook size={20}/>
                                <span className={customStyles.span}>Servicios</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Estilistas */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "estilistas" && customStyles.activeLink}`}
                                to="/admin/estilistas"
                            >
                                <TbUserEdit  size={20}/>
                                <span className={customStyles.span}>Estilistas</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Horarios */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "schedules" && customStyles.activeLink}`}
                                to="/admin/schedules"
                            >
                                <TbCalendarUser size={20}/>
                                <span className={customStyles.span}>Horarios</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Canjes */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "canjes" && customStyles.activeLink}`}
                                to="/admin/canjes"
                            >
                                <TbCoins  size={20}/>
                                <span className={customStyles.span}>Canjes</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Reportes */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "reports" && customStyles.activeLink}`}
                                to="/admin/reports"
                            >
                                <TbReport  size={20}/>
                                <span className={customStyles.span}>Reportes</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Perfil */}
                        <li>
                            <Link className={`${customStyles.link} ${activeOption === "profile" && customStyles.activeLink}`}
                                to="/admin/profile"
                            >
                                <TbSettings  size={20}/>
                                <span className={customStyles.span}>Perfil</span>
                            </Link>
                        </li>
                        {/* Enlace a la opción Log out */}
                        <li className='mt-auto'>
                            <a className={customStyles.link} onClick={handleLogout}>
                                <TbLogout2 size={20}/>
                                <span className={customStyles.span}>Log out</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;