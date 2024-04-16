import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Función para abrir el modal de edición
export const EditCouponModal = (coupon, updateCoupon) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: 'Editar Cupón',
        html: (
            <div className='flex flex-col max-w-full gap-2 p-2'>
                <input id="nombreCupon" type="text" placeholder="Nombre del Cupón" className='p-2 border border-gray-500' required />
                <input id="costoPuntos" type="number" min={0} placeholder="CostoPuntos" className='p-2 border border-gray-500' required />
            </div>
        ),
        showCancelButton: true,
        confirmButtonText: 'Editar Cupón',
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
            const nombreCupon = document.getElementById('nombreCupon').value;
            const costoPuntos = parseInt(document.getElementById('costoPuntos').value); // Obtener el valor de costoPuntos

            if (!nombreCupon || !costoPuntos) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            const editedCoupon = {
                ...coupon,
                nombreCupon,
                costoPuntos,
            };

            // Retornar la promesa de updateCoupon con timeout de 2 segundos
            return updateCoupon(editedCoupon).then(() => {
                Swal.fire({
                    title: 'Cupon editado con éxito',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    // Recargar la página después de 2 segundos
                        window.location.reload();
                    },);
                }
            );
        }
    });

}