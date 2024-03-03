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
                <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                    <img className='w-[500px] mx-auto my-4' src={Logo} alt="/" />
                    <div className='flex flex-col justify-center text-justify'>
                        <p className='font-bold text-center uppercase text-primary'>Studio Once Once</p>
                        <h1 className='py-2 mb-5 text-2xl font-bold md:text-4xl sm:text-3xl'>Con mas de 5 años de trayectoria</h1>
                        <p><strong>Visión</strong><br></br>
                        Convertirnos en el destino preferido para el cuidado de manos y pies en nuestra comunidad. Queremos ser reconocidos como líderes en la industria de la estética, conocidos por nuestra excelencia en el servicio al cliente y nuestra dedicación a la innovación y la educación continua. Esperamos crecer y expandirnos, ofreciendo una gama completa de servicios de belleza, siempre manteniendo nuestro compromiso con la calidad y la satisfacción del cliente.
                        </p>
                        <br></br>
                        <br></br>
                        <p><strong>Misión</strong><br></br>
                        Brindar a nuestros clientes una experiencia excepcional en cada uno de nuestros servicios, donde la belleza se encuentra con la relajación. Nos comprometemos a ofrecer servicios de alta calidad, utilizando los productos más seguros y efectivos del mercado, mientras creamos un ambiente cálido y acogedor que fomente la confianza y la comodidad de nuestros clientes
                        </p>
                        <button className='bg-primary hover:bg-primary_h w-[150px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-white'>Comenzemos</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
