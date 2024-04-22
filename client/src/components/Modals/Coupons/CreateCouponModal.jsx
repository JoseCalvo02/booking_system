import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createCoupon } from '../../../../api/couponApi';

export const CreateCouponModal = async (coupons, setCoupons) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: 'Crear Cupón',
        html: (
            <div className='flex flex-col max-w-full gap-2 p-2'>
                <input id="nombreCupon" type="text" placeholder="Nombre del Cupón" className='p-2 border border-gray-500' required />
                <input id="costoPuntos" type="number" min={0} placeholder="Costo Puntos" className='p-2 border border-gray-500' required />
            </div>
        ),
        showCancelButton: true,
        confirmButtonText: 'Crear Cupón',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'text-white p-2 rounded-md hover:bg-blue-600',
            cancelButton: 'text-white p-2 rounded-md hover:bg-red-600',
        },
        preConfirm: async () => {
            // Validación de los campos
            const nombreCupon = document.getElementById('nombreCupon').value;
            const costoPuntos = parseInt(document.getElementById('costoPuntos').value); // Obtener el valor de costoPuntos

            if (!nombreCupon || !costoPuntos) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            const newCoupon = {
                nombreCupon,
                costoPuntos,
            };

            try {
                const addedCoupon = await createCoupon(newCoupon);

                // Actualizar el estado de los cupones y ordenarlos
                const updatedCoupons = [...coupons, addedCoupon].sort((a, b) => a.estado === 'Activo' ? -1 : 1);
                setCoupons(updatedCoupons);

                Swal.fire({
                    title: 'Cupon creado con éxito',
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
