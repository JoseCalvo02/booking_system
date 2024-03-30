import Swal from 'sweetalert2';

// Modal que solicita la nueva fecha y hora de la cita y, si acepta, se reprograma la cita
const ReprogramarCitaModal = () => {
    Swal.fire({
        title: 'Reprogramar Cita',
        html: `
            <div style="text-align: left;">
                <label for="fechaCita" style="display: block; margin-bottom: 5px;">Fecha de la Cita:</label>
                <input type="date" id="fechaCita" name="fechaCita" required style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box;">
            </div>
            <div style="text-align: left; margin-top: 15px;">
                <label for="horaCita" style="display: block; margin-bottom: 5px;">Hora de la Cita:</label>
                <input type="time" id="horaCita" name="horaCita" required style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box;">
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Reprogramar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0000ff',
        cancelButtonColor: '#ff0000',
        customClass: {
            title: 'modal-title',
            confirmButton: 'modal-confirm-button',
            cancelButton: 'modal-cancel-button',
            htmlContainer: 'modal-html-container'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Reprogramada!',
                'Su cita ha sido reprogramada.',
                'success'
            );
        }
    });
};

export default ReprogramarCitaModal;





