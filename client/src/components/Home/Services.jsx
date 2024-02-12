import React from 'react'

import {FaFacebookSquare} from 'react-icons/fa';

export default function Services() {
    return (
        <div className='w-full py-[10rem] px-4 bg-bg_black'>
            {/* Primer tarjeta */}
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
                <div className='flex flex-col w-full p-4 my-4 text-white duration-300 rounded-lg shadow-2xl hover:scale-105'>
                    <FaFacebookSquare className='w-20 mx-auto mt-[-3rem]' size={40} />
                    <h2 className='py-8 text-2xl font-bold text-center '>Single User</h2>
                    <p className='text-4xl font-bold text-center'>$149</p>
                    <div className='font-medium text-center'>
                        <p className='py-2 mx-8 mt-8 border-b'>500 GB Storage</p>
                        <p className='py-2 mx-8 border-b'>1 Granted User</p>
                        <p className='py-2 mx-8 border-b'>Send up to 2 GB</p>
                    </div>
                    <button className='bg-primary w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-primary_h'>Start Trial</button>
                </div>
                {/* Segunda tarjeta */}
                <div className='flex flex-col w-full p-4 my-8 text-white duration-300 bg-black rounded-lg shadow-2xl md:my-0 hover:scale-105'>
                    <FaFacebookSquare className='w-20 mx-auto mt-[-3rem]' size={40} />
                    <h2 className='py-8 text-2xl font-bold text-center'>Single User</h2>
                    <p className='text-4xl font-bold text-center'>$149</p>
                    <div className='font-medium text-center'>
                        <p className='py-2 mx-8 mt-8 border-b'>500 GB Storage</p>
                        <p className='py-2 mx-8 border-b'>1 Granted User</p>
                        <p className='py-2 mx-8 border-b'>Send up to 2 GB</p>
                    </div>
                    <button className='bg-primary text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-primary_h'>Start Trial</button>
                </div>
                {/* Tercer tarjeta */}
                <div className='flex flex-col w-full p-4 my-4 text-white duration-300 rounded-lg shadow-2xl hover:scale-105'>
                    <FaFacebookSquare className='w-20 mx-auto mt-[-3rem]' size={40} />
                    <h2 className='py-8 text-2xl font-bold text-center'>Single User</h2>
                    <p className='text-4xl font-bold text-center'>$149</p>
                    <div className='font-medium text-center'>
                        <p className='py-2 mx-8 mt-8 border-b'>500 GB Storage</p>
                        <p className='py-2 mx-8 border-b'>1 Granted User</p>
                        <p className='py-2 mx-8 border-b'>Send up to 2 GB</p>
                    </div>
                    <button className='bg-primary w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-primary_h'>Start Trial</button>
                </div>
            </div>
        </div>
    );
}
