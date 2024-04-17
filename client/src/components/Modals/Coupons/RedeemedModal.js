import Swal from "sweetalert2";
import { redeemCoupon } from "../../../../api/couponApi";

const RedeemedModal = async (cuponId, setUserData) => {
    try {
        const costeCupon = await redeemCoupon(cuponId);

        setUserData((prevUserData) => ({
            ...prevUserData,
            puntosAcumulados: prevUserData.puntosAcumulados - costeCupon,
            puntosCanjeados: prevUserData.puntosCanjeados + costeCupon
        }));

        Swal.fire({
            title: 'Cupón canjeado',
            text: '¡Tu cupón ha sido canjeado con éxito!',
            icon: 'success',
            confirmButtonColor: '#22c55e',
            confirmButtonText: 'Aceptar'
        });
    } catch (error) {
        Swal.fire({
            title: 'Error al canjear el cupón',
            text: '¡Ha ocurrido un error al canjear el cupón!',
            icon: 'error',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Aceptar'
        });
        throw new Error(error);
    }
}

export default RedeemedModal;