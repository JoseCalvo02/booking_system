import swal from 'sweetalert2';
import { ChangeCouponStatus } from '../../../../api/couponApi';

const ChangeStatusModal = async (coupon) => {
    let action = '';
    let message = '';
    let icon = '';
    let color = '';

    switch (coupon.estado) {
        case 'Activo':
            action = 'Desactivar';
            message = `El cupón ${coupon.nombreCupon} ha sido Desactivado`;
            icon = 'success';
            color = '#4caf50'; 
            break;
        case 'Inactivo':
            action = 'Activar';
            message = `El cupón ${coupon.nombreCupon} ha sido Activado`;
            icon = 'success';
            color = '#f44336';
            break;
        default:
            break;
    }

    const result = await swal.fire({
        title: `¿Estás seguro de ${action} el Cupon?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: color,
        cancelButtonColor: '#3085d6',
        confirmButtonText: `Sí, ${action}`,
        cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
        try {
            await ChangeCouponStatus(coupon);

            swal.fire({
                title: '¡Hecho!',
                text: message,
                icon: icon,
                confirmButtonColor: color,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
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
