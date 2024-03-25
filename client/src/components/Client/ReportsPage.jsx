import React from 'react';
import DownloandPDFModal from '../Modals/DownloandPDFModal';
import PDF1 from '../../components/Client/PDF/PDF_1';
import PDF2 from '../../components/Client/PDF/PDF_2';
import { PDFDownloadLink } from '@react-pdf/renderer';

const handleDownload = async () => {
    await DownloandPDFModal();
}

function Reports() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="mt-16 mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 align-middle md:text-5xl lg:text-6xl dark:text-black">
                Reportes de Usuario
            </h1>
            <div className="flex flex-col md:flex-row md:justify-center">
                <div className="w-full max-w-md p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow md:w-auto md:mr-10 dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reporte Actividad</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Reporte que muestra la actividad relevante del usuario</p>
                    <PDFDownloadLink document={<PDF1 />} fileName="Reporte Informacion Personal.pdf">
                        {({ loading }) => (
                            <button onClick={handleDownload} className="w-full py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {loading ? 'Generando PDF...' : 'Descargar Ahora'}
                            </button>
                        )}
                    </PDFDownloadLink>
                </div>
                <div className="w-full max-w-md p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow md:w-auto md:mr-10 dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reporte Citas</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Reporte que muestra el historial de citas del Usuario</p>
                    <PDFDownloadLink document={<PDF2 />} fileName="Reporte Citas de Usuario.pdf">
                        {({ loading }) => (
                            <button onClick={handleDownload} className="w-full py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {loading ? 'Generando PDF...' : 'Descargar Ahora'}
                            </button>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>
        </section>
    );
}

export default Reports;

