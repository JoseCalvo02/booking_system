import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

function Navbar() {
    const [nav, setNav] = useState(true);

    const handleNav = () =>  {
        setNav(!nav);
    };

    return (
        <nav className="flex items-center justify-between h-24 text-white max-w-[1240px] mx-auto px-4">
            <h1 className="w-full text-3xl font-bold text-t-gr">FABI Studio Nails.</h1>

            <ul className="hidden uppercase md:flex">
                <li className="p-4 ">Home</li>
                <li className="p-4 ">Company</li>
                <li className="p-4 ">Signup</li>
                <li className="p-4 ">Login</li>
                <li className="p-4 ">Contact</li>
            </ul>

            <div className='sm:hidden' onClick={handleNav}>
                {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/*Mobile Navbar*/}
            <div className={!nav ? 'fixed left-0 top-0 w-[60%] border-r border-r-gray-900 h-full bg-[#000300] ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <h1 className="w-full m-4 text-3xl font-bold text-t-gr">FABI Studio Nails.</h1>

                <ul className='p-4 uppercase'>
                    <li className="p-4 border-b border-gray-600">Home</li>
                    <li className="p-4 border-b border-gray-600">Company</li>
                    <li className="p-4 border-b border-gray-600">Signup</li>
                    <li className="p-4 border-b border-gray-600">Login</li>
                    <li className="p-4 ">Contact</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;