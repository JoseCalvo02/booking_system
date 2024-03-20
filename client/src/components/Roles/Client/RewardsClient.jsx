import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';

function RewardsClient() {

const [userData, setUserData] = useState({
    nombre: '',
    puntosAcumulados: 0,
    puntosCanjeados: 0
});

useEffect(() => {
    // Obtiene el token de acceso del almacenamiento local
    const token = localStorage.getItem('token');
    // Decodifica el token para obtener la información del usuario
    const decodedToken = jwtDecode(token);
    // Establece el estado local con la información del usuario
    setUserData({
        nombre: decodedToken.name,
        puntosAcumulados: decodedToken.puntosAcumulados,
        puntosCanjeados: decodedToken.puntosCanjeados
    });
}
, []);

    return (
        <section className="flex flex-grow w-full h-screen py-8 shadow-custom rounded-xl">
            <div className="w-1/2 h-screen mt-28">
                <div className="p-4 rounded-lg md:p-8">
                    <div className="max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-black sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
                        <h1 className="mb-4 text-3xl font-bold text-center">Perfil de Usuario</h1>
                        <hr className="mb-4"></hr>
                        <table className="w-full mb-4 text-left table-fixed">
                            <tbody>
                                <tr>
                                    <td className="w-1/3 px-4 py-2 font-medium">Usuario:</td>
                                    <td className="w-2/3 px-4 py-2 font-bold">{userData.nombre}</td>
                                </tr>
                                <tr>
                                    <td className="w-1/3 px-4 py-2 font-medium">Puntos Acumulados:</td>
                                    <td className="w-2/3 px-4 py-2 font-bold">{userData.puntosAcumulados}</td>
                                </tr>
                                <tr>
                                    <td className="w-1/3 px-4 py-2 font-medium">Puntos Canjeados:</td>
                                    <td className="w-2/3 px-4 py-2 font-bold">{userData.puntosCanjeados}</td>
                                </tr><br></br>
                            </tbody>
                        </table>
                        <hr className="mt-4"></hr>
                    </div>
                </div>
            </div>

            <div className="w-1/2 h-screen mt-28">
            <div className="p-4 rounded-lg md:p-8">
                    <div className="max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-black sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
                        <h1 className="mb-4 text-3xl font-bold text-center">Recompensas Disponibles</h1>
                        <hr className="mb-4"></hr>
                        <table className="w-full mb-4 text-left table-fixed">
                            <tbody>
                                <tr>
                                    <td className="w-1/3 px-4 py-2 font-medium">25% Descuento</td>
                                    <td className="w-2/3 px-4 py-2 font-bold">5,000 Puntos</td>
                                    <td className="w-2/3 px-4 py-2 font-bold">
                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Canjear
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                        </svg>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-1/3 px-4 py-2 font-medium">50% Descuento</td>
                                    <td className="w-2/3 px-4 py-2 font-bold">10,000 puntos</td>
                                    <td className="w-2/3 px-4 py-2 font-bold">
                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Canjear
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                        </svg>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-1/3 px-4 py-2 font-medium">100% Descuento</td>
                                    <td className="w-2/3 px-4 py-2 font-bold">15,000 Puntos</td>
                                    <td className="w-2/3 px-4 py-2 font-bold">
                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Canjear
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                        </svg>
                                        </a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <hr className="mt-4"></hr>
                    </div>
                </div>
            </div>       
        </section>
    );
}

export default RewardsClient;