import React from 'react';

function Reports() {
    return (
        <section className="flex flex-wrap items-center justify-center p-40">
            <div className="relative flex-shrink-0 max-w-xs m-6 overflow-hidden rounded-lg shadow-md bg-clip-border bg-slate-200">
                <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: '0.1' }}>
                </svg>
                <div className="relative flex items-center justify-center px-10 pt-10">
                    <div className="absolute bottom-0 left-0 block w-48 h-48 ml-3 -mb-24"></div>
                    <img className="relative w-40" src="https://www.pngmart.com/files/8/Report-PNG-Clipart.png" alt="" />
                </div>
                <div className="relative px-6 pb-6 mt-6 text-black">
                    <span className="block -mb-1 opacity-75">Reporte de</span>
                    <div className="flex justify-between">
                        <span className="block text-xl font-semibold">Actividad del Usuario</span>
                        <button className="flex items-center block px-3 py-2 text-xs font-bold leading-none text-black bg-white rounded-full hover:bg-slate-500">Descargar</button>
                    </div>
                </div>
            </div>

            <div className="relative flex-shrink-0 max-w-xs m-6 overflow-hidden rounded-lg shadow-md bg-clip-border bg-slate-200 ">
                <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: '0.1' }}>
                </svg>
                <div className="relative flex items-center justify-center px-10 pt-10">
                    <div className="absolute bottom-0 left-0 block w-48 h-48 ml-3 -mb-24"></div>
                    <img className="relative w-40" src="https://insecoin.com.mx/img/webInsci/nomina/reportes.png" alt="" />
                </div>
                <div className="relative px-6 pb-6 mt-6 text-black">
                    <span className="block -mb-1 opacity-75">Reporte de</span>
                    <div className="flex justify-between">
                        <span className="block text-xl font-semibold">Historial Citas del Usuario</span>
                        <button className="flex items-center block px-3 py-2 text-xs font-bold leading-none text-black bg-white rounded-full hover:bg-slate-500">Descargar</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reports;
