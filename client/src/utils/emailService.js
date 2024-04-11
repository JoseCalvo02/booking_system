import { send } from '@emailjs/browser';

// Función para enviar un correo electrónico de bienvenida al usuario
export const sendEmail = (values) => {
    const templateParams = {
        to: values.email,
        subject: `Registro exitoso en Studio Once Once`,
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

// Función para enviar un correo electrónico de restablecimiento de contraseña
export const sendPasswordResetEmail = (email)  => {
    const templateParams = {
        to: email,
        subject: `Restablecimiento de contraseña en Studio Once Once`,
        from_name: 'Studio Once Once',
        message: `¡Hola!
        Hemos recibido una solicitud para restablecer tu contraseña. Si no has solicitado este cambio, ignora este mensaje.

        Para restablecer tu contraseña, haz clic en el siguiente enlace:
        http://localhost:5173/passwordReset

        Si tienes algún problema, por favor contáctanos.

        Atentamente,
        Studio Once Once`,
    }; // Parámetros del correo electrónico
    console.log('Parámetros del correo electrónico:', templateParams);

    send('service_xtz5plq', 'template_cehjg9e', templateParams, '1YD6cQ_zz3QnpYGD7')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        }); // Enviar correo electrónico
};