import React from "react";
import { getAppointments } from "../../../api/apptApi";
import { useEffect, useState } from "react";
import CancelarCitaModal from "../Modals/Appointments/CancelarCitaModal";
import ReprogramarCitaModal from "../Modals/Appointments/ReprogramarCitaModal";
import { decodeToken } from '../../utils/tokenUtils';

function CitasPage() {
    const [userData, setUserData] = useState({
        usuarioID: '',
        nombre: '',
    }); // Obtener los datos del usuario logueado

    // Estado para almacenar  los datos de las citas de la base de datos
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        const decodedToken = decodeToken();
        if (decodedToken) {
            setUserData({
                usuarioID: decodedToken.userId,
                nombre: decodedToken.name,
            });// Logging the userID

            loadAppointments(decodedToken.userId);
        }
    }, []);

    // Función para cargar los datos de las citas de la base de datos y el nombre del estilista en el estado local
    const loadAppointments = async (userId) => {
        try {
            const appointments = await getAppointments(userId);
            setCitas(appointments);
        } catch (error) {
            console.error("Error al cargar las citas:", error);
        }
    }
    console.log(citas); 

    // funcion para mostrar el modal de cancelar cita y recarga la pagina al cancelar la cita para actualizar la lista de citas
    const handleCancel = async (appointmentID) => {
        try {
            await CancelarCitaModal(appointmentID);
            const updatedAppointments = citas.filter(cita => cita.citaID !== appointmentID);
            setCitas(updatedAppointments);
        } catch (error) {
            console.error("Error al cancelar la cita:", error);
        }
    }

    const handleReprogram = async () => {
        await ReprogramarCitaModal();
    }

    return (
        <section className="flex flex-col w-full h-screen py-8 mx-auto md:w-3/4 md:flex-row md:py-0 md:space-x-8">
            <div className="w-full p-10 mx-auto md:w-full">
                <div className="overflow-x-auto">
                    <table className="w-full mx-auto mt-8 overflow-hidden text-sm text-left text-black bg-gray-100 rounded-lg shadow-md md:mt-24">
                        <caption className="mb-4 text-xl font-bold text-center">Citas de {userData.nombre}</caption>
                        <thead className="text-xs uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    ID de la Cita
                                </th>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    Fecha de la Cita
                                </th>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    Hora Inicio
                                </th>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    Hora Final 
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
                            {citas.map((cita) => (
                                <tr key={cita.citaID} className="text-black border">
                                    <td className="px-6 md:px-8 ">
                                        <div className="flex items-center">
                                            <p>{cita.citaID}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-8">
                                        <div className="flex items-center">
                                            <p>{new Date(cita.HorariosReservados.dia).toISOString().split('T')[0]}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-8">
                                        <div className="flex items-center">
                                        <p>{cita.HorariosReservados.horaInicio}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-8">
                                        <div className="flex items-center">
                                        <p>{cita.HorariosReservados.horaFinal}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-8 ">
                                        <div className="flex items-center">
                                            <p>{cita.nombreServicio}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-8 ">
                                        <div className="flex items-center">
                                            <p>{cita.nombreEstilista}</p>
                                        </div>
                                    </td>
                                    <td className="p-2 px-6 md:px-8">
                                        <div className="flex items-center justify-center space-x-3">
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



