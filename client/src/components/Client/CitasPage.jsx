import React from "react";
import { getAppointments } from "../../../api/serviceApi";
import { useEffect, useState } from "react";
import CancelarCitaModal from "../Modals/CancelarCitaModal";
import ReprogramarCitaModal from "../Modals/ReprogramarCitaModal";

function CitasPage() {

    // Estado para almacenar  los datos de las citas de la base de datos
    const [citas, setCitas] = useState([]);

    // Función para cargar los datos de las citas de la base de datos y el nombre del estilista en el estado local
    const loadAppointments = async () => {
        try {
            const appointments = await getAppointments();
            setCitas(appointments);
        } catch (error) {
            console.error("Error al obtener las citas:", error);
        }
    }

    useEffect(() => {
        loadAppointments();
    }
    , []); // Cargar las citas al cargar el componente
    
    // funcion para mostrar el modal de cancelar cita y recarga la pagina al cancelar la cita para actualizar la lista de citas
    const handleCancel = async (appointmentID) => {
        await CancelarCitaModal(appointmentID);
        loadAppointments();
    }

    const handleReprogram = async () => {
        await ReprogramarCitaModal();
    }

    return (
        <section className="flex flex-col w-full h-screen py-8 mx-auto md:w-3/4 md:flex-row md:py-0 md:space-x-8">
            <div className="w-full p-10 mx-auto md:w-full">
                <div className="overflow-x-auto">
                    <table className="w-full mx-auto mt-8 overflow-hidden text-sm text-left text-black bg-gray-100 rounded-lg shadow-md md:mt-24">
                        <caption className="mb-4 text-xl font-bold text-center">Citas del Usuario</caption>
                        <thead className="text-xs uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    ID de la Cita
                                </th>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    Fecha de la Cita
                                </th>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    Hora de la Cita
                                </th>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    Servicio
                                </th>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    Estilista
                                </th>
                                <th scope="col" className="px-6 py-3 text-center md:px-8">
                                    Accion
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.map((cita, index) => (
                            <tr key={index} className="text-black border">
                                <td className="px-6 md:px-8 ">
                                    <div className="flex items-center">
                                        <p>{cita.citaID}</p>
                                    </div>
                                </td>
                                <td className="px-6 md:px-8">
                                    <div className="flex items-center">
                                        <p>{new Date(cita.fechaCita).toISOString().split('T')[0]}</p>
                                    </div>
                                </td>
                                <td className="px-6 md:px-8">
                                    <div className="flex items-center">
                                    <p>{new Date(cita.horaCita).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}</p>
                                    </div>
                                </td>
                                <td className="px-6 md:px-8 ">
                                    <div className="flex items-center">
                                        <p>{cita.servicioCita}</p>
                                    </div>
                                </td>
                                <td className="px-6 md:px-8 ">
                                    <div className="flex items-center">
                                        <p>{cita.estilista}</p>
                                    </div>
                                </td>
                                <td className="p-2 px-6 md:px-8">
                                    <div className="flex items-center justify-center space-x-3">
                                        <button onClick={handleReprogram} className="px-6 py-2 font-medium text-white rounded-lg bg-primary hover:bg-primary_h md:w-[200px]">
                                            Reprogramar
                                        </button>
                                        <button onClick={() => handleCancel(cita.citaID)} className="px-6 py-2 font-medium text-white rounded-lg bg-red-700 y hover:bg-red-500 md:w-[200px]">
                                            Cancelar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default CitasPage;



