import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import prueba2 from '../../../assets/prueba2.jpg';
import prueba3 from '../../../assets/prueba3.jpg';

function ContentCards() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'ease-in-out'
    };

    return (
        <main className='flex flex-col w-full mt-24 mb-10'>
            <Slider {...settings}>
                <div className="relative slider-item h-96">
                    <img src={prueba2} alt='Pedicure' className='object-cover w-full rounded-lg h-96 filter brightness-50 ' />
                    <div className='absolute inset-0 flex flex-col items-center justify-center text-center h-96'>
                        <div className="p-4 bg-white rounded-lg bg-opacity-70">
                            <h3 className='mb-2 text-3xl font-semibold text-black'>Pedicure</h3>
                            <p className='text-lg text-black'>Precio: ₡ 15,000 | Duración: 1 Hora | Profesionalidad: Realizado por expertos pedicuristas con años de experiencia.</p>
                        </div>
                    </div>
                </div>
                <div className="relative slider-item">
                    <img src={prueba3} alt='Manicure' className='object-cover w-full rounded-lg h-96 filter brightness-50' />
                    <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                        <div className="p-4 bg-white rounded-lg bg-opacity-70">
                            <h3 className='mb-2 text-3xl font-semibold text-black'>Manicure</h3>
                            <p className='text-lg text-black'>Precio: ₡ 15,000 | Duración: 1 Hora | Profesionalidad: Realizado por expertos pedicuristas con años de experiencia.</p>
                        </div>
                    </div>
                </div>
                <div className="relative slider-item">
                    <img src={prueba3} alt='Manicure' className='object-cover w-full rounded-lg h-96 filter brightness-50' />
                    <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                        <div className="p-4 bg-white rounded-lg bg-opacity-70">
                            <h3 className='mb-2 text-3xl font-semibold text-black'>Masajes</h3>
                            <p className='text-lg text-black'>Precio: ₡ 15,000 | Duración: 1 Hora | Profesionalidad: Realizado por expertos pedicuristas con años de experiencia.</p>
                        </div>
                    </div>
                </div>
                <div className="relative slider-item">
                    <img src={prueba3} alt='Manicure' className='object-cover w-full rounded-lg h-96 filter brightness-50' />
                    <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                        <div className="p-4 bg-white rounded-lg bg-opacity-70">
                            <h3 className='mb-2 text-3xl font-semibold text-black'>Limpieza Facial</h3>
                            <p className='text-lg text-black'>Precio: ₡ 15,000 | Duración: 1 Hora | Profesionalidad: Realizado por expertos pedicuristas con años de experiencia.</p>
                        </div>
                    </div>
                </div>
                {/* Agregar más slides según sea necesario */}
            </Slider>
        </main>
    );
}

export default ContentCards;





