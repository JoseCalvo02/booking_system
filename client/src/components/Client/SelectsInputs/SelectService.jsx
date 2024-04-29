import React from 'react';

export default function SelectService({ services, selectedService, setSelectedService }) {

    const handleServiceChange = (event) => {
        const serviceID = parseInt(event.target.value);
        const service = services.find(service => service.servicioID === serviceID);
        setSelectedService(service);
    };

    return (
        <select
            value={selectedService.servicioID}
            onChange={handleServiceChange}
            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="" disabled={selectedService !== ''} defaultValue hidden className="text-gray-900">
                Seleccionar servicio
            </option>
            {services.map((service) => (
                <option key={service.servicioID} value={service.servicioID}>
                    {service.nombreServicio} | ₡{service.precio} | {service.tiempoEstimado}
                </option>
            ))}
        </select>
    )
}
