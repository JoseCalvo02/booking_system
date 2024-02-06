import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

function Navbar() {
    const [nav, setNav] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) { // Assuming 640px is your small screen breakpoint
                setNav(true);
            }
        };

        // Call handleResize on initial load
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNav = () =>  {
        setNav(!nav);
    };

    return (
        <nav className="flex items-center justify-between w-full h-[7vh] px-4 mx-auto text-white bg-nav_bg">
            <h1 className="w-full text-2xl font-bold text-primary">FABI Studio Nails.</h1>

            <ul className="hidden uppercase md:flex">
                <li className="p-4 transition-colors duration-500 hover:text-gray-400">Home</li>
                <li className="p-4 transition-colors duration-500 hover:text-gray-400">Company</li>
                <li className="p-4 transition-colors duration-500 hover:text-gray-400">Signup</li>
                <li className="p-4 transition-colors duration-500 hover:text-gray-400">Login</li>
                <li className="p-4 transition-colors duration-500 hover:text-gray-400">Contact</li>
            </ul>

            <div className='sm:hidden' onClick={handleNav}>
                {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/*Mobile Navbar*/}
            <div className={!nav ? 'fixed left-0 top-0 w-[60%] border-r border-r-gray-900 h-full bg-nav_bg ease-in-out duration-500' : 'top-0 h-full fixed left-[-100%] ease-in-out duration-1000 w-[60%]'}>
                <h1 className="w-full m-4 text-2xl font-bold text-primary">FABI Studio Nails.</h1>

                <ul className='p-4 uppercase'>
                    <li className="p-4 transition-colors duration-500 border-b border-gray-600 hover:text-gray-400">Home</li>
                    <li className="p-4 transition-colors duration-500 border-b border-gray-600 hover:text-gray-400">Company</li>
                    <li className="p-4 transition-colors duration-500 border-b border-gray-600 hover:text-gray-400">Signup</li>
                    <li className="p-4 transition-colors duration-500 border-b border-gray-600 hover:text-gray-400">Login</li>
                    <li className="p-4 transition-colors duration-500 hover:text-gray-400 ">Contact</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;