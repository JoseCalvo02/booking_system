import React from 'react'

import customStyles from '../../../custom/customStyles';
import { MdOutlineSpaceDashboard, MdOutlineLogout } from "react-icons/md";

function Sidebar() {
    return (
        <aside className='p-8 text-lg font-semibold text-white bg-gray-900'>
            {/* Logo */}
            <div className='flex gap-1 p-2 mb-4 text-2xl'>
                <h1 className='text-white'>Studio</h1>
                <h1 className='text-primary'>Once Once</h1>
            </div>

            {/* Navigation */}
            <div>
                <nav>
                    <ul className=''>
                        <li>
                            <a className={customStyles.a} href="">
                                <MdOutlineSpaceDashboard />
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="">Users</a>
                        </li>
                        <li>
                            <a href="">Roles</a>
                        </li>
                        <li>
                            <a href="">Permissions</a>
                        </li>
                        <li className=''>
                            <a className={customStyles.a} href="">
                                <MdOutlineLogout />
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