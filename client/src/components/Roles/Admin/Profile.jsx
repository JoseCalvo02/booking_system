import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
//Modals
import EmailChangeModal from '../../Modals/EmailChangeModal';
import AddressChangeModal from '../../Modals/AddressChangeModal';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    }); // Define el estado local para almacenar el nombre de usuario

    useEffect(() => {
        // Decodificar el token JWT para obtener la información del usuario, como el nombre
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        setUserData({
            name: decodedToken.name,
            lastName: decodedToken.lastName,
            email: decodedToken.email,
            phone: decodedToken.phone,
            address: decodedToken.address
        }); // Establecer el nombre de usuario en el estado local
    }, []);

    const handleEmailChange = () => {
        EmailChangeModal();
    };

    const handleAddressChange = () => {
        AddressChangeModal();
    };

    return (
        <div className='grid w-full grid-cols-6 py-8 pl-4 pr-8 overflow-y-auto bg-white shadow-custom rounded-xl sm:grid-cols-10'>
            {/* Side options */}
            <aside className="hidden col-span-2 sm:block">
                <ul>
                    <li className="px-2 py-2 mt-5 font-semibold transition border-l-2 cursor-pointer border-l-primary text-primary hover:text-primary">Cuenta</li>
                </ul>
            </aside>

            {/* Main content */}
            <main className="col-span-8 overflow-auto sm:border-l sm:px-8">
                {/* Fisrt section */}
                <div className="py-4 mb-6 border-b border-gray-200">
                    <h1 className="py-2 text-2xl font-semibold">Configuracion de cuenta</h1>
                    <p className="font- text-slate-600">Ingrese los datos que desea configurar</p>
                </div>
                {/* Second section */}
                <div className='py-4 mb-6 border-b border-gray-200'>
                    <h2 className="py-2 text-xl font-semibold">Datos personales</h2>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-gray-600">
                            <strong>Nombre:</strong>
                            <span className='ml-1'>{userData.name} {userData.lastName}</span>
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-gray-600">
                            <strong>Email:</strong>
                            <span className='ml-1'>{userData.email}</span>
                        </p>
                        <button className="inline-flex text-sm font-semibold text-primary hover:underline decoration-2" onClick={handleEmailChange}>Cambiar Correo</button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-gray-600">
                            <strong>Dirección:</strong>
                            <span className='ml-1'>{userData.address}</span>
                        </p>
                        <button className="inline-flex text-sm font-semibold text-primary hover:underline decoration-2" onClick={handleAddressChange}>Cambiar Dirección</button>
                    </div>
                </div>

                {/* Third section */}
                <div className='py-4 mb-6 border-b border-gray-200'>
                    <p className="py-2 text-xl font-semibold">Contraseña</p>
                    <div className="flex items-center">
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <label htmlFor="login-password">
                                <span className="text-sm text-gray-600">Contraseña actual</span>
                                <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-primary">
                                    <input type="password" id="login-password" className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none" placeholder="••••••••••" />
                                </div>
                            </label>
                            <label htmlFor="login-password">
                                <span className="text-sm text-gray-600">Nueva contraseña</span>
                                <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-primary">
                                    <input type="password" id="login-password" className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none" placeholder="••••••••••" />
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className='flex gap-1 mt-2 text-sm'>
                        <span> No recuerdas tu contraseña actual.</span>
                        <button className="font-semibold text-primary hover:underline decoration-2" href="#">Recuperar contraseña</button>
                    </div>
                    <button className="px-4 py-2 mt-4 text-white rounded-lg bg-primary hover:bg-primary_h">Guardar contraseña</button>
                </div>

                {/* Fourth section */}
                <div className="mb-10">
                    <p className="py-2 text-xl font-semibold">Eliminar cuenta personal</p>
                    <p className="inline-flex items-center px-4 py-1 rounded-lg bg-rose-100 text-rose-600">Proceda con precaución</p>
                    <p className="mt-2">
                        Asegúrese de haber realizado una copia de seguridad de su cuenta en caso de que alguna vez necesite acceder a sus datos. Borraremos completamente sus datos. No hay forma de acceder a su cuenta después de esta acción.
                    </p>
                    <button className="ml-auto text-sm font-semibold text-rose-600 hover:underline decoration-2">Continue con la eliminación</button>
                </div>
            </main>
        </div>
    );
}

export default Profile;
