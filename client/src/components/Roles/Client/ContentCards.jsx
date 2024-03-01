import React from 'react'
import prueba2 from '../../../assets/prueba2.jpg';
import prueba3 from '../../../assets/prueba3.jpg';

function ContentCards() {
    return (
        <main className='flex flex-col w-full mt-24'>
            <h2 className='p-2 text-4xl font-bold text-center'>Servicios mas utilizados</h2>
            <section className='flex flex-grow gap-8 mt-2'>
                <div className='flex items-center justify-center w-full ml-16'>
                    <div className='flex flex-col items-center justify-center card'>
                        <img src={prueba2} alt='Imagen' className='card-image h-80' />
                        <div className='text-center card-content'>
                            <h3 className='card-title'>Pedicure</h3>
                            <p className='card-description'>Precio: ₡ 15,000<br />Duración: 1 Hora<br />Profesionalidad: Realizado por expertos pedicuristas con años de experiencia.</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center w-full'>
                    <div className='flex flex-col items-center justify-center card'>
                        <img src={prueba3} alt='Imagen' className='card-image h-80' />
                        <div className='text-center card-content'>
                            <h3 className='card-title'>Manicure</h3>
                            <p className='card-description'>Precio: ₡ 15,000<br />Duración: 1 Hora<br />Profesionalidad: Realizado por expertos pedicuristas con años de experiencia.</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center w-full'>
                    <div className='flex flex-col items-center justify-center card'>
                        <img src={prueba2} alt='Imagen' className='card-image h-80' />
                        <div className='text-center card-content'>
                            <h3 className='card-title'>Masaje</h3>
                            <p className='card-description'>Precio: ₡ 15,000<br />Duración: 1 Hora<br />Profesionalidad: Realizado por expertos pedicuristas con años de experiencia.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default ContentCards