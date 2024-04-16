// Libraries
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import BarLoader from "react-spinners/BarLoader";
// Fuctions / Hooks / API / Modals
import { getCoupons, getRedeemedCoupons } from '../../../api/couponApi';
import useInputActive from '../../hooks/useInputActive';
import { CreateCouponModal } from '../Modals/Coupons/CreateCouponModal';
import ChangeStatusModal from '../Modals/Coupons/ChangeStatusModal';
// Styles & Icons
import customStyles from '../../custom/customStyles';
import { TbUserSearch, TbFilterX  } from "react-icons/tb";

const Redemptions = () => {
    const [coupons, setCoupons] = useState([]); // Array of cards for coupons
    const [redeCoupons, setRedeCoupon] = useState([]); // Array of redeemed coupons
    const [displayContent, setDisplayContent] = useState('redeemedCoupons');
    const [loading, setLoading] = useState(true); // Handle loading state
    // Filters for the table
    const [filter, setFilter] = useState(''); // Filter for redeemed coupons
    const [searchTerm, setSearchTerm] = useState(''); // Search term for redeemed coupons
    const { inputActive, handleInputFocus, handleInputBlur } = useInputActive(); // Custom hook to handle input focus

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coupons, redeCoupons] = await Promise.all([getCoupons(), getRedeemedCoupons()]);
                // Ordenar los cupones por estado activo o inactivo
                coupons.sort((a) => a.estado === 'Activo' ? -1 : 1);
                setCoupons(coupons);
                setRedeCoupon(redeCoupons);
                setLoading(false);
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrar los cupones según el estado seleccionado y el término de búsqueda
    const filteredCoupons = redeCoupons.filter((coupon) => {
        // Filtrar por el estado seleccionado
        if (filter && coupon.estado !== filter) return false;
        // Filtrar por el término de búsqueda
        if (searchTerm) {
            const searchRegex = new RegExp(searchTerm, 'i');
            return (
                searchRegex.test(coupon.cuponCanjeadoID.toString()) ||
                searchRegex.test(coupon.Cupones.nombreCupon) ||
                searchRegex.test(coupon.Usuarios.nombre) ||
                searchRegex.test(coupon.Usuarios.apellidos) ||
                searchRegex.test(`${coupon.Usuarios.nombre} ${coupon.Usuarios.apellidos}`)
            );
        }
        return true;
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
                <div className="flex justify-center gap-2 my-4 text-xs text-white md:text-base lg:text-lg">
                    <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-900" onClick={() => setDisplayContent('redeemedCoupons')}>Canjeados</button>
                    <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-900" onClick={() => setDisplayContent('coupons')}>Ver Cupones</button>
                </div>
            </header>

            { /* Sections to display information depending on the option */}
            {displayContent === 'coupons' ? (
                /* Section for adding coupons */
                <section>
                    <button className='p-2 mb-4 text-white bg-green-500 rounded text-md hover:bg-green-600 lg:text-lg' onClick={() => CreateCouponModal()}>Agregar +</button>

                    {/* Section for Coupons */}
                    <div className='grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3'>
                        { coupons.map((coupon, i) => (
                            <div key={i} className='content-center h-64 p-8 mb-4 text-center bg-white border border-gray-300 rounded-xl shadow-custom hover:shadow-none'>
                                <h3 className='text-lg font-semibold lg:text-xl'>{coupon.nombreCupon}</h3>
                                <p className='max-w-full'>Costo puntos: {coupon.valorPuntos}</p>
                                <p>Estado: {coupon.estado}</p>
                                <div className='mt-4 space-x-2 text-white'>
                                    <button className='p-2 bg-blue-500 rounded-md w-28 hover:bg-blue-600' onClick={() => EditCouponModal(coupon/*, updateService*/)}>Editar</button>
                                    <button className={`w-28 p-2 rounded-md ${coupon.estado === 'Activo' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`} onClick={() => ChangeStatusModal(coupon)}>{coupon.estado === 'Activo' ? 'Desactivar' : 'Activar'}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                /* Section for redeemed coupons */
                <section>
                    {/* Filter and search bar */}
                    <div className='flex flex-col gap-4 p-1 mb-4 lg:flex-row max'>
                        <div className="relative flex items-center justify-center flex-grow text-sm md:text-base lg:text-lg">
                            <input
                                type="text"
                                placeholder="Buscar ID, usuario o cupón..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onFocus={handleInputFocus} onBlur={handleInputBlur}
                                className="w-full py-2 pl-10 pr-4 border border-black rounded-md border-opacity-5 shadow-custom focus:outline-none focus:ring focus:ring-blue-500 "
                            />
                            <TbUserSearch className={`absolute inset-y-0 left-0 m-3 ${inputActive ? 'text-primary' : 'text-gray-400'}`} size={20}/>
                            <button className="absolute inset-y-0 right-0 flex items-center justify-center m-3 text-gray-400 hover:text-primary" onClick={() => setSearchTerm('')}>
                                <TbFilterX size={20}/>
                            </button>
                        </div>
                        <div className="flex space-x-4 text-xs md:text-base lg:text-lg">
                            <button onClick={() => handleFilterChange('Pendiente')} className="p-2 text-white bg-green-500 rounded-lg hover:bg-green-600">Pendiente</button>
                            <button onClick={() => handleFilterChange('Canjeado')} className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Canjeado</button>
                            <button className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600" onClick={() => handleFilterChange('')}>
                                <TbFilterX  size={20}/>
                            </button>
                        </div>
                    </div>

                    <div className='overflow-y-auto max-h-[58vh]'>
                        {/* Table */}
                        <table className='w-full '>
                            <thead className={customStyles.thead}>
                                {/* Table Header */}
                                <tr>
                                    <th className={twMerge(customStyles.th, 'max-w-10')}>ID Canje</th>
                                    <th className={customStyles.th}>Usuario</th>
                                    <th className={customStyles.th}>Cupón</th>
                                    <th className={twMerge(customStyles.th, 'max-w-20')}>Coste de cupón</th>
                                    <th className={customStyles.th}>Fecha</th>
                                    <th className={customStyles.th}>Estado</th>
                                </tr>
                            </thead>
                            <tbody className='overflow-y-auto'>
                                {/* Map over clients and render each client as a table row */}
                                {filteredCoupons.map((redeCoupon) => (
                                    <tr key={redeCoupon.cuponCanjeadoID} className='hover:bg-gray-100'>
                                        <td className={customStyles.td}>{redeCoupon.cuponCanjeadoID}</td>
                                        <td className={customStyles.td}>{redeCoupon.Usuarios.nombre} {redeCoupon.Usuarios.apellidos}</td>
                                        <td className={customStyles.td}>{redeCoupon.Cupones.nombreCupon}</td>
                                        <td className={customStyles.td}>{redeCoupon.Cupones.valorPuntos}</td>
                                        <td className={customStyles.td}>{formatDate(redeCoupon.fecha)}</td>
                                        <td className={customStyles.td}>{redeCoupon.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Loader */}
                        {loading && (
                        <div className="flex items-center justify-center mt-8">
                            <BarLoader color="#111827" width={200} height={10} />
                        </div>
                        )}
                    </div>
                </section>
            )}

        </div>
    );
}

export default Redemptions;
