import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
// Functions | API
import { getUserStats } from '../../../api/userApi';
import { getCouponsStats } from '../../../api/couponApi';
// Styles & icons
import customStyles from '../../custom/customStyles';
import { TbCalendarCheck , TbCalendarX , TbCalendarTime  , TbUsers, TbTicket  } from "react-icons/tb";

const Dashboard = () => {
    const [userStats, setUserStats] = useState([]);
    const [couponsStats, setCouponsStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [userStats, couponsStats] = await Promise.all([
                getUserStats(),
                getCouponsStats()
            ]);

            setUserStats(userStats);
            setCouponsStats(couponsStats);
        }

        fetchData();
    }, []);

    return (
        <>
            <main className='w-3/4 p-8 bg-white shadow-custom rounded-xl'>
                {/* Module*/}
                <header className='mb-4 text-xl font-bold'>
                    <h1>Módulo de Citas</h1>
                </header>

                <section className='flex flex-col gap-4 mb-4 md:flex-row'>
                    { /* Card #1 */}
                    <div className={customStyles.insights}>
                        <TbCalendarX  size={50} className={twMerge(customStyles.dashICon, 'bg-red-400')}/>
                        <div className='flex flex-row items-center justify-between'>
                            <div>
                                <h3>Cantidad (15)</h3>
                                <h1 className='text-xl font-bold'>Realizadas</h1>
                            </div>
                            <div className='relative w-24 h-24 rounded-full'>
                                <svg className='w-24 h-24'>
                                    <circle className={customStyles.circle} cx='38' cy='38' r='36'></circle>
                                </svg>
                                <div className={customStyles.dashParag}>
                                    <p>50%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={customStyles.insights}>
                        <TbCalendarTime  size={50} className={twMerge(customStyles.dashICon, 'bg-yellow-400')}/>
                        <div className='flex flex-row items-center justify-between'>
                            <div>
                                <h3>Cantidad (10)</h3>
                                <h1 className='text-xl font-bold'>Pendientes(Hoy)</h1>
                            </div>
                            <div className='relative w-24 h-24 rounded-full'>
                                <svg className='w-24 h-24'>
                                    <circle className={customStyles.circle} cx='38' cy='38' r='36'></circle>
                                </svg>
                                <div className={customStyles.dashParag}>
                                    <p>30%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={customStyles.insights}>
                        <TbCalendarCheck  size={50} className={twMerge(customStyles.dashICon, 'bg-green-400')}/>
                        <div className='flex flex-row items-center justify-between'>
                            <div>
                                <h3>Cantidad (8)</h3>
                                <h1 className='text-xl font-bold'>Programadas</h1>
                            </div>
                            <div className='relative w-24 h-24 rounded-full'>
                                <svg className='w-24 h-24'>
                                    <circle className={customStyles.circle} cx='38' cy='38' r='36'></circle>
                                </svg>
                                <div className={customStyles.dashParag}>
                                    <p>20%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Schedules and appoitments tables */}
                <header className='mb-4 text-xl font-bold'>
                    <h1>Módulo de Citas</h1>
                </header>

                <section className='flex flex-col gap-4'>
                </section>
            </main>

            {/* Right Panel */}
            <section className='w-1/4 p-8 bg-white shadow-custom rounded-xl'>
                <div className='flex items-center gap-2 mb-4'>
                    <TbUsers size={25} />
                    <h1 className='text-lg font-semibold'>Módulo de Clientes </h1>
                </div>

                <div className='flex flex-col gap-4 mb-4'>
                    <div className={twMerge(customStyles.rCard, 'border-l-blue-400')}>
                        <p>Total de clientes: {userStats.totalUsers}</p>
                    </div>
                    <div className={twMerge(customStyles.rCard, 'border-l-red-400')}>
                        <p>Clientes Inactivos: {userStats.inactiveUsers}</p>
                    </div>
                    <div className={twMerge(customStyles.rCard, 'border-l-green-400')}>
                        <p>Clientes activos: {userStats.activeUsers}</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 mb-4'>
                    <TbTicket size={25} />
                    <h1 className='text-lg font-semibold'>Módulo de Cupones </h1>
                </div>

                <div className='flex flex-col gap-4'>
                    <div className={twMerge(customStyles.rCard, 'border-l-blue-400')}>
                        <p>Total Cupones: {couponsStats.totalCoupons}</p>
                    </div>
                    <div className={twMerge(customStyles.rCard, 'border-l-red-400')}>
                        <p>Cupones canjeados: {couponsStats.redeemedCoupons}</p>
                    </div>
                    <div className={twMerge(customStyles.rCard, 'border-l-yellow-400')}>
                        <p>Cupones pendientes: {couponsStats.pendingCoupons}</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Dashboard;

