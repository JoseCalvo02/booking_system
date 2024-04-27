import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; //Para anidar rutas
import { decodeToken } from '../../../utils/tokenUtils'; //Función para decodificar el token JWT
//Components
import Sidebar from '../../../components/Shared/Sidebar/Sidebar'
//Icons
import { CgProfile } from "react-icons/cg";

export default function Admin() {
    const [user, setUser] = useState({}); // Define el estado local para almacenar la información del usuario

    useEffect(() => {
        // Decodificar el token JWT para obtener la información del usuario, como el nombre
        const decodedToken = decodeToken();
        setUser({
            name: decodedToken.name,
            lastName: decodedToken.lastName,
        });
    }, []);

    return (
        <div className='grid h-screen grid-cols-6 bg-bgWhite'>
            <Sidebar />

            <main className='flex flex-col w-full max-h-screen col-span-5'>
                {/* Header */}
                <header className='flex justify-between items-center min-h-[6vh] px-8 py-2 mx-6 mt-6 mb-2 bg-white shadow-custom rounded-xl'>
                    <h1 className= 'flex-1 text-lg font-bold'>
                        Dashboard
                    </h1>
                    <div className='flex items-center h-full gap-2'>
                        <div className='flex items-center gap-2 border-l border-gray-600'>
                            <h1 className='ml-3 text-lg font-bold'>
                                {user.name} {user.lastName}
                            </h1>
                            <CgProfile size={25}/>
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