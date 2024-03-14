import React from 'react';
import Manicure from '../../../assets/Manicure.jpg';

function RewardsClient() {
    return (
        

<div class="relative overflow-x-auto shadow-md sm:rounded-lg m-8">
    <h1 className="m-auto text-4xl font-extrabold leading-none tracking-tight text-gray-900 align-middle md:text-5xl lg:text-6xl dark:text-black mt-28">
        Recompensas Ganadas
    </h1>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
        <thead class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-900 dark:text-white">
            <tr>
                <th scope="col" class="px-6 py-3">
                     Recompensa
                </th>
                <th scope="col" class="px-6 py-3">
                    Fecha
                </th>
                <th scope="col" class="px-6 py-3">
                    Puntos Ganados
                </th>
                <th scope="col" class="px-6 py-3">
                    Accion
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-orange-300">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                    Recompensa 1
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                    18/05/2023
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                    75
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Canjear</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

    );
}

export default RewardsClient;