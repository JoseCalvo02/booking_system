import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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

    const closeNav = () => {
        setNav(true);
    };

    return (
        <nav className="flex items-center justify-between w-full h-[7vh] px-4 mx-auto text-white bg-bg_black">
            <h1 className="w-full text-2xl font-bold text-primary">Studio Once Once</h1>

            <ul className="hidden uppercase md:flex">
                <li className="p-4 transition-colors duration-500 hover:text-primary"><NavLink to="/">Home</NavLink></li>
                <li className="p-4 transition-colors duration-500 hover:text-primary"><a href="#about-us">About</a></li>
                <li className="p-4 transition-colors duration-500 hover:text-primary">Signup</li>
                <li className="p-4 transition-colors duration-500 hover:text-primary">Login</li>
                <li className="p-4 transition-colors duration-500 hover:text-primary"><a href="#contact-us">Contact</a></li>
            </ul>

            <div className='sm:hidden' onClick={handleNav}>
                {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/*Mobile Navbar*/}
            <div className={!nav ? 'fixed left-0 top-0 w-[60%] border-r border-r-gray-900 h-full bg-bg_black ease-in-out duration-500 z-20' : 'top-0 h-full fixed left-[-100%] ease-in-out duration-1000 w-[60%]'}>
                <h1 className="w-full m-4 text-2xl font-bold text-primary">FABI Studio Nails.</h1>

                <ul className='p-4 uppercase'>
                    <li className="p-4 transition-colors duration-500 border-b border-gray-600 hover:text-primary">Home</li>
                    <li className="p-4 transition-colors duration-500 border-b border-gray-600 hover:text-primary"><a href="#about-us" onClick={closeNav}>About</a></li>
                    <li className="p-4 transition-colors duration-500 border-b border-gray-600 hover:text-primary">Signup</li>
                    <li className="p-4 transition-colors duration-500 border-b border-gray-600 hover:text-primary">Login</li>
                    <li className="p-4 transition-colors duration-500 hover:text-primary"><a href="#contact-us" onClick={closeNav}>Contact</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;