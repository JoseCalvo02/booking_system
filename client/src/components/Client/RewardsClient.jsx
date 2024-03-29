import { decodeToken } from '../../../utils/tokenUtils';
import React, { useState, useEffect } from 'react';
import RedeemedModal from '../Modals/RedeemedModal';
import { CgProfile } from 'react-icons/cg';

function RewardsClient() {

    const [userData, setUserData] = useState({
        nombre: '',
        email: '',
        puntosAcumulados: 0,
        puntosCanjeados: 0
    });

    const loadUserData = () => {
        // Decodificar el token JWT y establecer los datos en el estado local
        const decodedToken = decodeToken(); // Decodificar el token JWT
        setUserData({
            nombre: decodedToken.name,
            email: decodedToken.email,
            puntosAcumulados: decodedToken.userPoints.puntosAcumulados,
            puntosCanjeados: decodedToken.userPoints.puntosCanjeados
        }); // Establecer los datos del usuario en el estado local
    };

    const handleRedeem = async () => {
        await RedeemedModal();
    }

    useEffect(() => {
        loadUserData();
    }
    , []);
    
    return (
        <section className="flex flex-col w-full min-h-screen py-8 m-auto md:w-3/4 md:flex-row md:py-0 md:space-x-8">
            <div className="w-full md:w-1/2">
                <table className="w-full m-10 mt-8 overflow-hidden text-sm text-left text-black bg-gray-100 rounded-lg shadow-md md:mt-36">
                    <caption className="mb-4 text-xl font-bold text-center">Puntos del Usuario</caption>
                    <thead className="text-xs uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre Usuario
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Puntos Acumulados 
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Puntos Canjeados 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-black border">
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                <CgProfile className="mr-1" size={20} />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{userData.nombre}</div>
                                    <div className="font-normal text-gray-500">{userData.email}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> {userData.puntosAcumulados}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> {userData.puntosCanjeados}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full md:w-1/2">
                <table className="w-full m-10 mt-8 overflow-hidden text-sm text-left text-black bg-gray-100 rounded-lg shadow-md md:mt-36">
                    <caption className="mb-4 text-xl font-bold text-center">Cupones Disponibles</caption>
                    <thead className="text-xs uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre Cupon
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Puntos Requeridos
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Accion
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='px-6 py-4'>25% Descuento</td>
                            <td className='px-6 py-4'>1500 Puntos</td>
                            <td className='px-6 py-4'>
                                <button onClick={handleRedeem } className='p-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500'>Canjear</button>
                            </td>
                        </tr>

                        <tr>
                            <td className='px-6 py-4'>50% Descuento</td>
                            <td className='px-6 py-4'>3000 Puntos</td>
                            <td className='px-6 py-4'>
                                <button onClick={handleRedeem } className='p-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500'>Canjear</button>
                            </td>
                        </tr>

                        <tr>
                            <td className='px-6 py-4'>100% Descuento</td>
                            <td className='px-6 py-4'>5000 Puntos</td>
                            <td className='px-6 py-4'>
                                <button onClick={handleRedeem } className='p-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500'>Canjear</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default RewardsClient;

