import React from 'react'
import DownloandPDFModal from '../../Modals/DownloandPDFModal';

const handleDownloand = async () => {
    await DownloandPDFModal();
}

function Reports() {
    return (
        <section className="flex flex-col items-center justify-center h-screen">
            {/* Encabezado */}
            <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 align-middle md:text-5xl lg:text-6xl dark:text-black mt-26">
                Reportes de Usuario
            </h1>
            <div className='flex'>
                {/* Reporte 1 */}
                <div className="max-w-sm p-6 mt-4 mr-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reporte Actividad</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Reporte que muestra el ID, ultima conexion y ultima cita</p>
                    <a onClick={handleDownloand} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Descargar PDF
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
                {/* Reporte 2 */}
                <div className="max-w-sm p-6 mt-4 mr-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reporte Citas</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Reporte que muestra el historial de citas del Usuario</p>
                    <a onClick={handleDownloand} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Descargar PDF
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Reports;
