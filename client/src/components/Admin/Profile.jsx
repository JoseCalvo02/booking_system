import React, { useState, useEffect } from 'react';
import { decodeToken } from '../../utils/tokenUtils';
//Modals
import EmailChangeModal from '../Modals/EmailChangeModal';
import AddressChangeModal from '../Modals/AddressChangeModal';
import ChangePasswordModal from '../Modals/ChangePasswordModal';

const Profile = () => {
    const [userData, setUserData] = useState({
        userId: '',
        name: '',
        lastName: '',
        email: '',
        address: '',
        phone: '',
    }); // Define el estado local para almacenar el nombre de usuario

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: ''
    }); // Define el estado local para almacenar la contraseña actual y la nueva contraseña

    useEffect(() => {
        loadUserData(); // Lógica para cargar los datos del usuario al montar el componente
    }, []);

    const loadUserData = () => {
        // Decodificar el token JWT y establecer los datos en el estado local
        const decodedToken = decodeToken(); // Decodificar el token JWT
        setUserData({
            userId: decodedToken.userId,
            name: decodedToken.name,
            lastName: decodedToken.lastName,
            email: decodedToken.email,
            phone: decodedToken.phone,
            address: decodedToken.address
        }); // Establecer los datos del usuario en el estado local
    };

    const handleEmailChange = () => {
        EmailChangeModal(setUserData);
    };

    const handleAddressChange = () => {
        AddressChangeModal(setUserData);
    };

    const handlePasswordChange = () => {
        ChangePasswordModal({
            userId: userData.userId,
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
        });
    };

    const handleCurrentPasswordChange = (event) => {
        setPasswordData(prevState => ({
            ...prevState,
            currentPassword: event.target.value
        }));
    }; // funcion para cambiar la contraseña de un usuario

    const handleNewPasswordChange = (event) => {
        setPasswordData(prevState => ({
            ...prevState,
            newPassword: event.target.value
        }));
    }; // funcion para cambiar la contraseña de un usuario


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
                <p className="py-2 mt-4 text-xl font-semibold">Contraseña</p>
                    <p className="pb-2 text-red-600 underline">Por favor, ingresa tu contraseña actual y luego la nueva contraseña que deseas establecer</p>
                    <div className="flex items-center">
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <label htmlFor="login-password">
                                <span className="text-sm text-gray-500">Contraseña actual</span>
                                <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-blue-600">
                                    <input type="password" id="login-password" value={passwordData.currentPassword} onChange={handleCurrentPasswordChange} className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none" />
                                </div>
                            </label>
                            <label htmlFor="login-passwordNew">
                                <span className="text-sm text-gray-500">Nueva contraseña</span>
                                <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-blue-600">
                                    <input type="password" id="login-passwordNew" value={passwordData.newPassword} onChange={handleNewPasswordChange} className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none" />
                                </div>
                            </label>
                        </div>
                    </div>
                    <button onClick={handlePasswordChange} className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg">Cambiar contraseña</button>
                    <hr className="mt-4 mb-8" />
            </main>
        </div>
    );
}

export default Profile;
