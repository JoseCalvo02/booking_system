import Swal from "sweetalert2";

const AddressChangeModal = async () => {
    const { value: newAddress } = await Swal.fire({
        title: "Ingrese su nueva dirección",
        input: "text",
        inputPlaceholder: "Dirección",
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
                return "¡Debes ingresar una dirección!";
            }
        },
    });

    if (newAddress) {
        // Imprimir la nueva dirección en la consola
        console.log("Nueva dirección ingresada:", newAddress);
    }
};

export default AddressChangeModal;