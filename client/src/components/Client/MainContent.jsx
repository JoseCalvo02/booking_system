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
    const [availableStylists, setAvailableStylists] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

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

    const handleDateChange = async (event) => {
        const selectedDate = event.target.value;
        setSelectedDate(selectedDate);
        try {
            const schedules = await getSchedulesByDate(selectedDate);
            setSchedules(schedules);
            const activeStylistIDs = schedules.map(schedule => schedule.estilistaID);
            const availableStylists = stylists.filter((stylist) => activeStylistIDs.includes(stylist.usuarioID));
            setAvailableStylists(availableStylists);
            if (selectedStylist !== '') {
                setSelectedStylist('');
            }
            setAvailableTimeSlots([]); // Clear time slots when the date changes
            console.log('Horarios:', schedules);
        } catch (error) {
            console.error('Error al obtener los horarios:', error.message);
        }
    };

    const handleCouponChange = (event) => {
        setSelectedCoupon(event.target.value);
    };

    useEffect(() => {
        if (selectedStylist !== '' && selectedService !== '') {
            // Obtener la duración del servicio seleccionado y convertirla a tiempo
            const selectedServiceData = services.find(service => service.nombreServicio === selectedService);
            const serviceDurationString = selectedServiceData.tiempoEstimado; // Duración en formato de cadena
            const [hoursString, minutesString] = serviceDurationString.split(':'); // Separar horas y minutos
            const serviceDuration = parseInt(hoursString) * 60 + parseInt(minutesString); // Duración en minutos
    
            // Calcular la hora de inicio y fin del primer horario disponible
            const stylistID = stylists.find(stylist => stylist.nombre === selectedStylist).usuarioID;
            const stylistSchedules = schedules.filter(schedule => schedule.estilistaID === stylistID);
            const startTime = stylistSchedules[0].horaInicio;
            const endTime = stylistSchedules[0].horaFinal;
    
            // Convertir la hora de inicio y fin a objetos Date para cálculos
            const startDate = new Date(`2000-01-01T${startTime}`);
            const endDate = new Date(`2000-01-01T${endTime}`);
    
            // Array para almacenar los intervalos de tiempo
            const timeSlots = [];
    
            // Iterar desde la hora de inicio hasta la hora final con el intervalo de tiempo calculado
            let currentTime = startDate;
            while (currentTime <= endDate) {
                // Formatear el tiempo actual a una cadena de formato HH:MM
                const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
                // Agregar el intervalo de tiempo al array
                timeSlots.push(formattedTime);
    
                // Aumentar el tiempo actual por la duración del servicio en minutos
                currentTime = new Date(currentTime.getTime() + serviceDuration * 60000); // Convertir minutos a milisegundos
            }
    
            setAvailableTimeSlots(timeSlots);
        }
    }, [selectedStylist, selectedService, schedules, stylists, services]);
    
    
    
    

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

                        <select
                            disabled={selectedStylist === ''}
                            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" defaultValue hidden className="text-gray-500">
                                Seleccionar hora
                            </option>
                            {availableTimeSlots.map((timeSlot) => (
                                <option key={timeSlot} value={timeSlot}>
                                    {timeSlot}
                                </option>
                            ))}
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
