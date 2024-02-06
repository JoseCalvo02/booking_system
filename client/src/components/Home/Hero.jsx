import React from 'react';
import { ReactTyped } from 'react-typed';
import manImage from './../../assets/manicure.png';

function Hero() {
    return (
        <section className="relative text-black">
            <div className="max-w-[800px] w-full h-[93vh] mx-auto text-center flex flex-col justify-center relative" style={{ zIndex: '20' }}>
                <p className="p-2 font-bold uppercase text-md md:text-xl text-primary">
                    Lorem ipsum dolor sit amet consectetur.
                </p>
                <h1 className="text-4xl font-bold md:text-7xl sm:text-6xl md:py-6">
                    Los mejores servicios.
                </h1>
                <div className='flex items-center justify-center '>
                    <p className="py-4 text-xl font-bold md:text-4xl sm:text-3xl">
                        Lorem ipsum dolor sit
                    </p>
                    <ReactTyped
                        className='pl-2 text-xl font-bold md:pl-4 md:text-4xl sm:text-3xl text-primary'
                        strings={['Esmaltado.', 'Pedicure.', 'Mucho Mas.']} typeSpeed={120} backSpeed={140} loop
                    />
                </div>

                <p className='text-xl font-bold text-gray-500 md:text-2xl'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, fugit!
                </p>
                <button className='bg-primary w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white hover:bg-primary_h'>Comenzemos</button>
            </div>
            <img src={manImage} alt="Manicure" className="absolute inset-0 z-0 object-cover w-full h-full opacity-15" />
        </section>
    );
}

export default Hero;
