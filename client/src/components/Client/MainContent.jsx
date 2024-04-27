import React, { useState, useEffect } from 'react';
import { getServices } from '../../../api/serviceApi';
import { getUsersByType } from '../../../api/userApi';
import { getRedeemedCoupons } from '../../../api/couponApi';
import { getSchedulesByDate } from '../../../api/scheduleApi';

function MainContent() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [stylists, setStylists] = useState([]);
    const [selectedStylist, setSelectedStylist] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const currentDate = new Date().toISOString().split('T')[0];
    const [cuponesCanjeados, setCuponesCanjeados] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [availableStylists, setAvailableStylists] = useState(stylists);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [services, stylists] = await Promise.all([getServices(), getUsersByType('stylists')]);
                setServices(services);
                setStylists(stylists);
            } catch (error) {
                console.error('Error al obtener los datos:', error.message);
            }
        };

        const loadRedeemedCoupons = async () => {
            try {
                const redeemedCoupons = await getRedeemedCoupons();
                const pendientesCoupons = redeemedCoupons.filter(coupon => coupon.estado === "Pendiente");
                setCuponesCanjeados(pendientesCoupons);
            } catch (error) {
                console.error('Error al obtener los cupones canjeados:', error.message);
            }
        };

        loadRedeemedCoupons();
        fetchData();
    }, []);

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleStylistChange = (event) => {
        setSelectedStylist(event.target.value);
    };

    // Manejo del cambio de fecha
    const handleDateChange = async (event) => {
        const selectedDate = event.target.value; // Obtener la fecha seleccionada

        setSelectedDate(selectedDate); // Actualizar el estado de la fecha seleccionada
        try {
            const schedules = await getSchedulesByDate(selectedDate); // Obtener los horarios para la fecha seleccionada
            setSchedules(schedules); // Actualizar el estado de los horarios

            // Obtener los IDs de estilistas con horarios activos para la fecha seleccionada
            const activeStylistIDs = schedules.map(schedule => schedule.estilistaID);

            // Filtrar los estilistas disponibles para la fecha seleccionada
            const availableStylists = stylists.filter((stylist) => {
                return activeStylistIDs.includes(stylist.usuarioID);
            });

            // Actualizar el estado de los estilistas con los disponibles
            if (selectedStylist !== '') {
                setSelectedStylist('');
            }
            setAvailableStylists(availableStylists); // Usar un estado separado para los estilistas disponibles

        } catch (error) {
            console.error('Error al obtener los horarios:', error.message);
        }
    };

    const handleCouponChange = (event) => {
        setSelectedCoupon(event.target.value);
    };

    return (
        <main className="flex flex-col w-full">
            <h1 className="m-auto text-4xl font-extrabold leading-none tracking-tight text-gray-900 align-middle mt-28 md:text-5xl lg:text-6xl dark:text-black">
                Reserve aquí
            </h1>
            <section className="flex flex-wrap justify-center gap-4 m-auto md:gap-8">
                <div className="w-full p-6 rounded-lg md:w-auto">
                    <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-400 rounded-lg shadow-lg md:gap-8 md:ml-6 md:mr-6">
                        <select
                            value={selectedService}
                            onChange={handleServiceChange}
                            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled={selectedService !== ''} defaultValue hidden className="text-gray-900">
                                Seleccionar servicio
                            </option>
                            {services.map((service) => (
                                <option key={service.servicioID} value={service.nombreServicio}>
                                    {service.nombreServicio} | ₡{service.precio} | {service.tiempoEstimado}
                                </option>
                            ))}
                        </select>

                        <input
                            disabled={selectedService === ''}
                            type="date"
                            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min={currentDate}
                            value={selectedDate}
                            onChange={handleDateChange}
                        />

                        <select
                            disabled={selectedDate === ''}
                            value={selectedStylist}
                            onChange={handleStylistChange}
                            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled={selectedStylist !== ''} defaultValue hidden className="text-gray-900">
                                Seleccionar estilista
                            </option>
                            {availableStylists.map((stylist) => (
                                <option key={stylist.usuarioID} value={stylist.nombre}>
                                    {stylist.nombre}
                                </option>
                            ))}
                        </select>


                        <select className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={selectedStylist === ''}
                        >
                            <option value="">Seleccionar hora</option>
                            <option value="">7:00 am</option>
                            <option value="">8:00 am</option>
                            <option value="">9:00 am</option>
                            <option value="">10:00 am</option>
                            <option value="">11:00 am</option>
                            <option value="">1:00 pm</option>
                            <option value="">2:00 pm</option>
                            <option value="">3:00 pm</option>
                            <option value="">4:00 pm</option>
                        </select>

                        <select
                            disabled={selectedStylist === ''}
                            value={selectedCoupon}
                            onChange={handleCouponChange}
                            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled={selectedCoupon !== ''} defaultValue hidden className="text-gray-500 ">
                                Seleccionar cupón
                            </option>
                            {cuponesCanjeados.map((coupon) => (
                                <option key={coupon.cuponCanjeadoID} value={coupon.Cupones.nombreCupon}>
                                    {coupon.Cupones.nombreCupon}
                                </option>
                            ))}
                        </select>

                        <button className="w-full px-4 py-2 mt-1 mb-1 mr-1 text-white transition duration-300 ease-in-out bg-blue-800 border border-blue-600 rounded-md md:w-40 hover:bg-blue-950 hover:border-blue-700 hover:shadow-lg">
                            Reservar cita
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default MainContent;
