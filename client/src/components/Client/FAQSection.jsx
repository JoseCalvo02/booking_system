import React from 'react';

function FAQSection() {
    return (
        <section className="px-4 mt-10 mb-10 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">¿Cómo puedo canjear mis puntos acumulados?</h3>
                    <p className="text-gray-700">Puedes canjear tus puntos acumulados en nuestra tienda mostrando tu correo registrado en nuestro sistema y el administrador vera si tu cupon esta disponible</p>
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">¿Qué tipo de recompensas puedo obtener al canjear mis puntos?</h3>
                    <p className="text-gray-700">Puedes obtener descuentos exclusivos en tratamientos de belleza, productos de cuidado de la piel, sesiones de masajes o servicios adicionales gratuitos al canjear tus puntos acumulados.</p>
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">¿Cómo puedo aplicar un cupón de descuento a mi compra?</h3>
                    <p className="text-gray-700">Puedes aplicar un cupón de descuento durante el proceso de pago en línea ingresando el código del cupón en el campo correspondiente. Si estás en nuestra tienda física, presenta el cupón al momento de realizar tu compra para recibir el descuento.</p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">¿Qué debo hacer si mi cupón de descuento no se aplica correctamente?</h3>
                    <p className="text-gray-700">Si experimentas problemas al aplicar tu cupón de descuento, te recomendamos verificar que el cupón esté vigente y que se cumplan todos los términos y condiciones. Si el problema persiste, no dudes en comunicarte con nuestro equipo de atención al cliente para obtener asistencia adicional.</p>
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
