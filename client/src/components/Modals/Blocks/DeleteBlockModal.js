import Swal from 'sweetalert2';
import { deleteBlock } from '../../../../api/blockApi';

// Function to handle the deletion of a block
export const handleDeleteBlock = (selectedBlockID, setBlocks) => {
    Swal.fire({
        title: 'Eliminar bloqueo',
        text: '¿Estás seguro de que deseas eliminar este bloqueo?',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#3b82f6',
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'text-white p-2 rounded-md hover:bg-red-600',
            cancelButton: 'text-white p-2 rounded-md hover:bg-blue-600',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            try{
                deleteBlock(selectedBlockID);
                setBlocks((prevBlocks) => prevBlocks.filter((block) => block.bloqueoID !== selectedBlockID));

                Swal.fire({
                    title: 'Bloqueo eliminado',
                    text: 'El bloqueo se ha eliminado correctamente',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
        }
    });
}