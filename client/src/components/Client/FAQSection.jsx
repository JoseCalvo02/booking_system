import React from 'react';

function FAQSection() {
    return (
        <section className="px-4 mt-10 mb-10 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2">
                <div className="p-6 bg-gray-200 border border-gray-200 rounded-lg shadow-xl">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">¿Cómo puedo canjear mis puntos acumulados?</h3>
                    <p className="text-gray-700">Puedes canjear tus puntos acumulados en nuestra tienda mostrando tu correo registrado en nuestro sistema y el administrador vera si tu cupon esta disponible</p>
                </div>
                <div className="p-6 bg-gray-200 border border-gray-200 rounded-lg shadow-xl">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">¿Qué tipo de recompensas puedo obtener al canjear mis puntos?</h3>
                    <p className="text-gray-700">Puedes obtener descuentos exclusivos en tratamientos de belleza, productos de cuidado de la piel, sesiones de masajes o servicios adicionales gratuitos al canjear tus puntos acumulados.</p>
                </div>
                <div className="p-6 bg-gray-200 border border-gray-200 rounded-lg shadow-xl">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">¿Cómo puedo aplicar un cupón de descuento a mi compra?</h3>
                    <p className="text-gray-700">Puedes aplicar un cupón de descuento durante el proceso de pago. Si estás en nuestra tienda física, presenta tu correo para que el administrador revise si tienes un cupon listo para aplicar.</p>
                </div>

                <div className="p-6 bg-gray-200 border border-gray-200 rounded-lg shadow-xl">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">¿Mis cupones tiene fecha de venciento?</h3>
                    <p className="text-gray-700">Los cupones de nuestra tienda tienen como fecha maxima para ser canjeados por el cliente hasta el 31 de diciembre del año actual.</p>
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
