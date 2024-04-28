import React, { useEffect, useState } from 'react';
// Functions | API | Hooks | Components
import { getCurrentDate } from '../../utils/dateUtils';
import { getSchedulesByDate } from '../../../api/scheduleApi';
// Styles & Icons
import customStyles from '../../custom/customStyles';
import { TbMassage, TbClockPlay, TbClockShare, TbClick } from "react-icons/tb";

const DashboardTable = () => {
    const [schedules, setSchedules] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [displayContent, setDisplayContent] = useState('schedules');

    useEffect(() => {
        const fetchData = async () => {
            // Obtener la fecha de hoy en la zona horaria local
            const date = getCurrentDate();
            const schedules = await getSchedulesByDate(date);
            setSchedules(schedules);
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Schedules and appoitments tables */}
            <header className='flex items-center gap-4 p-4 mt-4 mb-4 text-xl font-bold text-center border border-gray-300 rounded-xl shadow-custom'>
                <button className={customStyles.dashBtns} onClick={() => setDisplayContent('schedules')}>Horarios del día <TbClick size={25}/></button>
                <p>|</p>
                <button className={customStyles.dashBtns} onClick={() => setDisplayContent('citas')}>Citas del día <TbClick size={25}/></button>
            </header>

            <section className='flex flex-col p-4 max-h-[50vh] overflow-auto transition-all duration-200 ease-in-out bg-white border border-gray-300 rounded-xl shadow-custom hover:shadow-none'>
                {displayContent === 'schedules' ? (
                    <table className='w-full text-center'>
                        <thead>
                            <tr>
                                <th className={customStyles.dashTh}>
                                    <div className="flex items-center justify-center h-full gap-2">
                                        <TbMassage size={25} className='text-blue-400'/>
                                        <span>Estilista</span>
                                    </div>
                                </th>
                                <th className={customStyles.dashTh}>
                                    <div className="flex items-center justify-center h-full gap-2">
                                        <TbClockPlay size={25} className='text-green-400'/>
                                        <span>Hora entrada</span>
                                    </div>
                                </th>
                                <th className={customStyles.dashTh}>
                                    <div className="flex items-center justify-center h-full gap-2">
                                        <TbClockShare size={25} className='text-red-400'/>
                                        <span>Hora Salida</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Verificar si la lista de horarios está vacía */}
                            { schedules.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className={customStyles.dashTd}>No hay horarios</td>
                                </tr>
                            ) : (
                                /* Si hay horarios, mapear la lista de horarios */
                                schedules.map((schedule, index) => (
                                    <tr className={index === schedules.length - 1 ? '' : 'border-b border-gray-300'} key={schedule.horarioID}>
                                        <td className={customStyles.dashTd}> {schedule.Usuarios.nombre + " " + schedule.Usuarios.apellidos}</td>
                                        <td className={customStyles.dashTd}>{schedule.horaInicio}</td>
                                        <td className={customStyles.dashTd}>{schedule.horaFinal}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                ) : (
                    <table className='w-full text-center'>
                        <thead>
                            <tr>
                                <th className={customStyles.dashTh}>Cita</th>
                                <th className={customStyles.dashTh}>Estilista</th>
                                <th className={customStyles.dashTh}>Servicio</th>
                                <th className={customStyles.dashTh}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Verificar si la lista de citas está vacía */}
                            { appointments.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className={customStyles.dashTd}>No hay citas</td>
                                </tr>
                            ) : (
                                /* Si hay citas, mapear la lista de citas */
                                appointments.map((appointment, index) => (
                                    <tr key={appointment.citaID}>
                                        <td>{appointment.citaID}</td>
                                        <td>{appointment.Usuarios.nombre + " " + appointment.Usuarios.apellidos}</td>
                                        <td>{appointment.Servicios.nombre}</td>
                                        <td>
                                            <button>Editar</button>
                                            <button>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default DashboardTable;
