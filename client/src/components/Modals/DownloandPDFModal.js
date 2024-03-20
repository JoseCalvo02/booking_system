import Swal from "sweetalert2";

const DownloandPDFModal = async () => {
    await Swal.fire({
        title: "¡PDF descargado!",
        text: "El PDF ha sido descargado exitosamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
        customClass: {
            confirmButton: "font-bold",
        },
    });
}

export default DownloandPDFModal;