import Swal from "sweetalert2";

const RedeemedModal = async () => {
    await Swal.fire({
        title: "¡Código canjeado!",
        text: "El código ha sido canjeado exitosamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
        customClass: {
            confirmButton: "font-bold",
        },
    });
}

export default RedeemedModal;
