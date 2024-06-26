import React, { useState, useEffect } from 'react';
import { getServices } from '../../../api/serviceApi';
import { getRedeemedCoupons } from '../../../api/couponApi';
import { getScheduleByDateAndStylist } from '../../../api/scheduleApi';
import { getBlocksByDateAndStylist } from '../../../api/blockApi';
import { bookAppointment } from '../../../api/apptApi';
import CitaReservadaModal from '../Modals/Appointments/CitaReservadaModal';

import DateInput from './SelectsInputs/DateInput';
import SelectService from './SelectsInputs/SelectService';
import SelectStylist from './SelectsInputs/SelectStylist';
import SelectHour from './SelectsInputs/SelectHour';
import SelectCupon from './SelectsInputs/SelectCupon';

function MainContent() {
    // Estados para almacenar los datos de los servicios
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    // Estados para almacenar los datos de los cupones canjeados
    const [cuponesCanjeados, setCuponesCanjeados] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState('');
    // Estados para almacenar la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState('');
    // Estados para almacenar los datos de los estilistas
    const [availableStylists, setAvailableStylists] = useState([]);
    const [selectedStylist, setSelectedStylist] = useState('');
    // Estados para almacenar los datos del horario y bloqueo
    const [stylistSchedule, setStylistSchedule] = useState([]);
    const [stylistBlocks, setStylistBlocks] = useState([]);
    // Estados para almacenar el segmento de tiempo seleccionado
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [services, redeemedCoupons] = await Promise.all([getServices(), getRedeemedCoupons()]);
                setServices(services);
                const pendientesCoupons = redeemedCoupons.filter(coupon => coupon.estado === "Pendiente");
                setCuponesCanjeados(pendientesCoupons);
            } catch (error) {
                console.error('Error al obtener los datos:', error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedService !== '' && selectedDate !== '' && selectedStylist !== '') {
            const fetchData = async () => {
                try{
                    // Obtener el horario del estilista seleccionado en la fecha seleccionada
                    const [stylistSchedule, stylistBlocks] = await Promise.all([getScheduleByDateAndStylist(selectedDate, selectedStylist), getBlocksByDateAndStylist(selectedDate, selectedStylist)]);
                    setStylistSchedule(stylistSchedule);
                    setStylistBlocks(stylistBlocks);
                } catch (error) {
                    console.error('Error al obtener los datos:', error.message);
                }
            };

            fetchData();
        }
    }, [selectedDate, selectedStylist]);

    const handleBookAppointment = () => {
        const appointmentData = {
            servicio: selectedService,
            cupon: selectedCoupon,
            fecha: selectedDate,
            estilista: selectedStylist,
            hora: selectedTimeSlot
        };

        bookAppointment(appointmentData);

        // Mostrar el modal de cita reservada
        CitaReservadaModal();

        // Reiniciar los estados a sus valores iniciales o vacíos
        setSelectedService('');
        setSelectedCoupon('');
        setSelectedDate('');
        setSelectedStylist('');
        setSelectedTimeSlot('');
    }

    return (
        <main className="flex flex-col w-full">
            <h1 className="m-auto text-4xl font-extrabold leading-none tracking-tight text-gray-900 align-middle mt-28 md:text-5xl lg:text-6xl dark:text-black">
                Reserve aquí
            </h1>
            <section className="flex flex-wrap justify-center gap-4 m-auto md:gap-8">
                <div className="w-full p-6 rounded-lg md:w-auto">
                    <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-400 rounded-lg shadow-lg md:gap-8 md:ml-6 md:mr-6">

                        <SelectService  services={services} selectedService={selectedService} setSelectedService={setSelectedService}  />

                        <SelectCupon cuponesCanjeados={cuponesCanjeados} selectedService={selectedService} selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon}/>

                        <DateInput selectedService={selectedService} setAvailableStylists={setAvailableStylists} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

                        <SelectStylist selectedDate={selectedDate} availableStylists={availableStylists} selectedStylist={selectedStylist} setSelectedStylist={setSelectedStylist} />

                        <SelectHour selectedStylist={selectedStylist} selectedService={selectedService} stylistSchedule={stylistSchedule} stylistBlocks={stylistBlocks} selectedTimeSlot={selectedTimeSlot} setSelectedTimeSlot={setSelectedTimeSlot}/>

                        <button className={`w-full px-4 py-2 mt-1 mb-1 mr-1 text-white transition duration-300 ease-in-out ${selectedService === '' || selectedDate === '' || selectedStylist === '' || selectedTimeSlot === '' ? 'bg-gray-400 cursor-not-allowed border' : 'bg-blue-800 border border-blue-600 hover:bg-blue-950 hover:border-blue-700 hover:shadow-lg'} md:w-40 rounded-md`}
                            disabled={selectedService === '' || selectedDate === '' || selectedStylist === '' || selectedTimeSlot === ''}
                            onClick={() => handleBookAppointment()}
                        >
                            Reservar cita
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default MainContent;
