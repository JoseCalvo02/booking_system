import React from 'react';
import { twMerge } from 'tailwind-merge';

import { TbClipboardText, TbClipboardData, TbClipboardList } from "react-icons/tb";
import customStyles from '../../custom/customStyles';

const Reports = () => {
    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            <h1 className='p-1 mb-8 text-lg font-semibold text-center md:text-xl lg:text-2xl'>
                Módulo de Reportes
            </h1>

            <section className='grid items-center gap-8 grid-col-1 md:grid-cols-3'>
                <div className={customStyles.repCard}>
                    <TbClipboardText className='w-12 h-12 mx-auto mb-2 text-blue-500' />
                    <h2 className='mb-2 text-xl font-semibold'>Horarios</h2>
                    <p>Generar reporte de horarios por mes.</p>
                    <button className={twMerge(customStyles.repBtn, 'bg-blue-500 hover:bg-blue-600')}>Generar reporte</button>
                </div>

                <div className={customStyles.repCard}>
                    <TbClipboardData className='w-12 h-12 mx-auto text-green-500' />
                    <h2 className='mb-2 text-xl font-semibold'>Citas</h2>
                    <p>Generar reporte de citas por mes.</p>
                    <button className={twMerge(customStyles.repBtn, 'bg-green-500 hover:bg-green-600')}>Generar reporte</button>
                </div>

                <div className={customStyles.repCard}>
                    <TbClipboardList className='w-12 h-12 mx-auto text-red-500' />
                    <h2 className='mb-2 text-xl font-semibold'>Cupones</h2>
                    <p>Generar reporte de cupones por mes.</p>
                    <button className={twMerge(customStyles.repBtn, 'bg-red-500 hover:bg-red-600')}>Generar reporte</button>
                </div>
            </ section>
        </div>
    );
}

export default Reports;
