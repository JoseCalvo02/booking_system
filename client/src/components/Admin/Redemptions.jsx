import React, { useEffect, useState } from 'react';
// Funciones y estilos
import customStyles from '../../custom/customStyles';
import { getCoupons, getRedeemedCoupons } from '../../../api/couponApi';
import useInputActive from '../../hooks/useInputActive';
import { format } from 'date-fns';

import { TbUserSearch, TbFilterX  } from "react-icons/tb";

const Redemptions = () => {
    const [coupons, setCoupons] = useState([]); // Array of cards for coupons
    const [redeCoupons, setRedeCoupon] = useState([]); // Array of redeemed coupons
    const [displayContent, setDisplayContent] = useState('existing');

    // Filters for the table
    const [filter, setFilter] = useState(''); // Filter for redeemed coupons
    const { inputActive, handleInputFocus, handleInputBlur } = useInputActive(); // Custom hook to handle input focus

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

    // Función para manejar el cambio de filtro
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    // Filtrar los cupones según el estado seleccionado
    const filteredCoupons = redeCoupons.filter((coupon) => {
        // Si no hay filtro seleccionado, mostrar todos los cupones
        if (!filter) return true;
        // Filtrar por el estado seleccionado
        return coupon.estado === filter;
    });

    // Función para formatear la fecha en "dd/mm/yyyy"
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };

    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            <header className='m-auto mb-4'>
                <h1 className='p-1 text-lg font-semibold text-center md:text-xl lg:text-2xl'>Cupones</h1>

                {/* Buttons to switch between content */}
                <div className="flex justify-center my-4 text-xs text-white md:text-base lg:text-lg">
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
                    {/* Filter and search bar */}
                    <div className='flex flex-col gap-4 p-1 mb-4 lg:flex-row'>
                        <div className="flex space-x-4 text-xs md:text-base lg:text-lg">
                            <button onClick={() => handleFilterChange('Pendiente')} className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Pendiente</button>
                            <button onClick={() => handleFilterChange('Canjeado')} className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600">Canjeado</button>
                        </div>
                        <div className="relative flex items-center justify-center flex-grow sm:text-sm md:text-md lg:text-lg">
                            <input
                                type="text"
                                placeholder="Buscar estilista"
                                onFocus={handleInputFocus} onBlur={handleInputBlur}
                                className="w-full py-2 pl-10 pr-4 border border-black rounded-md border-opacity-5 shadow-custom focus:outline-none focus:ring focus:ring-blue-500 "
                            />
                            <TbUserSearch className={`absolute inset-y-0 left-0 m-3 ${inputActive ? 'text-primary' : 'text-gray-400'}`} size={20}/>
                            <button className="absolute inset-y-0 right-0 flex items-center justify-center m-3 text-gray-400 hover:text-primary">
                                Buscar
                            </button>
                        </div>
                        <button className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600" onClick={() => handleFilterChange('')}>
                            <TbFilterX  size={20}/>
                        </button>
                    </div>

                    {/* Table */}
                    <table className='w-full '>
                        <thead className='sticky top-0 z-10 text-white bg-gray-900'>
                            {/* Table Header */}
                            <tr className=''>
                                <th className={customStyles.th}>ID</th>
                                <th className={customStyles.th}>Cupon</th>
                                <th className={customStyles.th}>Usuario</th>
                                <th className={customStyles.th}>Coste de cupon</th>
                                <th className={customStyles.th}>Fecha</th>
                                <th className={customStyles.th}>Estado</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-y-auto'>
                            {/* Map over clients and render each client as a table row */}
                            {filteredCoupons.map((redeCoupon) => (
                                <tr key={redeCoupon.cuponCanjeadoID} className='hover:bg-gray-100'>
                                    <td className={customStyles.td}>{redeCoupon.cuponCanjeadoID}</td>
                                    <td className={customStyles.td}>{redeCoupon.Cupones.nombreCupon}</td>
                                    <td className={customStyles.td}>{redeCoupon.Usuarios.nombre} {redeCoupon.Usuarios.apellidos}</td>
                                    <td className={customStyles.td}>{redeCoupon.Cupones.valorPuntos}</td>
                                    <td className={customStyles.td}>{formatDate(redeCoupon.fecha)}</td>
                                    <td className={customStyles.td}>{redeCoupon.estado}</td>
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
