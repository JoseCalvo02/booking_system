import React from 'react'
import Logo from "../../assets/logo.png"
import Video2 from '../../assets/Video2.mp4';

export default function AboutUs() {
    return (
        <section className='relative'>
            <div className='absolute inset-0 z-0'>
                <video autoPlay loop muted className="absolute inset-0 z-0 object-cover w-full h-full opacity-40" src={Video2}></video>
            </div>
            <div className='relative z-10 w-full px-4 py-16 '>
                <div className='max-w-[1840px] mx-auto grid md:grid-cols-2'>
                    {/* Imagen */}
                    <img className='w-[450px] mx-auto my-4' src={Logo} alt="/" />

                    {/* Contenedor de texto */}
                    <div className='flex flex-col justify-center p-6 text-justify bg-opacity-0 border border-white border-opacity-25 shadow-md rounded-2xl backdrop-blur-lg backdrop-filter'>
                        {/* Logo y Nombre */}
                        <div className='flex justify-center w-full gap-1 text-2xl font-bold'>
                            <h1 className="text-white ">Studio</h1>
                            <h1 className="text-primary">Once Once</h1>
                        </div>

                        {/* Texto */}
                        <h1 className='py-2 mb-5 text-2xl font-bold text-center text-primary lg:text-4xl md:text-3xl'>Con mas de 5 años de trayectoria</h1>

                        {/* Vision y Misión */}
                        <div className="text-gray-900">
                            <p className="mb-2">
                                <strong className="block text-center">Visión:</strong>
                                Convertirnos en el destino preferido para el cuidado de manos y pies en nuestra comunidad. Queremos ser reconocidos como líderes en la industria de la estética, conocidos por nuestra excelencia en el servicio al cliente y nuestra dedicación a la innovación y la educación continua. Esperamos crecer y expandirnos, ofreciendo una gama completa de servicios de belleza, siempre manteniendo nuestro compromiso con la calidad y la satisfacción del cliente.
                            </p>
                            <p>
                                <strong className="block text-center">Misión:</strong>
                                Brindar a nuestros clientes una experiencia excepcional en cada uno de nuestros servicios, donde la belleza se encuentra con la relajación. Nos comprometemos a ofrecer servicios de alta calidad, utilizando los productos más seguros y efectivos del mercado, mientras creamos un ambiente cálido y acogedor que fomente la confianza y la comodidad de nuestros clientes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
