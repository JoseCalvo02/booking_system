import React, { useState, useEffect } from 'react';
import { getAppointments } from '../../../api/apptApi';

const Citas = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const appointments = await getAppointments();
                setAppointments(appointments);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las citas:', error.message);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            <h2>Citas</h2>
        </div>

    );
}

export default Citas;
