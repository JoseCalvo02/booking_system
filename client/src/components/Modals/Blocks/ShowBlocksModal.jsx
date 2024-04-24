import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const ShowBlocksModal = (matchingBlocks) => {
    const MySwal = withReactContent(Swal);

    // Función para manejar el cambio de la opción seleccionada en el select
    const handleSelectChange = (e) => {
        const selectedBlockID = e.target.value;
        const selectedBlock = matchingBlocks.find(block => block.bloqueoID.toString() === selectedBlockID);
        if (selectedBlock) {
            // Actualizar los valores de los inputs con la información del bloque seleccionado
            document.getElementById('horaInicioInput').value = selectedBlock.horaInicio;
            document.getElementById('horaFinalInput').value = selectedBlock.horaFinal;
            document.getElementById('descripcionTextarea').value = selectedBlock.descripcion !== '' ? selectedBlock.descripcion : 'No hay descripción disponible';
        }
    };

    MySwal.fire({
        title: 'Bloqueos del día',
        html: (
            <div className='flex flex-col max-w-full gap-2 p-2'>

                <h1 className='mb-2 text-xl text-gray-800'>Hay {matchingBlocks.length} bloqueo(s) </h1>

                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="matchingBlockSelect" className="text-base text-gray-800 w-[150px]">Tipo de bloqueo:</label>
                    <select id="matchingBlockSelect"  className="flex-grow p-2 origin-bottom border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary" onChange={handleSelectChange}>
                    {matchingBlocks.map(block => (
                        <option key={block.bloqueoID} value={block.bloqueoID} className='checked:bg-primary checked:text-white'>{block.TipoBloqueo.nombre}</option>
                    ))}
                </select>
                </div>
                {/* Based on the selected option display the information of the specific block like: horaInicio, horaFinal and description*/}
                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="horaInicioInput" className="text-base text-gray-800 w-[150px]">Hora de Inicio:</label>
                    <input id="horaInicioInput" type="text" className="flex-grow p-2 border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary" readOnly defaultValue={matchingBlocks[0].horaInicio}/>
                </div>
                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="horaFinalInput" className="text-base text-gray-800 w-[150px]">Tipo de bloqueo:</label>
                    <input id="horaFinalInput" type="text" className="flex-grow p-2 border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary" readOnly defaultValue={matchingBlocks[0].horaFinal}/>
                </div>
                <div className='flex items-center gap-2 felx-col' >
                    <label htmlFor="descripcionTextarea" className="text-base text-gray-800 w-[150px]">Tipo de bloqueo:</label>
                    <textarea id="descripcionTextarea" className="flex-grow p-2 border border-gray-500 rounded-md focus:border-blue-500 focus:outline-primary" readOnly defaultValue={matchingBlocks[0].descripcion !== '' ? matchingBlocks[0].descripcion :'No hay descripción disponible'}/>
                </div>
            </div>
        ),
        confirmButtonColor: '#3b82f6',
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'text-white p-2 rounded-md hover:bg-blue-600 w-[105px]',
        },
    });
}