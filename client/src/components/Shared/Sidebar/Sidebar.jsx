import React from 'react'

import { Link } from 'react-router-dom';

import customStyles from '../../../custom/customStyles';
import {
    TbLayoutGrid, TbCalendarEvent, TbUserSearch, TbNotebook, TbUserEdit , TbCalendarUser, TbCoins, TbReport, TbSettings, TbLogout2
} from "react-icons/tb";

const Sidebar = () => {
    return (
        <aside className='flex flex-col p-8 text-lg font-semibold text-white bg-gray-900 rounded-r-2xl'>
            {/* Logo */}
            <div className='flex gap-1 p-2 mb-4 text-2xl'>
                <h1 className='text-white'>Studio</h1>
                <h1 className='text-primary'>Once Once</h1>
            </div>

            {/* Navigation */}
            <div className='flex flex-grow '>
                <nav className='flex flex-grow '>
                    <ul className='flex flex-col flex-grow text-md'>
                        <li>
                            <Link className={customStyles.a} to="/admin/dashboard">
                                <TbLayoutGrid size={20}/>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.a} to="/admin/citas">
                                <TbCalendarEvent size={20}/>
                                Citas
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.a} to="/admin/clientes">
                                <TbUserSearch size={20}/>
                                Clientes
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.a} to="/admin/catalogo">
                                <TbNotebook size={20}/>
                                Catálogo
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.a} to="/admin/estilistas">
                                <TbUserEdit  size={20}/>
                                Estilistas
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.a} to="/admin/horarios">
                                <TbCalendarUser size={20}/>
                                Horarios
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.a} to="/admin/canjes">
                                <TbCoins  size={20}/>
                                Canjes
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.a} to="/admin/reportes">
                                <TbReport  size={20}/>
                                Reportes
                            </Link>
                        </li>
                        <li>
                            <Link className={customStyles.a} to="/admin/perfil">
                                <TbSettings  size={20}/>
                                Perfil
                            </Link>
                        </li>
                        <li className='mt-auto'>
                            <a className={customStyles.a}>
                                <TbLogout2 size={20}/>
                                Log out
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;