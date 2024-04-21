import swal from 'sweetalert2';
import { deleteService } from '../../../../api/serviceApi';

const DeleteServModal = (service, setServices) => {
    try {
        swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteService(service);
                    swal.fire({
                        title: 'Eliminado',
                        text: 'El servicio ha sido eliminado',
                        icon: 'success',
                        timer: 2000, // Tiempo en milisegundos (2 segundos)
                        showConfirmButton: false
                    });

                    // Actualizar el estado de los servicios
                    setServices(prevServices => prevServices.filter(serv => serv.servicioID !== service.servicioID));
                } catch (error) {
                    swal.fire('Error', error.message, 'error');
                }
            }
        });
    } catch (error) {
        swal.fire('Error', error.message, 'error');
    }
}

export { DeleteServModal };


