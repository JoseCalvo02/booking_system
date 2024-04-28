import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
// Functions | API | Hooks | Components
import { getUserStats } from '../../../api/userApi';
import { getCouponsStats } from '../../../api/couponApi';
import DashboardTable from '../Tables/DashboardTable';
import DashboardCards from '../Cards/DashboardCards';
// Styles & icons
import customStyles from '../../custom/customStyles';
import { TbUsers, TbTicket } from "react-icons/tb";

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
                    <h1>Módulo de Citas | Citas del mes</h1>
                </header>
                {/* Cards with insights */}
                <DashboardCards />

                {/* Table with citas and schedule module*/}
                <DashboardTable />
            </main>

            {/* Right Panel */}
            <section className='w-1/4 p-8 bg-white shadow-custom rounded-xl'>
                <div className={customStyles.rTitle}>
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

                <div className={customStyles.rTitle}>
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

