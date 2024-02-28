import React from 'react'

import customStyles from '../../../custom/customStyles';
import {
    TbLayoutGrid, TbCalendarEvent, TbUserSearch, TbNotebook, TbUserEdit , TbCalendarUser, TbCoins, TbReport, TbSettings, TbLogout2
} from "react-icons/tb";


function Sidebar() {
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
                    <ul className='flex flex-col flex-grow text-lg'>
                        <li>
                            <a className={customStyles.a} href="">
                                <TbLayoutGrid size={20}/>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a className={customStyles.a} href="">
                                <TbCalendarEvent size={20}/>
                                Citas
                            </a>
                        </li>
                        <li>
                        <a className={customStyles.a} href="">
                                <TbUserSearch size={20}/>
                                Clientes
                            </a>
                        </li>
                        <li>
                            <a className={customStyles.a} href="">
                                <TbNotebook size={20}/>
                                Catálogo
                            </a>
                        </li>
                        <li>
                            <a className={customStyles.a} href="">
                                <TbUserEdit  size={20}/>
                                Estilistas
                            </a>
                        </li>
                        <li>
                            <a className={customStyles.a} href="">
                                <TbCalendarUser size={20}/>
                                Horarios
                            </a>
                        </li>
                        <li>
                            <a className={customStyles.a} href="">
                                <TbCoins  size={20}/>
                                Canjes
                            </a>
                        </li>
                        <li>
                            <a className={customStyles.a} href="">
                                <TbReport  size={20}/>
                                Reportes
                            </a>
                        </li>
                        <li>
                            <a className={customStyles.a} href="">
                                <TbSettings  size={20}/>
                                Perfil
                            </a>
                        </li>
                        <li className='mt-auto'>
                            <a className={customStyles.a} href="">
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

export default Sidebar