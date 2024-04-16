import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const CreateCouponModal = async() => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: 'Crear Cupón',
        html: (
            <div className='flex flex-col max-w-full gap-2 p-2'>
                <input id="nombreCupon" type="text" placeholder="Nombre del Cupón" className='p-2 border boerder-gray-500' required />
                <textarea id="descripcion" type="text" placeholder="Descripción" className='p-2 border boerder-gray-500' required />
                <input id="descuento" type="number" placeholder="Descuento" className='p-2 border boerder-gray-500' required />
            </div>
        ),
        showCancelButton: true,
        confirmButtonText: 'Crear Cupón',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        customClass: {
            title: 'text-2xl font-semibold text-gray-800',
            confirmButton: 'text-white p-2 rounded-md hover:bg-blue-600',
            cancelButton: 'text-white p-2 rounded-md hover:bg-red-600',
        },
        preConfirm: () => {
            // Validación de los campos
            const nombreCupon = document.getElementById('nombreCupon').value;
            const descripcion = document.getElementById('descripcion').value;
            const descuento = document.getElementById('descuento').value;

            if (!nombreCupon || !descripcion || !descuento || !fechaInicio || !fechaFin) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            // Verificar si el descuento contiene decimales
            if (descuento !== parseInt(descuento).toString()) {
                Swal.showValidationMessage('El descuento debe ser un número entero');
                return false;
            }

            const newCoupon = {
                nombreCupon,
                descripcion,
                descuento
            };

            // Llamar a la función para crear el cupón
            // createCoupon(newCoupon);
        },
    });
};
