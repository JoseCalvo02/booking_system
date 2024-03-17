import React from 'react';
import Manicure from '../../../assets/Manicure.jpg';

function RewardsClient() {
    return (
        <div className="relative h-screen overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="m-auto text-4xl font-extrabold leading-none tracking-tight text-gray-900 align-middle md:text-5xl lg:text-6xl dark:text-black mt-28">
                Recompensas Ganadas
            </h1>
            <table className="w-full mt-5 text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-900 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Recompensa
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Puntos Ganados
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Accion
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-orange-300">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                            Recompensa 1
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                            18/05/2023
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                            75
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Canjear</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}

export default RewardsClient;