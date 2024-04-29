import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
// Functions | API | Hooks | Components
import { getApptsStats } from '../../../api/apptApi';
import { getCurrentDate } from '../../utils/dateUtils';
// Styles & icons
import customStyles from '../../custom/customStyles';
import { TbCalendarCheck , TbCalendarX , TbCalendarTime } from "react-icons/tb";

const DashboardCards = () => {
    const [apptStats, setApptStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const date = getCurrentDate();
            const apptStats = await getApptsStats(date);

            setApptStats(apptStats);
        }

        fetchData();
    }, []);

    // Definir los valores de cantidad específicos para cada card
    const citasDelMes = apptStats.citasDelMes || 0;
    const cantidadRealizadas = apptStats.citasPasadas || 0;
    const cantidadPendientes = apptStats.citasHoy || 0;
    const cantidadProgramadas = apptStats.citasFuturas || 0;

    // Verificar si no hay citas
    const noHayCitas = citasDelMes === 0;

    // Calcular el porcentaje total
    const totalCantidad = citasDelMes;

    // Calcular el porcentaje para cada cantidad
    const porcentajeRealizadas = noHayCitas ? 100 : (cantidadRealizadas / totalCantidad) * 100;
    const porcentajePendientes = noHayCitas ? 100 : (cantidadPendientes / totalCantidad) * 100;
    const porcentajeProgramadas = noHayCitas ? 100 : (cantidadProgramadas / totalCantidad) * 100;

    // Calcular los valores de strokeDashoffset y strokeDasharray
    const strokeDashoffsetRealizadas = 226 - (226 * porcentajeRealizadas) / 100;
    const strokeDasharrayRealizadas = 226;

    const strokeDashoffsetPendientes = 226 - (226 * porcentajePendientes) / 100;
    const strokeDasharrayPendientes = 226;

    const strokeDashoffsetProgramadas = 226 - (226 * porcentajeProgramadas) / 100;
    const strokeDasharrayProgramadas = 226;

    return (
        <div>
            {/* Module*/}
            <header className='mb-4 text-xl font-bold '>
                <h1>Módulo de Citas | Citas del mes({apptStats.citasDelMes})</h1>
            </header>

            <section className='flex flex-col gap-4 mb-4 md:flex-row'>

                { /* Card #1 */}
                <div className={customStyles.insights}>
                    <TbCalendarX  size={50} className={twMerge(customStyles.dashICon, 'bg-red-400')}/>
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <h3>Cantidad ({cantidadRealizadas})</h3>
                            <h1 className='text-xl font-bold'>Citas Pasadas</h1>
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
                            <h1 className='text-xl font-bold'> Citas Futuras</h1>
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
        </div>
    );
}

export default DashboardCards;