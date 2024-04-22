import swal from 'sweetalert2';
import { ChangeCouponStatus } from '../../../../api/couponApi';

const ChangeStatusModal = async (coupon, coupons, setCoupons) => {
    let action = '';
    let message = '';
    let icon = '';
    let color = '';

    switch (coupon.estado) {
        case 'Activo':
            action = 'Desactivar';
            message = `El cupón ${coupon.nombreCupon} ha sido Desactivado`;
            icon = 'success';
            color = '#f44336';
            break;
        case 'Inactivo':
            action = 'Activar';
            message = `El cupón ${coupon.nombreCupon} ha sido Activado`;
            icon = 'success';
            color = '#22c55e';
            break;
        default:
            break;
    }

    const result = await swal.fire({
        title: `¿Estás seguro de ${action} el Cupon?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: color,
        cancelButtonColor: '#3b82f6',
        confirmButtonText: `Sí, ${action}`,
        cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
        try {
            await ChangeCouponStatus(coupon);

            // Cambiar el estado del cupón
            const updatedCoupons = coupons.map(coup =>
                coup.cuponID === coupon.cuponID ? { ...coup, estado: coupon.estado === 'Activo' ? 'Inactivo' : 'Activo' } : coup
            );

            // Ordenar los cupones
            updatedCoupons.sort((a, b) => a.estado === 'Activo' ? -1 : 1);

            // Actualizar los cupones
            setCoupons(updatedCoupons);

            swal.fire({
                title: '¡Hecho!',
                text: message,
                icon: icon,
                confirmButtonColor: color,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        } catch (error) {
            swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#f44336'
            });
        }
    }
}

export default ChangeStatusModal;
