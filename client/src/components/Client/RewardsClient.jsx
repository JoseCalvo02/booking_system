import { decodeToken } from '../../utils/tokenUtils';
import React, { useState, useEffect, useImperativeHandle } from 'react';
import RedeemedModal from '../Modals/Coupons/RedeemedModal';
import { CgProfile } from 'react-icons/cg';
import { getCoupons } from '../../../api/couponApi';
import { getRedeemedCoupons } from '../../../api/couponApi';

function RewardsClient() {

    const [userData, setUserData] = useState({
        userId: '',
        nombre: '',
        email: '',
        puntosAcumulados: 0,
        puntosCanjeados: 0
    }); // Estado local para almacenar los datos del usuario

    // Estado para almacenar los datos de los cupones de la base de datos
    const [cupones, setCupones] = useState([]);

    // Estado para almacenar los datos de los cupones canjeados por el usuario
    const [cuponesCanjeados, setCuponesCanjeados] = useState([]);

    // Función para cargar los datos de los cupones de la base de datos en el estado local
    const loadCoupons = async () => {
        try {
            const coupons = await getCoupons(); // Obtener los cupones de la base de datos
            setCupones(coupons); // Establecer los cupones en el estado local
        } catch (error) {
            console.error('Error al obtener los cupones:', error.message);
        }
    };

    const loadUserData = () => {
        // Decodificar el token JWT y establecer los datos en el estado local
        const decodedToken = decodeToken(); // Decodificar el token JWT
        setUserData({
            userId: decodedToken.userId,
            nombre: decodedToken.name,
            email: decodedToken.email,
            puntosAcumulados: decodedToken.userPoints.puntosAcumulados,
            puntosCanjeados: decodedToken.userPoints.puntosCanjeados
        }); // Establecer los datos del usuario en el estado local
    };

    const loadRedeemedCoupons = async () => {
        try {
            const redeemedCoupons = await getRedeemedCoupons(); // Obtener los cupones canjeados de la base de datos
            const pendientesCoupons = redeemedCoupons.filter(coupon => coupon.estado === "Pendiente"); // Filtrar los cupones con estado "Pendientes"
            setCuponesCanjeados(pendientesCoupons); // Establecer los cupones pendientes en el estado local
        } catch (error) {
            console.error('Error al obtener los cupones canjeados:', error.message);
        }
    };

    useEffect(() => {
        loadUserData();
        loadCoupons();
        loadRedeemedCoupons();
    }
    , []); // Cargar los datos del usuario y los cupones al cargar el componente

    const handleRedeem = async (cuponId) => {
        // Realizar la acción de canje aquí
        await RedeemedModal(cuponId);
    };

    return (
        <section className="flex flex-col w-full py-8 m-auto md:w-3/4 md:flex-row md:py-0 md:space-x-8 h-4/5">
            <div className="w-full md:w-1/2">
                <table className="w-full m-10 mt-8 overflow-hidden text-sm text-left text-black bg-gray-100 rounded-lg shadow-md md:mt-36">
                    <caption className="mb-4 text-xl font-bold text-center">Puntos del Usuario</caption>
                    <thead className="text-xs uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-sm">
                                Nombre Usuario
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm">
                                Puntos Acumulados
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm">
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

                <table className="w-full m-10 mt-8 overflow-hidden text-sm text-left text-black bg-gray-100 rounded-lg shadow-md">
                    <caption className="mb-2 text-xl font-bold text-center">Cupones para Utilizar</caption>
                    <thead className="text-xs uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-sm">
                                Nombre Cupon
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm">
                                Fecha Canje
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm">
                                Valor Puntos
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cuponesCanjeados.map((cupon) => (
                            <tr key={cupon.cuponCanjeadoID} className="text-black border">
                                <td className="px-6 py-4">
                                    <div className="text-base">{cupon.Cupones.nombreCupon}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-base">{new Date(cupon.fecha).toISOString().split('T')[0]}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-base">{cupon.Cupones.valorPuntos}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`text-base`}>{cupon.estado}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full md:w-1/2">
                <table className="w-full m-10 mt-8 overflow-hidden text-sm text-left text-black bg-gray-100 rounded-lg shadow-md md:mt-36">
                    <caption className="mb-4 text-xl font-bold text-center">Cupones Disponibles</caption>
                    <thead className="text-xs uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-sm">
                                Nombre Cupon
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm">
                                Puntos Requeridos
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm">
                                Accion
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cupones.map((cupon) => (
                            <tr key={cupon.cuponID} className="text-black border">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-base">{cupon.nombreCupon}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`flex items-center`}>
                                        <div className={`h-2.5 w-2.5 rounded-full ${cupon.valorPuntos <= userData.puntosAcumulados ? 'bg-green-500' : 'bg-red-500'} me-2`}></div>
                                        {cupon.valorPuntos}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => handleRedeem(cupon.cuponID)} className={`px-4 py-2 text-sm text-white rounded-md ${cupon.valorPuntos <= userData.puntosAcumulados ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'} font-semibold`} disabled={cupon.valorPuntos > userData.puntosAcumulados}>Canjear</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default RewardsClient;
