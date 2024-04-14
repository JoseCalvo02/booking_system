import React from 'react';

const StylistSchedulePanel = ({stylist}) => {
    const searchStylist = stylist.nombre ? `${stylist.nombre} ${stylist.apellidos}` : '';
    const obtenerNombresDiasSemana = () => {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return diasSemana.map(dia => <th key={dia}>{dia}</th>);
    };

    // Función para obtener los días del mes
    const obtenerDiasMes = () => {
        const fechaActual = new Date();
        const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        const ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
        const dias = [];
        for (let i = primerDiaMes.getDate(); i <= ultimoDiaMes.getDate(); i++) {
            dias.push(<th key={i}>{i}</th>);
        }
        return dias;
    };
    return (
        <div>
            <h2>Panel del estilista seleccionado: {searchStylist}</h2>

            {/* Renderización de los días y horas del horario */}
            <table>
                <thead>
                    <tr>
                        <th className='border border-gray-300'></th>
                        <th className='border border-gray-300'>Día</th>
                        <th className='border border-gray-300'>Hora Inicio</th>
                        <th className='border border-gray-300'>Hora Salida</th>
                        <th className='border border-gray-300'>Bloqueos</th>

                    </tr>
                </thead>
                <tbody >
                    {/* Renderizar los nombres de los días de la semana */}
                    {obtenerNombresDiasSemana().map((dia, index) => (
                        <tr key={index}>
                            <td className='border border-gray-300'>{dia}</td>
                            <td className='border border-gray-300'></td>
                            <td className='border border-gray-300'></td>
                            <td className='border border-gray-300'></td>
                            <td className='border border-gray-300'></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StylistSchedulePanel;
