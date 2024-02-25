import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

//Icons
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export default function Navbar() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPage = location.pathname;

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
                <li className='p-4 transition-colors duration-500 border-b border-gray-600 md:p-0 md:transition-none md:border-none'>
                    <NavLink to="/" className={`text-w p-2 hover:bg-blue-950 hover:rounded-lg ${location.pathname === "/" ? "md:bg-blue-900 md:rounded-lg" : ""}`}>
                        Home
                    </NavLink>
                </li>
                {currentPage !== "/auth" &&
                    <li className='p-4 transition-colors duration-500 border-b border-gray-600 md:p-0 md:transition-none md:border-none'>
                        <a className="p-2 text-w hover:bg-blue-950 hover:rounded-lg" href="#contact-us">Contact</a>
                    </li>
                }
                {currentPage !== "/auth" &&
                    <li className='p-4 transition-colors duration-500 border-b border-gray-600 md:p-0 md:transition-none md:border-none'>
                        <NavLink to="/auth?signIn=true" className='p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                            Login
                        </NavLink>
                    </li>
                }
                {currentPage !== "/auth" &&
                    <li className='p-4 transition-colors duration-500 md:p-0 md:transition-none md:border-none'>
                        <NavLink to="/auth?signIn=false" className='p-2 text-w hover:bg-blue-950 hover:rounded-lg'>
                            Signup
                        </NavLink>
                    </li>
                }
            </ul>
        </nav>
        <button className="text-xl text-w xl:hidden md:hidden" onClick={() => setShowMenu(!showMenu)} >
            {showMenu ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
        </button>
    </header>
  );
}