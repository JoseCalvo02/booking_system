import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; //Para anidar rutas
import { decodeToken } from '../../../utils/tokenUtils'; //Función para decodificar el token JWT
//Components
import Sidebar from '../../../components/Shared/Sidebar/Sidebar'
//Icons
import { CgProfile } from "react-icons/cg";
import { FaMoon, FaSun  } from "react-icons/fa";

export default function Admin() {
    const [isMoonIcon, setIsMoonIcon] = useState(true); // Define el estado local para almacenar el tipo de icono actual
    const [userName, setUserName] = useState(''); // Define el estado local para almacenar el nombre de usuario

    useEffect(() => {
        // Decodificar el token JWT para obtener la información del usuario, como el nombre
        const decodedToken = decodeToken();

        decodedToken ? setUserName(decodedToken.name) : setUserName('Usuario');
    }, []);

    // Función para alternar entre los iconos al hacer clic
    const toggleIcon = () => {
        setIsMoonIcon(!isMoonIcon);
    };

    return (
        <div className='grid h-screen grid-cols-6 bg-bgWhite'>
            <Sidebar />

            <main className='flex flex-col w-full max-h-screen col-span-5'>
                {/* Header */}
                <header className='flex justify-between items-center min-h-[6vh] px-8 py-2 mx-6 mt-6 mb-2 bg-white shadow-custom rounded-xl'>
                    <h1 className= 'flex-1'>
                        Dashboard
                    </h1>
                    <div className='flex items-center h-full gap-2'>
                        {/* Renderiza el icono FaMoon o FaSun según el estado actual */}
                        <div className='p-2 mr-2 bg-white border border-black border-opacity-25 rounded-md shadow-md hover:shadow-none' style={{ cursor: 'pointer' }}>
                            {isMoonIcon ? (
                                <FaMoon onClick={toggleIcon} size={17}/>
                            ) : (
                                <FaSun onClick={toggleIcon} size={17}/>
                            )}
                        </div>
                        <div className='flex items-center gap-2 border-l border-gray-600'>
                            <h1 className='ml-3'>
                                {userName}
                            </h1>
                            <CgProfile size={20}/>
                        </div>
                    </div>
                </header>

                {/* Main */}
                <section className='flex gap-8 m-6 h-[85vh]'>
                    <Outlet />
                </section>
            </main>
        </div>
    )
}