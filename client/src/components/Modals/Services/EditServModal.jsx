import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Función para abrir el modal de edición
export const openEditModal = (service, updateService) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: 'Editar Servicio',
        html: (
            <div className='max-w-full'>
                <input id="nombreServicio" type="text" defaultValue={service.nombreServicio} placeholder="Nombre del Servicio" className='' required />
                <input id="descripcion" type="text" defaultValue={service.descripcion} placeholder="Descripción" required />
                <input id="tiempoEstimado" type="text" defaultValue={service.tiempoEstimado.slice(11, 16)} placeholder="hh:mm" pattern="\d{2}:\d{2}" required />
                <input id="precio" type="number" defaultValue={service.precio} placeholder="Precio" required />
            </div>
        ),
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#60A5FA',
        cancelButtonColor: '#F87171',
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'p-2 rounded-md hover:bg-blue-500',
            cancelButton: 'p-2 rounded-md hover:bg-red-500',
        },
        preConfirm: () => {
            // Validación de los campos
            const nombreServicio = document.getElementById('nombreServicio').value;
            const descripcion = document.getElementById('descripcion').value;
            const tiempoEstimado = document.getElementById('tiempoEstimado').value;
            const precio = document.getElementById('precio').value;

            if (!nombreServicio || !descripcion || !tiempoEstimado || !precio) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            if (!/\d{2}:\d{2}/.test(tiempoEstimado)) {
                Swal.showValidationMessage('El tiempo debe tener el formato hh:mm');
                return false;
            }

            if (isNaN(precio)) {
                Swal.showValidationMessage('El precio debe ser un número');
                return false;
            }

            const editedService = {
                servicioID: service.servicioID,
                nombreServicio,
                descripcion,
                tiempoEstimado: service.tiempoEstimado,
                precio,
            };
            // Ejecuta la función de callback con los datos editados
            updateService(editedService);
        }
    });
};
