import React from 'react'
import Navbar from '../../../components/Shared/Navbar/Navbar'

function admin() {
    return (
        <div>
            <Navbar />

            {/* Aquí va el contenido de la página de administrador */}
            <div className='h-[100vh] flex justify-center items-center bg-gray-400'>
                <h1 className='text-4xl text-center text-gray-900 bg-red-500'>
                    Admin Page
                </h1>

            </div>

        </div>
    )
}

export default admin