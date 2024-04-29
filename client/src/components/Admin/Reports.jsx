import React from 'react';
import { twMerge } from 'tailwind-merge';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFSchedule from '../PDF/PDF_Schedule';
import PDFAppt from '../PDF/PDF_Appt';
import CouponsScheduleReport from '../PDF/PDF_Coupons';

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
                    <p className='mb-5'>Generar reporte de horarios por mes.</p>
                    <PDFDownloadLink
                        document={<PDFSchedule selectedYear={new Date().getFullYear()} selectedMonth={new Date().getMonth() + 1} />}
                        fileName={`Horarios-${new Date().getFullYear()}-${new Date().getMonth() + 1}.pdf`}
                        onClick={() => console.log('Descargando horarios...')}
                        className={twMerge(customStyles.repBtn, 'bg-blue-500 hover:bg-blue-600')}
                    >
                        {({ loading }) => (loading ? 'Cargando...' : 'Generar reporte')}
                    </PDFDownloadLink>
                </div>

                <div className={customStyles.repCard}>
                    <TbClipboardData className='w-12 h-12 mx-auto text-green-500' />
                    <p className='mb-5'>Generar reporte de citas por mes.</p>
                    <PDFDownloadLink 
                        document={<PDFAppt />}
                        fileName={`Citas-${new Date().getFullYear()}-${new Date().getMonth() + 1}.pdf`}
                        onClick={() => console.log('Descargando citas...')}
                        className={twMerge(customStyles.repBtn, 'bg-green-500 hover:bg-green-600')}
                    >
                        {({ loading }) => (loading ? 'Cargando...' : 'Generar reporte')}
                    </PDFDownloadLink>
                </div>

                <div className={customStyles.repCard}>
                    <TbClipboardList className='w-12 h-12 mx-auto text-red-500' />
                    <p className='mb-5'>Generar reporte de cupones por mes.</p>
                    <PDFDownloadLink 
                        document={<CouponsScheduleReport />}
                        fileName={`Cupones-${new Date().getFullYear()}-${new Date().getMonth() + 1}.pdf`}
                        onClick={() => console.log('Descargando cupones...')}
                        className={twMerge(customStyles.repBtn, 'bg-red-500 hover:bg-red-600')}
                    >
                        {({ loading }) => (loading ? 'Cargando...' : 'Generar reporte')}
                    </PDFDownloadLink>
                </div>
            </ section>
        </div>
    );
}

export default Reports;
