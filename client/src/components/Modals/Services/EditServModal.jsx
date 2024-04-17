import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { editService } from '../../../../api/serviceApi';

// Función para abrir el modal de edición
export const openEditModal = (service, updateService) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: 'Editar Servicio',
        html: (
            <div className='flex flex-col max-w-full gap-4 p-2'>
                <input id="nombreServicio" type="text" defaultValue={service.nombreServicio} placeholder="Nombre del Servicio" className='p-2 border boerder-gray-500' required />
                <textarea id="descripcion" type="text" defaultValue={service.descripcion} placeholder="Descripción" className='p-2 border boerder-gray-500' required />
                <input id="tiempoEstimado" type="text" defaultValue={service.tiempoEstimado} placeholder="hh:mm" pattern="\d{2}:\d{2}" className='p-2 border boerder-gray-500' required />
                <input id="precio" type="number" min={0} defaultValue={service.precio} placeholder="Precio" className='p-2 border boerder-gray-500' required />
            </div>
        ),
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
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
            const precioInput = document.getElementById('precio').value;
            const precio = parseInt(precioInput);

            if (!nombreServicio || !descripcion || !tiempoEstimado || !precio) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            if (!/\d{2}:\d{2}/.test(tiempoEstimado)) {
                Swal.showValidationMessage('El tiempo debe tener el formato hh:mm');
                return false;
            }

            if (isNaN(precio) || precio.toString() !== precioInput) {
                Swal.showValidationMessage('El precio debe ser un número entero');
                return false;
            }

            const editedService = {
                ...service,
                nombreServicio,
                descripcion,
                tiempoEstimado,
                precio,
            };

            // Llamar a la función para editar el servicio
            editService(editedService).then(() => {
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'El servicio se actualizó correctamente',
                    icon: 'success',
                    timer: 2000, // Cerrar automáticamente después de 2 segundos
                    timerProgressBar: true,
                    showConfirmButton: false
                });
                // Ejecutar la función de callback con los datos editados
                updateService(editedService);
            })
            .catch(error => {
                // Mostrar mensaje de error si hubo un problema al actualizar
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al actualizar el servicio',
                    icon: 'error',
                    timer: 2000, // Cerrar automáticamente después de 2 segundos
                    timerProgressBar: true,
                    showConfirmButton: false
                });
                console.error('Error al actualizar el servicio:', error);
            });
        }
    });
};
