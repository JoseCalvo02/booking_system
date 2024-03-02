import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

//Icons
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CgProfile, CgLogOut, CgToolbox } from "react-icons/cg";
import { FaMoneyBillAlt } from "react-icons/fa";
import { TbReport, TbSettings, TbLayoutGrid } from "react-icons/tb";


export default function Navbar() {
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const scrollTop = window.scrollY;
        // Cambiar la opacidad del navbar cuando se desplaza más allá de cierta posición
        setIsScrolled(scrollTop > 50);
        };

        const handleResize = () => {
            if (window.innerWidth > 640) {
            setShowMenu(false);
            }
        };
        // Call handleResize on initial load
        handleResize();

        // Event listeners for window scroll and resize
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

    return (
        <header className={`fixed flex w-full p-4 h-[7vh] bg-gray-900 items-center z-20 ${isScrolled ? 'bg-opacity-90' : ''}`}>
            {/* Logo y Nombre */}
            <div className='flex w-full text-2xl font-bold '>
                <h1 className="mr-1 text-white">Studio</h1>
                <h1 className="text-primary">Once Once</h1>
            </div>

            <nav className="flex-1">
                {/* Opciones de Navegación */}
                <ul className={`fixed flex flex-col items-center justify-center w-[80%] md:w-full xl:w-full h-full gap-5 top-0 xl:justify-end xl:items-end xl:flex-row xl:static md:justify-end md:items-end md:flex-row md:static transition-all duration-500 ${showMenu ? "left-0 bg-gray-900" : "-left-full"}`}>
                    {/* Opciones de HOME */}
                    <li className='flex justify-center p-4 text-white transition-colors duration-500 border-b border-gray-600 md:p-0 md:transition-none md:border-none'>
                        <NavLink to="/Client" className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                            <TbLayoutGrid className="mr-1" size={20} />
                            Home
                        </NavLink>
                    </li>
                    {/* Opciones de SERVICES */}
                    <li className='flex justify-center p-4 text-white transition-colors duration-500 border-b border-gray-600 md:p-0 md:transition-none md:border-none'>
                        <NavLink to="/services" className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg' >
                            <CgToolbox className="mr-1" size={20} />
                            Servicios
                        </NavLink>
                    </li>
                    {/* Opciones de PROFILE */}
                    <li className='relative flex items-center justify-center p-4 text-white transition-colors duration-500 md:p-0 md:transition-none md:border-none'>
                        <button
                        className='p-2 text-w hover:bg-blue-950 hover:rounded-lg'
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                        >
                            <div className='relative flex items-center justify-center p-4 mr-16 text-white transition-colors duration-500 md:p-0 md:transition-none md:border-none'>
                                <CgProfile className="mr-1" size={20} />
                                <p>Perfil</p>
                            </div>
                            { /* Dropdown Options */}
                            {showDropdown && (
                                <ul className='absolute left-0 w-40 mt-2 bg-gray-900 rounded-lg' onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                                    <li className='flex p-2'>
                                        <NavLink to='/settings' className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                                            <TbSettings className='mr-1' size={20} />
                                            Configuración
                                        </NavLink>
                                    </li>
                                    <li className='flex p-2'>
                                        <NavLink to="/reports" className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                                            <TbReport className="mr-1" size={20} />
                                            Reportes
                                        </NavLink>
                                    </li>
                                    <li className='flex p-2'>
                                        <NavLink to="/rewards" className='flex items-center p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
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
}