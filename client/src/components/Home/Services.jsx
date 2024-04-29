import React from 'react'
import { Link } from 'react-router-dom';
import {FaShopify} from 'react-icons/fa';

export default function Services() {
    return (
        <div className='w-full py-[10rem] px-4 bg-bgWhite'>
            {/* Primer tarjeta */}
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
                <div className='flex flex-col w-full p-4 py-20 my-4 text-white duration-300 bg-gray-900 rounded-lg shadow-2xl hover:scale-105'>
                    <FaShopify className='w-20 mx-auto mt-[-3rem]' size={40} />
                    <h2 className='py-8 text-2xl font-bold text-center '>Manicure Mujeres</h2>
                    <div className='font-medium text-center'>
                        <p className='py-2 mx-8 mt-8 border-b'>Duracion: 60 min</p>
                        <p className='py-2 mx-8 border-b'>Protección Natural de Uñas</p>
                        <p className='py-2 mx-8 border-b'>Los precios pueden variar</p>
                    </div>
                    <Link className='px-6 py-3 mx-auto my-6' to="/auth?signIn=true">
                        <button className='bg-primary w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-primary_h'>Comenzemos</button>
                    </Link>
                </div>
                {/* Segunda tarjeta */}
                <div className='flex flex-col w-full p-4 py-20 my-4 text-white duration-300 bg-gray-900 rounded-lg shadow-2xl hover:scale-105'>
                    <FaShopify className='w-20 mx-auto mt-[-3rem]' size={40} />
                    <h2 className='py-8 text-2xl font-bold text-center '>Manicure Gel X</h2>
                    <div className='font-medium text-center'>
                        <p className='py-2 mx-8 mt-8 border-b'>Duracion: 60 min</p>
                        <p className='py-2 mx-8 border-b'>Manicure con gel especial</p>
                        <p className='py-2 mx-8 border-b'>Incluye crema y mascarilla</p>
                    </div>
                    <Link className='px-6 py-3 mx-auto my-6' to="/auth?signIn=true">
                        <button className='bg-primary w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-primary_h'>Comenzemos</button>
                    </Link>
                </div>
                {/* Tercer tarjeta */}
                <div className='flex flex-col w-full p-4 py-20 my-4 text-white duration-300 bg-gray-900 rounded-lg shadow-2xl hover:scale-105'>
                    <FaShopify className='w-20 mx-auto mt-[-3rem]' size={40} />
                    <h2 className='py-8 text-2xl font-bold text-center'>Diseño de Cejas</h2>
                    <div className='font-medium text-center'>
                        <p className='py-2 mx-8 mt-8 border-b'>Duración: 25 min</p>
                        <p className='py-2 mx-8 border-b'>Se realiza con Cera</p>
                        <p className='py-2 mx-8 border-b'>Incluye mascarilla</p>
                    </div>
                    <Link className='px-6 py-3 mx-auto my-6' to="/auth?signIn=true">
                        <button className='bg-primary w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-primary_h'>Comenzemos</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
