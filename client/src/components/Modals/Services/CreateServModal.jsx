import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createService } from '../../../../api/serviceApi';

export const CreateServModal = async() => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: 'Crear Servicio',
        html: (
            <div className='flex flex-col max-w-full gap-2 p-2'>
                <input id="nombreServicio" type="text" placeholder="Nombre del Servicio" className='p-2 border boerder-gray-500' required />
                <textarea id="descripcion" type="text" placeholder="Descripción" className='p-2 border boerder-gray-500' required />
                <input id="tiempoEstimado" type="text" placeholder="hh:mm" pattern="\d{2}:\d{2}" className='p-2 border boerder-gray-500' required />
                <input id="precio" type="number" placeholder="Precio" className='p-2 border boerder-gray-500' required />
            </div>
        ),
        showCancelButton: true,
        confirmButtonText: 'Crear Servicio',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'text-white p-2 rounded-md hover:bg-blue-600',
            cancelButton: 'text-white p-2 rounded-md hover:bg-red-600',
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

            // Verificar si el precio contiene decimales
            if (precio !== parseInt(precio).toString()) {
                Swal.showValidationMessage('El precio debe ser un número entero');
                return false;
            }

            const newService = {
                nombreServicio,
                descripcion,
                tiempoEstimado,
                precio,
            };

             // Retornar la promesa de createService
            return createService(newService).then(() => {
                Swal.fire({
                    title: 'Servicio creado con éxito',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    // Recargar la página después de 2 segundos
                        window.location.reload();
                    },);
                }
            ).catch((error) => {
                Swal.fire({
                    title: 'Error al crear el servicio',
                    text: error.message,
                    icon: 'error'
                });
            }
            );
        }
    });
}

export default CreateServModal;