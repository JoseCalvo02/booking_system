import React from 'react';

const SelectStylist = ({ selectedDate, availableStylists, selectedStylist, setSelectedStylist }) => {
    const handleStylistChange = (event) => {
        const stylistID = parseInt(event.target.value);
        setSelectedStylist(stylistID);
    };

    return (
        <select
            disabled={selectedDate === '' || availableStylists.length === 0}
            value={selectedStylist}
            onChange={handleStylistChange}
            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="" disabled={selectedStylist !== ''} defaultValue hidden className="text-gray-900">
                Seleccionar estilista
            </option>
            {availableStylists.map((stylist) => (
                <option key={stylist.usuarioID} value={stylist.usuarioID}>
                    {stylist.nombre + ' ' + stylist.apellidos}
                </option>
            ))}
        </select>
    );
}

export default SelectStylist;
