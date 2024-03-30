import React, { useState } from 'react';
import HorarioModal from '../Modals/HorarioModal';

const Number = '+50689312332'; // Número de WhatsApp al que se enviará el mensaje

export default function ContactUs() {
    const [message, setMessage] = useState(''); // Mensaje que se enviará por WhatsApp

    const handleContact = () => {
        window.open(`https://api.whatsapp.com/send?phone=${Number}&text=${message}`); // Abre WhatsApp con el mensaje y el número de teléfono predefinido
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value); // Actualiza el mensaje con el valor del input del usuario 
    }

    const handleHorario = async () => {
        await HorarioModal();
    }

    return (
        <div className='w-full px-4 text-white bg-gray-900 py-14'>
            <div className='grid w-full mx-auto lg:grid-cols-2'>
                <div className='w-full m-5 lg:w-5/6'>
                    <h1 className='py-2 text-2xl font-bold md:text-4xl sm:text-3xl'>
                        ¿Le gustaría contactarnos directamente?
                    </h1>
                    <p>Envíenos un mensaje directo a nuestro WhatsApp</p>
                </div>
                <div className='w-full p-3 lg:w-5/6 lg:col-span-1'>
                    <div className='flex flex-col justify-between w-full mb-5 sm:flex-row'>
                        <input
                            className='flex w-full h-12 p-3 text-black rounded-md sm:w-3/4 lg:w-5/6'
                            type='text'
                            placeholder='Ingrese su mensaje aquí...'
                            value={message}
                            onChange={handleMessageChange}
                        />
                        <button onClick={handleContact} className='bg-primary hover:bg-primary_h text-white rounded-md font-medium w-full sm:w-auto lg:w-[200px] ml-0 sm:ml-4 px-6 py-3 mt-3 sm:mt-0'>
                            Enviar Mensaje
                        </button>
                    </div>
                    <p>
                        Le responderemos tan pronto como esté disponible un estilista. Recuerde revisar:
                        <button onClick={handleHorario} className='text-primary'>Nuestro Horario</button>
                    </p>
                </div>
            </div>
        </div>
    );
}
