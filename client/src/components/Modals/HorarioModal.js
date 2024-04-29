import Swal from 'sweetalert2';

// Modal que muestre el horario de atencion de la empresa de lunes a sabado de 7:00am a 5:00pm, Domingo cerrado
const HorarioModal = async () => {
    Swal.fire({
        title: 'Horario de Atención',
        html: `
            <p>Lunes a Sabado: 8:00am - 5:00pm</p>
            <p>Domingo: Cerrado</p>
            <br>
            <p>¡Esperamos su visita!</p>
        `,
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: "#3085d6",
        customClass: {
            confirmButton: 'font-bold',
        },
    });
};

export default HorarioModal;

