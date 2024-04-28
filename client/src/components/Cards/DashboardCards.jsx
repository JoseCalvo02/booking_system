import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
// Functions | API | Hooks | Components
import { getApptsStats } from '../../../api/apptApi';
// Styles & icons
import customStyles from '../../custom/customStyles';
import { TbCalendarCheck , TbCalendarX , TbCalendarTime } from "react-icons/tb";

const DashboardCards = () => {
    const [apptStats, setApptStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date();
            const apptStats = await getApptsStats(date.getMonth() + 1, date.getFullYear());

            setApptStats(apptStats);
        }

        fetchData();
    }, []);

    // Definir los valores de cantidad específicos para cada card
    const cantidadRealizadas = 4;
    const cantidadPendientes = 10;
    const cantidadProgramadas = 6;

    // Calcular el total de cantidad
    const totalCantidad = cantidadRealizadas + cantidadPendientes + cantidadProgramadas;

    // Calcular el porcentaje para cada cantidad
    const porcentajeRealizadas = (cantidadRealizadas / totalCantidad) * 100;
    const porcentajePendientes = (cantidadPendientes / totalCantidad) * 100;
    const porcentajeProgramadas = (cantidadProgramadas / totalCantidad) * 100;

    // Calcular los valores de strokeDashoffset y strokeDasharray
    const strokeDashoffsetRealizadas = 226 - (226 * porcentajeRealizadas) / 100;
    const strokeDasharrayRealizadas = 226;

    const strokeDashoffsetPendientes = 226 - (226 * porcentajePendientes) / 100;
    const strokeDasharrayPendientes = 226;

    const strokeDashoffsetProgramadas = 226 - (226 * porcentajeProgramadas) / 100;
    const strokeDasharrayProgramadas = 226;

    return (
        <section className='flex flex-col gap-4 mb-4 md:flex-row'>
            { /* Card #1 */}
            <div className={customStyles.insights}>
                <TbCalendarX  size={50} className={twMerge(customStyles.dashICon, 'bg-red-400')}/>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <h3>Cantidad ({cantidadRealizadas})</h3>
                        <h1 className='text-xl font-bold'>Realizadas</h1>
                    </div>
                    <div className='relative w-24 h-24 rounded-full'>
                        <svg className='w-24 h-24'>
                            <circle className={twMerge(customStyles.circle, 'stroke-gray-200')} cx='38' cy='38' r='36'></circle>
                            <circle className={twMerge(customStyles.circle, 'stroke-red-400')}
                                cx='38' cy='38' r='36'
                                style={{
                                    strokeDashoffset: strokeDashoffsetRealizadas,
                                    strokeDasharray: strokeDasharrayRealizadas,
                                }}
                            ></circle>
                        </svg>
                        <div className={customStyles.dashParag}>
                            <p>{porcentajeRealizadas.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={customStyles.insights}>
                <TbCalendarTime  size={50} className={twMerge(customStyles.dashICon, 'bg-yellow-400')}/>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <h3>Cantidad ({cantidadPendientes})</h3>
                        <h1 className='text-xl font-bold'>Citas del Día</h1>
                    </div>
                    <div className='relative w-24 h-24 rounded-full'>
                        <svg className='w-24 h-24'>
                            <circle className={twMerge(customStyles.circle, 'stroke-gray-200')} cx='38' cy='38' r='36'></circle>
                            <circle className={twMerge(customStyles.circle, 'stroke-yellow-400')}
                                cx='38' cy='38' r='36'
                                style={{
                                    strokeDashoffset: strokeDashoffsetPendientes,
                                    strokeDasharray: strokeDasharrayPendientes
                                }}
                            ></circle>
                        </svg>
                        <div className={customStyles.dashParag}>
                            <p>{porcentajePendientes.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={customStyles.insights}>
                <TbCalendarCheck  size={50} className={twMerge(customStyles.dashICon, 'bg-green-400')}/>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <h3>Cantidad ({cantidadProgramadas})</h3>
                        <h1 className='text-xl font-bold'>Programadas</h1>
                    </div>
                    <div className='relative w-24 h-24 rounded-full'>
                        <svg className='w-24 h-24'>
                            <circle className={twMerge(customStyles.circle, 'stroke-gray-200')} cx='38' cy='38' r='36'></circle>
                            <circle className={twMerge(customStyles.circle, 'stroke-green-400')}
                                cx='38' cy='38' r='36'
                                style={{
                                    strokeDashoffset: strokeDashoffsetProgramadas,
                                    strokeDasharray: strokeDasharrayProgramadas
                                }}
                            ></circle>
                        </svg>
                        <div className={customStyles.dashParag}>
                            <p>{porcentajeProgramadas.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashboardCards;