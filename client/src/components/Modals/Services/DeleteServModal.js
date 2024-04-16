import swal from 'sweetalert2';
import { deleteService } from '../../../../api/serviceApi';

const DeleteServModal = (service) => {
    try {
        swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
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
                    // Actualiza la lista de servicios después de eliminar un servicio
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000); // Recarga después de 2 segundos
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


