import { send } from '@emailjs/browser';

export const sendEmail = (values) => {
    const templateParams = {
        to_name: values.email,
        from_name: 'Studio Once Once',
        message: `¡Hola ${values.name}!
        Gracias por registrarte en nuestra aplicación. Tu registro ha sido exitoso. ¡Bienvenido!

        Tu informacion de registro es la siguiente:
        Nombre: ${values.name}
        Apellidos: ${values.lastName}
        Teléfono: ${values.phone}
        Correo: ${values.email}
        Dirección: ${values.address}

        Atentamente,
        Studio Once Once`,
    }; // Parámetros del correo electrónico

    send('service_xtz5plq', 'template_gp6sind', templateParams, '1YD6cQ_zz3QnpYGD7')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        }); // Enviar correo electrónico
};