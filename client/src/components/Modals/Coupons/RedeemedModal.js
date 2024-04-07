import Swal from "sweetalert2";
import { redeemCoupon } from "../../../../api/couponApi";

const RedeemedModal = async (cuponId) => {
    try {
        const response = await redeemCoupon(cuponId);
        Swal.fire({
            title: 'Cupón canjeado',
            text: '¡Tu cupón ha sido canjeado con éxito!',
            icon: 'success',
            confirmButtonColor: '#4caf50',
            confirmButtonText: 'Aceptar'
        });
        return response;
    } catch (error) {
        Swal.fire({
            title: 'Error al canjear el cupón',
            text: '¡Ha ocurrido un error al canjear el cupón!',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        });
        throw new Error(error);
    }
}

export default RedeemedModal;