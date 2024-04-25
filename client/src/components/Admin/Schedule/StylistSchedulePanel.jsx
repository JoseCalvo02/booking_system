import React, { useEffect, useState } from 'react';
import MoonLoader from "react-spinners/MoonLoader";
// Functions / Api / Components / Modals
import { getSchedulesByStylist, getWeeklySchedules } from '../../../../api/scheduleApi';
import { getBlocksByStylist, getTypeBlocks } from '../../../../api/blockApi';
import { MonthNavigator } from './MonthNavigator';
import { daysInMonth, getDayName } from '../../../utils/dateUtils';
import { CreateScheduleModal } from '../../Modals/Schedules/CreateScheduleModal';
import { DeleteScheduleModal } from '../../Modals/Schedules/DeleteScheduleModal';
import { UpdateScheduleModal } from '../../Modals/Schedules/UpdateScheduleModal';
import { CreateBlockModal } from '../../Modals/Blocks/CreateBlockModal';
import { ShowBlocksModal } from '../../Modals/Blocks/ShowBlocksModal';
// Styles
import customStyles from '../../../custom/customStyles';

const StylistSchedulePanel = ({stylist}) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [schedule, setSchedule] = useState([]);
    const [weeklySchedules, setWeeklySchedules] = useState(''); // Tipo de horario
    const [blocks, setBlocks] = useState([]); // Bloqueos del estilista
    const [typeBlocks, setTypeBlocks] = useState(''); // Tipo de bloqueo
    const [loading, setLoading] = useState(true);

    useEffect(() => { // Obtener los horarios y bloqueos del estilista en el mes actual
        const fetchDynamicData = async () => {
            try {
                const [schedules, blocks] = await Promise.all([
                    getSchedulesByStylist(stylist.usuarioID, currentDate.getFullYear(), currentDate.getMonth()+1),
                    getBlocksByStylist(stylist.usuarioID, currentDate.getFullYear(), currentDate.getMonth()+1)
                ]);
                setSchedule(schedules);
                setBlocks(blocks);

                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el horario:', error.message);
            }
        }
        fetchDynamicData();
    }, [currentDate]);

    useEffect(() => { // Obtener los tipos de bloqueos y horarios semanales
        const fetchDataTypes = async () => {
            try {
                const [weeklySchedules, typeBlocks] = await Promise.all([
                    getWeeklySchedules(),
                    getTypeBlocks()
                ]);
                setWeeklySchedules(weeklySchedules);
                setTypeBlocks(typeBlocks);
            } catch (error) {
                console.error('Error al obtener los tipos de bloqueos:', error.message);
            }
        }
        fetchDataTypes();
    }, []);

    // Function to handle the change of month in the MonthNavigator component
    const handleChangeMonth = (newDate) => {
        setCurrentDate(newDate);
    };

    return (
        <>
        <div className='flex mb-2 '>
            <MonthNavigator currentDate={currentDate} onChangeMonth={handleChangeMonth} />
            <MoonLoader color={'#111827'} loading={loading} size={30} className='ml-4'/> {/* Spinner de carga */}
            <div className='flex justify-end flex-grow gap-2 text-white' >
                <button className='w-[105px] p-2 bg-green-500 rounded-lg hover:bg-green-600'
                    onClick={() => CreateScheduleModal(stylist, currentDate, setSchedule, weeklySchedules)}
                >
                    + Horario
                </button>
                <button className='w-[105px] p-2 bg-blue-500 rounded-lg hover:bg-blue-600'
                    onClick={() => CreateBlockModal(stylist, currentDate, setBlocks, typeBlocks)}
                >
                    + Bloqueo
                </button>
            </div>
        </div>

        <section className='overflow-y-auto max-h-[58vh]'>
            {/* Renderización de los días y horas del horario */}
            <table className='w-full'>
                <thead className={customStyles.thead}>
                    <tr>
                        <th className={customStyles.th}>Fecha</th>
                        <th className={customStyles.th}>Día</th>
                        <th className={customStyles.th}>Hora Inicio</th>
                        <th className={customStyles.th}>Hora Salida</th>
                        <th className={customStyles.th}>Bloqueos</th>
                        <th className={customStyles.th}>Horario</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                    {/* Creating an array with the number of days in the current month, and mapping over it to generate elements */}
                    {Array.from({ length: daysInMonth(currentDate.getMonth(), currentDate.getFullYear()) }, (_, index) => {
                        const day = index + 1; // Obtener el día actual en el bucle, empezando desde 1
                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day); // Crear una nueva fecha con el día actual en el bucle
                        const dayName = getDayName(date); // Obtener el nombre del día

                        const matchingSchedule = schedule.find(item => new Date(item.fecha).getUTCDate() === day);
                        const matchingBlocks = blocks.filter(item => new Date(item.fecha).getUTCDate() === day);

                        return (
                            <tr key={day} className='hover:bg-gray-100'>
                                <td className={customStyles.td}>{day}</td>
                                <td className={customStyles.td}>{dayName}</td>
                                <td className={customStyles.td}>{matchingSchedule ? matchingSchedule.horaInicio : '-'}</td>
                                <td className={customStyles.td}>{matchingSchedule ? matchingSchedule.horaFinal : '-'}</td>
                                {matchingBlocks.length > 0 ? (
                                    <td className={customStyles.td}>
                                        <button className='w-[105px] p-2 mr-2 text-white bg-gray-700 rounded-lg hover:bg-gray-900' onClick={() => ShowBlocksModal(matchingBlocks, setBlocks)}>Bloqueos</button>
                                    </td>
                                ) : (
                                    <td className={customStyles.td}>-</td>
                                )}
                                {matchingSchedule ? (
                                    <td className={customStyles.td}>
                                        <button className='w-[105px] p-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600' onClick={() => UpdateScheduleModal(matchingSchedule, setSchedule)}>Editar</button>
                                        <button className='w-[105px] p-2 mr-2 text-white bg-red-500 rounded-lg hover:bg-red-600' onClick={() => DeleteScheduleModal(matchingSchedule, setSchedule)}>Eliminar</button>
                                    </td>
                                ) : (
                                    <td className={customStyles.td}>-</td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>

            </table>

        </section>
        </>
    );
}

export default StylistSchedulePanel;
