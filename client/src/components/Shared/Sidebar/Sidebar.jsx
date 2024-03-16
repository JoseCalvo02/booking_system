import React from 'react'

import { Link } from 'react-router-dom';

import customStyles from '../../../custom/customStyles';
import {
    TbLayoutGrid, TbCalendarEvent, TbUserSearch, TbNotebook, TbUserEdit , TbCalendarUser, TbCoins, TbReport, TbSettings, TbLogout2
} from "react-icons/tb";

const Sidebar = () => {
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
                    <ul className='flex flex-col flex-grow text-md'>
                        <li>
                            <Link className={customStyles.link} to="/admin/dashboard">
                                <TbLayoutGrid size={20}/>
                                <span className={customStyles.span}>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.link} to="/admin/citas">
                                <TbCalendarEvent size={20}/>
                                <span className={customStyles.span}>Citas</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.link} to="/admin/clientes">
                                <TbUserSearch size={20}/>
                                <span className={customStyles.span}>Clientes</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.link} to="/admin/catalogo">
                                <TbNotebook size={20}/>
                                <span className={customStyles.span}>Catálogo</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.link} to="/admin/estilistas">
                                <TbUserEdit  size={20}/>
                                <span className={customStyles.span}>Estilistas</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.link} to="/admin/horarios">
                                <TbCalendarUser size={20}/>
                                <span className={customStyles.span}>Horarios</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.link} to="/admin/canjes">
                                <TbCoins  size={20}/>
                                <span className={customStyles.span}>Canjes</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.link} to="/admin/reportes">
                                <TbReport  size={20}/>
                                <span className={customStyles.span}>Reportes</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.link} to="/admin/profile">
                                <TbSettings  size={20}/>
                                <span className={customStyles.span}>Perfil</span>
                            </Link>
                        </li>
                        <li className='mt-auto'>
                            <a className={customStyles.link}>
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