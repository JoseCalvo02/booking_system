import Swal from "sweetalert2";

const PhoneChangeModal = async () => {
    const { value: newPhone } = await Swal.fire({
        title: "Ingrese su nuevo número de teléfono",
        input: "text",
        inputPlaceholder: "Número de teléfono",
        showCancelButton: true,
        confirmButtonText: "Cambiar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        customClass: {
            confirmButton: "font-bold",
        },
        inputValidator: (value) => {
            if (!value) {
                return "¡Debes ingresar un número de teléfono!";
            }
        },
    });

    if (newPhone) {
        // Imprimir el nuevo número de teléfono en la consola
        console.log("Nuevo número de teléfono ingresado:", newPhone);
    }
}

export default PhoneChangeModal;