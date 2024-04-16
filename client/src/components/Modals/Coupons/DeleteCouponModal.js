import swal from 'sweetalert2';
import { disableCoupon } from '../../../../api/couponApi';

const DeleteCouponModal = async (coupon) => {
    try {
        console.log(coupon, 'coupon MODAL');
        const result = await swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas desactivar este cupón?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, desactivar'
        });

        if (result.isConfirmed) {
            await disableCoupon(coupon);
            swal.fire({
                title: '¡Desactivado!',
                text: 'El cupón ha sido desactivado',
                icon: 'success',
                timer: 2000, // Duración del mensaje de éxito en milisegundos (2 segundos)
                timerProgressBar: true,
                showConfirmButton: false,
                didClose: () => {
                    // Recargar la página después de cerrar el mensaje de éxito
                    window.location.reload();
                }
            });
        }
    } catch (error) {
        swal.fire('¡Error!', 'Ha ocurrido un error', 'error');
    }
}

export default DeleteCouponModal;
