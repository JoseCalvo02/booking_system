import React, { useEffect, useState } from 'react';
import customStyles from '../../custom/customStyles';
import { getCoupons, getRedeemedCoupons } from '../../../api/couponApi';

const Redemptions = () => {
    const [coupons, setCoupons] = useState([]); // Array of cards for coupons
    const [redeCoupons, setRedeCoupon] = useState([]); // Array of redeemed coupons
    const [displayContent, setDisplayContent] = useState('existing');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coupons, redeCoupons] = await Promise.all([getCoupons(), getRedeemedCoupons()]);
                setCoupons(coupons);
                setRedeCoupon(redeCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error.message);
            }
        }

        fetchData();
    }, []);

    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            <header className='m-auto mb-4'>
                <h1 className='p-1 text-lg font-semibold text-center md:text-xl lg:text-2xl'>Cupones</h1>

                {/* Buttons to switch between content */}
                <div className="flex justify-center my-4 text-white text-md lg:text-lg">
                    <button className="p-2 mr-2 rounded-md bg-primary hover:bg-primary_h" onClick={() => setDisplayContent('existing')}>Ver Cupones</button>
                    <button className="p-2 rounded-md bg-primary hover:bg-primary_h" onClick={() => setDisplayContent('new')}>Cupones canjeados</button>
                </div>
            </header>

            { /* Sections to display information depending on the option */}
            {displayContent === 'existing' ? (
                /* Section for adding coupons */
                <section>
                    <button className='p-2 mb-4 bg-green-400 rounded text-md hover:bg-green-500 lg:text-lg'>Agregar +</button>

                    {/* Section for Coupons */}
                    <div className='flex flex-col flex-wrap justify-between md:flex-row lg:gap-3'>
                        { coupons.map((coupon, i) => (
                            <div key={i} className='w-full md:w-[48%] lg:w-[31%] h-64 p-8 bg-bgWhite rounded-xl mb-4 shadow-custom hover:shadow-none text-center content-center'>
                                <h3 className='text-xl font-semibold'>{coupon.nombreCupon}</h3>
                                <p className='max-w-full'>Costo puntos: {coupon.valorPuntos}</p>
                                <p>Estado: {coupon.estado}</p>
                                <div className='mt-4 space-x-2'>
                                    <button className='p-2 bg-blue-400 rounded-md hover:bg-blue-500' onClick={() => openEditModal(coupon/*, updateService*/)}>Editar</button>
                                    <button className='p-2 bg-red-400 rounded-md hover:bg-red-500'>Desactivar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                /* Section for redeemed coupons */
                <section className='overflow-y-auto max-h-[75vh]'>
                    <table className='w-full '>
                        <thead className='sticky top-0 z-10 text-white bg-gray-900'>
                            {/* Table Header */}
                            <tr className=''>
                                <th className={customStyles.th}>ID</th>
                                <th className={customStyles.th}>Cupon</th>
                                <th className={customStyles.th}>Usuario</th>
                                <th className={customStyles.th}>Fecha</th>
                                <th className={customStyles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-y-auto'>
                            {/* Map over clients and render each client as a table row */}
                            {redeCoupons.map((redeCoupon) => (
                                <tr key={client.usuarioID} className='hover:bg-gray-100'>
                                    <td className={customStyles.td}>{redeCoupon.cuponCanjeadoID}</td>
                                    <td className={customStyles.td}>{redeCoupon.cuponID}</td>
                                    <td className={customStyles.td}>{redeCoupon.clienteID}</td>
                                    <td className={customStyles.td}>{redeCoupon.fecha}</td>
                                    <td className={customStyles.td}>
                                        <button className='p-2 mr-2 text-white bg-green-400 rounded-lg hover:bg-green-500'>Edit</button>
                                        <button className='p-2 text-white bg-red-400 rounded-lg hover:bg-red-500'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}

        </div>
    );
}

export default Redemptions;
