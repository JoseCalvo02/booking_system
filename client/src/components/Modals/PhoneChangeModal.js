import Swal from "sweetalert2";
import { updateUserPhone } from "../../../api/userApi";

const PhoneChangeModal = async (setUserData) => {
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
        // Validación básica del número de teléfono
        if (!/^\d{8}$/.test(value)) {
            return "¡El número de teléfono no es válido!";
        }
        },
    });

    if (newPhone) {
        // Imprimir el nuevo número de teléfono en la consola
        console.log("Nuevo número de teléfono ingresado:", newPhone);

        try {
        // Actualiza el número de teléfono en el backend y en el estado local
        await updateUserPhone(newPhone);
        setUserData((prevUserData) => ({ ...prevUserData, phone: newPhone }));

        // Mostrar mensaje de éxito
        Swal.fire({
            icon: "success",
            title: "Teléfono actualizado",
            text: `El teléfono se ha actualizado a ${newPhone}`,
        });
        } catch (error) {
        console.error("Error al actualizar el teléfono:", error.message);
        Swal.fire({
            icon: "error",
            title: "Error al actualizar el teléfono",
            text: error.message,
        });
        }
    }
}

    export default PhoneChangeModal;
 