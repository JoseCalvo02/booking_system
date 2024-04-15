import Swal from "sweetalert2";

const NameChangeModal = async () => {
    const { value: newName } = await Swal.fire({
        title: "Ingrese su nuevo nombre",
        input: "text",
        inputPlaceholder: "Nombre",
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
                return "¡Debes ingresar un nombre!";
            }
        },
    });

    if (newName) {
        // Imprimir el nuevo nombre en la consola
        console.log("Nuevo nombre ingresado:", newName);
    }
}

export default NameChangeModal;
