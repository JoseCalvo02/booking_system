import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { editCoupon } from '../../../../api/couponApi';

// Función para abrir el modal de edición
export const EditCouponModal = (coupon, setCoupons) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: 'Editar Cupón',
        html: (
            <div className='flex flex-col max-w-full gap-2 p-2'>
                <input id="nombreCupon" type="text" defaultValue={coupon.nombreCupon} placeholder="Nombre del Cupón" className='p-2 border border-gray-500' required />
                <input id="valorPuntos" type="number" defaultValue={coupon.valorPuntos} min={0} placeholder="Coste de Puntos" className='p-2 border border-gray-500' required />
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
        preConfirm: async () => {
            // Validación de los campos
            const nombreCupon = document.getElementById('nombreCupon').value;
            const valorPuntosInput = document.getElementById('valorPuntos').value;
            const valorPuntos = parseInt(valorPuntosInput); // Obtener el valor de valorPuntos

            if (!nombreCupon || !valorPuntos) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            if (isNaN(valorPuntos) || valorPuntos.toString() !== valorPuntosInput) {
                Swal.showValidationMessage('El costo de puntos debe ser un número entero');
                return false;
            }

            const editedCoupon = {
                ...coupon,
                nombreCupon,
                valorPuntos,
            };

            try {
                // Llamar a la función para editar el cupón
                await editCoupon(editedCoupon);
                Swal.fire({
                    title: 'Cupón Editado',
                    icon: 'success',
                    text: 'El cupón ha sido editado exitosamente',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                setCoupons((prev) => prev.map((oldCoupon) => oldCoupon.cuponID === editedCoupon.cuponID ? editedCoupon : oldCoupon));
            } catch(error) {
                console.error('Error editing coupon:', error.message);
            };
        }
    });
}