import React from 'react'

function MainContent() {
    return (
        <main className='flex flex-col w-full'>
            <section className='flex flex-grow gap-8 mt-20'>
                <div className='w-full bg-zinc-400 h-80'>
                    <h2 className='p-2'>Imagen</h2>
                </div>
            </section>

            <section className='flex flex-grow gap-8 m-auto mt-10'>
                <div className='w-auto rounded-lg'>
                    <h2 className='p-2 text-4xl font-bold text-center'>Reserve Aquí</h2>
                    <div className='flex flex-grow w-auto gap-8 p-1 ml-6 mr-6 bg-gray-900 rounded-lg ' >
                        <select className='p-2 mt-1 mb-1 ml-1 text-gray-800 bg-white border border-blue-500 rounded-sm w-80 h-14'>
                            <option value=''>Seleccionar servicio</option>
                            {/* Agrega opciones de servicios aquí */}
                        </select>
                        <select className='mt-1 mb-1 text-gray-800 bg-white border border-blue-500 rounded-sm w-80 h-14'>
                            <option value=''>Seleccionar fecha</option>
                            {/* Agrega opciones de fechas aquí */}
                        </select>
                        <select className='p-2 mt-1 mb-1 text-gray-800 bg-white border border-blue-500 rounded-sm w-80 h-14'>
                            <option value=''>Seleccionar estilista</option>
                            {/* Agrega opciones de estilistas aquí */}
                        </select>
                        <select className='p-2 mt-1 text-gray-800 bg-white border border-blue-500 rounded-sm mb- w-80 h-14'>
                            <option value=''>Seleccionar hora</option>
                            {/* Agrega opciones de horas aquí */}
                        </select>
                        
                        <button className='w-40 p-2 mt-1 mb-1 mr-1 text-gray-800 bg-white border border-blue-500 rounded-sm h-14'>
                            Reservar cita
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default MainContent