import Swal from "sweetalert2";
import { updateUserAddress } from "../../../../api/userApi";

const AddressChangeModal = async (setUserData) => {
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
        try {
            await updateUserAddress(newAddress);
            setUserData((prevUserData) => ({ ...prevUserData, address: newAddress }));

            Swal.fire({
                icon: "success",
                title: "Dirección actualizada",
                text: `La dirección se ha actualizado a: ${newAddress}`,
            });
        } catch (error) {
            console.error("Error al actualizar la dirección:", error.message);
            Swal.fire({
                icon: "error",
                title: "Error al actualizar la dirección",
                text: error.message,
            });
        }
    }
};

export default AddressChangeModal;