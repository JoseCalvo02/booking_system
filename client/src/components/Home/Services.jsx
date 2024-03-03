import React from 'react'

import {FaShopify} from 'react-icons/fa';

export default function Services() {
    return (
        <div className='w-full py-[10rem] px-4 bg-gray-300'>
            {/* Primer tarjeta */}
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
                <div className='flex flex-col w-full p-4 py-20 my-4 text-white duration-300 bg-gray-900 rounded-lg shadow-2xl hover:scale-105'>
                    <FaShopify className='w-20 mx-auto mt-[-3rem]' size={40} />
                    <h2 className='py-8 text-2xl font-bold text-center '>Esmaltado en Gel OPI</h2>
                    <p className='text-4xl font-bold text-center'>₡11,500</p>
                    <div className='font-medium text-center'>
                        <p className='py-2 mx-8 mt-8 border-b'>Duracion: 60 min</p>
                        <p className='py-2 mx-8 border-b'>Protección sobre uña natural</p>
                        <p className='py-2 mx-8 border-b'>Los precios pueden variar</p>
                    </div>
                    <button className='bg-primary w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-primary_h'>Comenzemos</button>
                </div>
                {/* Segunda tarjeta */}
                <div className='flex flex-col w-full p-4 py-20 my-4 text-white duration-300 bg-gray-900 rounded-lg shadow-2xl hover:scale-105'>
                    <FaShopify className='w-20 mx-auto mt-[-3rem]' size={40} />
                    <h2 className='py-8 text-2xl font-bold text-center '>Manicure Spa</h2>
                    <p className='text-4xl font-bold text-center'>₡21,500</p>
                    <div className='font-medium text-center'>
                        <p className='py-2 mx-8 mt-8 border-b'>Duracion: 90 min</p>
                        <p className='py-2 mx-8 border-b'>Manicure a base de sales</p>
                        <p className='py-2 mx-8 border-b'>Incluye crema y mascarilla cosmética</p>
                    </div>
                    <button className='bg-primary w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-primary_h'>Comenzemos</button>
                </div>
                {/* Tercer tarjeta */}
                <div className='flex flex-col w-full p-4 py-20 my-4 text-white duration-300 bg-gray-900 rounded-lg shadow-2xl hover:scale-105'>
                    <FaShopify className='w-20 mx-auto mt-[-3rem]' size={40} />
                    <h2 className='py-8 text-2xl font-bold text-center'>Adicional Luminary</h2>
                    <p className='text-4xl font-bold text-center'>₡8,000</p>
                    <div className='font-medium text-center'>
                        <p className='py-2 mx-8 mt-8 border-b'>Duración: 15 min</p>
                        <p className='py-2 mx-8 border-b'>Resistencia a la uña natural</p>
                        <p className='py-2 mx-8 border-b'>Protección extra sobre la uña</p>
                    </div>
                    <button className='bg-primary w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-primary_h'>Comenzemos</button>
                </div>
            </div>
        </div>
    );
}
