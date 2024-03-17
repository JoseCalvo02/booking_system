import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CgProfile, CgLogOut, CgToolbox } from 'react-icons/cg';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { TbReport, TbSettings, TbLayoutGrid,} from 'react-icons/tb';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userName, setUserName] = useState(''); // Define el estado local para almacenar el nombre de usuario

    useEffect(() => {
        // Decodificar el token JWT para obtener la información del usuario, como el nombre
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            setUserName(decodedToken.nombre); // Establecer el nombre de usuario en el estado local
        }else{
            setUserName('Usuario');
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        const handleResize = () => {
            if (window.innerWidth > 640) {
                setShowMenu(false);
            }
        };

        handleResize();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSmoothScroll = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            const scrollOptions = {
                top: offsetTop,
                behavior: 'smooth'
            };
            window.scrollTo(scrollOptions);
        }
    };

    return (
        <header className={`fixed flex w-full p-4 h-[7vh] bg-gray-900 items-center z-20 ${isScrolled ? 'bg-opacity-90' : ''}`}>
            <div className='flex w-full text-2xl font-bold '>
                <h1 className="mr-1 text-white">Studio</h1>
                <h1 className="text-primary">Once Once</h1>
            </div>
            <nav className="flex-1">
                <ul className={`fixed flex flex-col items-center justify-center w-[80%] md:w-full xl:w-full h-full gap-5 top-0 xl:justify-end xl:items-end xl:flex-row xl:static md:justify-end md:items-end md:flex-row md:static transition-all duration-500 ${showMenu ? "left-0 bg-gray-900" : "-left-full"}`}>
                    <li className='flex justify-center p-4 text-white transition-colors duration-500 border-b border-gray-600 md:p-0 md:transition-none md:border-none'>
                        <NavLink to="/client" className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                            <TbLayoutGrid className="mr-1" size={20} />
                            Home
                        </NavLink>
                    </li>
                    <li className='flex justify-center p-4 text-white transition-colors duration-500 border-b border-gray-600 md:p-0 md:transition-none md:border-none'>
                        <a href="#services" onClick={handleSmoothScroll} className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                            <CgToolbox className="mr-1" size={20} />
                            Servicios
                        </a>
                    </li>
                    <li className='relative flex items-center justify-center p-4 text-white transition-colors duration-500 md:p-0 md:transition-none md:border-none'>
                        <button
                            className='p-2 text-w hover:bg-blue-950 hover:rounded-lg'
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <div className='relative flex items-center justify-center p-4 mr-16 text-white transition-colors duration-500 md:p-0 md:transition-none md:border-none'>
                                <CgProfile className="mr-1" size={20} />
                                <p>{userName}</p>
                            </div>
                            {showDropdown && (
                                <ul className='absolute left-0 w-40 mt-2 bg-gray-900 rounded-lg' onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                                    <li className='flex p-2'>
                                        <NavLink to='/Settings' className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                                            <TbSettings className='mr-1' size={20} />
                                            Configuración
                                        </NavLink>
                                    </li>
                                    <li className='flex p-2'>
                                        <NavLink to="/Reports" className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                                            <TbReport className="mr-1" size={20} />
                                            Reportes
                                        </NavLink>
                                    </li>
                                    <li className='flex p-2'>
                                        <NavLink to="/Rewards" className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                                            <FaMoneyBillAlt className="mr-1" size={20} />
                                            Recompensas
                                        </NavLink>
                                    </li>
                                    <li className='flex p-2'>
                                        <NavLink to="/logout" className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                                            <CgLogOut  className="mr-1" size={20} />
                                            Log Out
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </button>
                    </li>
                </ul>
            </nav>
            <button className="text-xl text-w xl:hidden md:hidden" onClick={() => setShowMenu(!showMenu)} >
                {showMenu ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
            </button>
        </header>
    );
};

export default Navbar;
