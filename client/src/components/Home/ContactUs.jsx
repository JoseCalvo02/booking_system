import React from 'react'

export default function ContactUs() {
    return (
        <div className='w-full px-4 py-16 text-white bg-gray-900'>
            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
                <div className='my-4 lg:col-span-2'>
                    <h1 className='py-2 text-2xl font-bold md:text-4xl sm:text-3xl'>
                        Le gustaría contactarnos directamente?
                    </h1>
                    <p>Envianos un mensaje directo a nuestro Whatsapp</p>
                </div>
                <div className='my-4'>
                    <div className='flex flex-col items-center justify-between w-full sm:flex-row'>
                        <input
                        className='flex w-full p-3 text-black rounded-md'
                        type='email'
                        placeholder='Ingresa tu nombre'
                        />
                        <button className='bg-primary hover:bg-primary_h text-white rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>
                            Contactar
                        </button>
                    </div>
                    <p>
                        Te responderemos apenas haya un agente disponible y recuerda revisar: {' '}
                        <span className='text-primary'>Nuestro Horario</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
