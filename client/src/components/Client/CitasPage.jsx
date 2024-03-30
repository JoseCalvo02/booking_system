import React from "react";

function CitasPage() {
    return (
        <section className="flex flex-col w-full h-screen py-8 mx-auto md:w-3/4 md:flex-row md:py-0 md:space-x-8">
            <div className="w-full p-10 mx-auto md:w-full">
                <div className="overflow-x-auto">
                    <table className="w-full mx-auto mt-8 overflow-hidden text-sm text-left text-black bg-gray-100 rounded-lg shadow-md md:mt-24">
                        <caption className="mb-4 text-xl font-bold text-center">Citas del Usuario</caption>
                        <thead className="text-xs uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    Fecha
                                </th>
                                <th scope="col" className="px-6 py-3 md:px-8">
                                    Hora
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
                            <tr className="text-black border">
                                <td className="px-6 md:px-8 ">
                                    <div className="flex items-center">
                                        <p>01</p>
                                    </div>
                                </td>
                                <td className="px-6 md:px-8">
                                    <div className="flex items-center">
                                        <p>22/10/2021</p>
                                    </div>
                                </td>
                                <td className="px-6 md:px-8">
                                    <div className="flex items-center">
                                        <p>10:00</p>
                                    </div>
                                </td>
                                <td className="px-6 md:px-8 ">
                                    <div className="flex items-center">
                                        <p>Corte de Cabello</p>
                                    </div>
                                </td>
                                <td className="px-6 md:px-8 ">
                                    <div className="flex items-center">
                                        <p>Juan Perez</p>
                                    </div>
                                </td>
                                <td className="p-2 px-6 md:px-8">
                                    <div className="flex items-center justify-center space-x-3">
                                        <button className="px-6 py-2 font-medium text-white rounded-lg bg-primary hover:bg-primary_h md:w-[200px]">
                                            Reprogramar
                                        </button>
                                        <button className="px-6 py-2 font-medium text-white rounded-lg bg-primary hover:bg-primary_h md:w-[200px]">
                                            Cancelar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default CitasPage;



