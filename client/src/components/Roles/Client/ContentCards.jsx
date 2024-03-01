import React from 'react'
import prueba2 from '../../../assets/prueba2.jpg';
import prueba3 from '../../../assets/prueba3.jpg';

function ContentCards() {
    return (
        <main className='flex flex-col w-full mt-24 mb-10'>
    <h2 className='p-2 text-4xl font-bold text-center'>Servicios más utilizados</h2>
    <section className='flex flex-grow gap-8 mt-2'>
        <div className='flex items-center justify-center w-full ml-16'>
            <div className='shadow-lg'>
                <div className='overflow-hidden bg-white rounded-lg shadow-md'>
                    <img src={prueba2} alt='Imagen' className='object-cover w-full h-80' />
                    <div className='p-4'>
                        <h3 className='mb-2 text-xl font-semibold'>Pedicure</h3>
                        <p className='justify-center text-sm'>Precio: ₡ 15,000<br />Duración: 1 Hora<br />Profesionalidad: Realizado por expertos pedicuristas con años de experiencia.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-center w-full'>
            <div className='shadow-lg'>
                <div className='overflow-hidden bg-white rounded-lg shadow-md'>
                    <img src={prueba3} alt='Imagen' className='object-cover w-full h-80' />
                    <div className='p-4'>
                        <h3 className='mb-2 text-xl font-semibold'>Manicure</h3>
                        <p className='text-sm'>Precio: ₡ 15,000<br />Duración: 1 Hora<br />Profesionalidad: Realizado por expertos pedicuristas con años de experiencia.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-center w-full'>
            <div className='shadow-lg'>
                <div className='overflow-hidden bg-white rounded-lg shadow-md'>
                    <img src={prueba2} alt='Imagen' className='object-cover w-full h-80' />
                    <div className='p-4'>
                        <h3 className='mb-2 text-xl font-semibold'>Masaje</h3>
                        <p className='text-sm'>Precio: ₡ 15,000<br />Duración: 1 Hora<br />Profesionalidad: Realizado por expertos pedicuristas con años de experiencia.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

    )
}
export default ContentCards