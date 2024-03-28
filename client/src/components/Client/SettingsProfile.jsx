import { decodeToken } from '../../../utils/tokenUtils';
import React, { useState, useEffect } from 'react';
import EmailChangeModal from '../Modals/EmailChangeModal';
import AddressChangeModal from '../Modals/AddressChangeModal';
import NameChangeModal from '../Modals/NameChangeModal';
import PhoneChangeModal from '../Modals/PhoneChangeModal';
import DeleteAccountModal from '../Modals/DeleteAccountModal';
import ChangePasswordModal from '../Modals/ChangePasswordModal';

const SettingsProfile = () => {

const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
}); // Define el estado local para almacenar el nombre de usuario // Ejecuta el efecto solo una vez

useEffect(() => {
    loadUserData(); // Lógica para cargar los datos del usuario al montar el componente
}, []);

const loadUserData = () => {
    // Decodificar el token JWT y establecer los datos en el estado local
    const decodedToken = decodeToken(); // Decodificar el token JWT
    setUserData({
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

const handleNameChange = () => {
    NameChangeModal(setUserData);
}

const handlePhoneChange = () => {
    PhoneChangeModal(setUserData);
}

const handleDeleteAccount = () => {
    DeleteAccountModal();
}

const handlePasswordChange = () => {
    ChangePasswordModal();
}


return (
    <div className="max-w-full min-h-screen mx-4 sm:mx-8 xl:mx-auto py-14">
        <div className="grid grid-cols-6 pt-3 sm:grid-cols-10">
            {/* Navbar */}
            <nav className="hidden col-span-2 sm:block">
                <ul>
                    <li className="px-2 py-2 mt-5 font-semibold text-blue-700 transition border-l-2 cursor-pointer border-l-blue-700 hover:border-l-blue-700 hover:text-blue-700">Cuenta</li>
                </ul>
            </nav>

            <section className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                {/* First Section */}
                <div className="pt-4">
                    <h1 className="py-2 text-2xl font-semibold">Configuracion de Cuenta</h1>
                    <p className="font- text-slate-600">Ingrese los datos que desea configurar</p>
                </div>
                <hr className="mt-4 mb-8" />
                {/* Second Section */}
                <div className="overflow-x-auto">
                    <p className="py-2 text-xl font-semibold">Informacion personal</p>
                    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="font-bold bg-blue-500">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-xs tracking-wider text-left text-black uppercase">
                                        Dato Personal
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs tracking-wider text-left text-black uppercase">
                                        Informacion Personal
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs tracking-wider text-left text-black uppercase">
                                        Accion
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">Nombre Usuario</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{userData.name + ' ' + userData.lastName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a onClick={handleNameChange} className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Editar
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">Correo electrónico</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{userData.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a onClick={handleEmailChange} className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Editar
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">Dirección</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{userData.address}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a onClick={handleAddressChange} className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Editar
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2 btn-edit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">Teléfono</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{userData.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a onClick={handlePhoneChange} className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Editar
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Third Section */}
                <p className="py-2 text-xl font-semibold">Contraseña</p>
                <div className="flex items-center">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <label htmlFor="login-password">
                            <span className="text-sm text-gray-500">Contraseña actual</span>
                            <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-blue-600">
                                <input type="password" id="login-password" className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none" />
                            </div>
                        </label>
                        <label htmlFor="login-passwordNew">
                            <span className="text-sm text-gray-500">Nueva contraseña</span>
                            <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-blue-600">
                                <input type="password" id="login-passwordNew" className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none" />
                            </div>
                        </label>
                    </div>
                </div>
                <button onClick={handlePasswordChange} className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg">Guardar contraseña</button>
                <hr className="mt-4 mb-8" />
                {/* Fourth Section */}
                <div className="mb-10">
                    <p className="py-2 text-xl font-semibold">Eliminar cuenta personal</p>
                    <p>Borraremos completamente sus datos. No hay forma de acceder a su cuenta después de esta acción.</p>
                    <button onClick={handleDeleteAccount} className="px-4 py-2 mt-4 text-white bg-red-600 rounded-lg">Eliminar Cuenta</button>
                </div>
            </section>
        </div>
    </div>
);
};

export default SettingsProfile;
