import React from 'react'
import Logo from "../../assets/logo.png"
import manImage from './../../assets/manicure.png';

export default function AboutUs() {
    return (
        <section className='relative'>
            {/* Agrega la imagen como fondo */}
            <div className='absolute inset-0 z-0'>
                <img src={manImage} alt="Manicure" className="object-cover w-full h-full opacity-15" />
            </div>
            <div className='relative z-10 w-full px-4 py-16 '>
                <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                    <img className='w-[500px] mx-auto my-4' src={Logo} alt="/" />
                    <div className='flex flex-col justify-center'>
                        <p className='font-bold uppercase text-primary'>Lorem ipsum dolor sit amet.</p>
                        <h1 className='py-2 text-2xl font-bold md:text-4xl sm:text-3xl'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores enim voluptatem maiores veniam excepturi, obcaecati aut provident corrupti tempore nostrum hic, quod harum fugiat quam est iure dignissimos ratione distinctio?</p>
                        <button className='bg-bg_black hover:bg-black w-[150px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-white'>Comenzemos</button>
                    </div>
                </div>
            </div>
        </section>
    )
}