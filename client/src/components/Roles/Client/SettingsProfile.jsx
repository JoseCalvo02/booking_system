import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';

const SettingsProfile = () => {

    const [userData, setUserData] = useState({
        nombre: '',
        correo: '',
        direccion: '',
        telefono: '',
    }); // Define el estado local para almacenar el nombre de usuario

    useEffect(() => {
        // Obtiene el token de acceso del almacenamiento local
        const token = localStorage.getItem('token');
        // Decodifica el token para obtener la información del usuario
        const decodedToken = jwtDecode(token);
        // Establece el estado local con la información del usuario
        setUserData({
            nombre: decodedToken.name,
            correo: decodedToken.email,
            direccion: decodedToken.address,
            telefono: decodedToken.phone
        });
    }
    , []); // Ejecuta el efecto solo una vez

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
                <p className="py-2 text-xl font-semibold">Informacion</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-gray-600"><strong>Nombre Usuario: </strong>{userData.nombre}</p>
                    <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Cambiar Nombre</button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-gray-600"><strong>Correo: </strong>{userData.correo}</p>
                    <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Cambiar Correo</button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-gray-600"><strong>Direccion: </strong>{userData.direccion}</p>
                    <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Cambiar Direccion</button>
                </div>
                <hr className="mt-4 mb-8" />
                {/* Third Section */}
                <p className="py-2 text-xl font-semibold">Contraseña</p>
                <div className="flex items-center">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <label htmlFor="login-password">
                            <span className="text-sm text-gray-500">Contraseña actual</span>
                            <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-blue-600">
                            <input type="password" id="login-password" className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none" placeholder="***********" />
                            </div>
                        </label>
                        <label htmlFor="login-passwordNew">
                            <span className="text-sm text-gray-500">Nueva contraseña</span>
                            <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-blue-600">
                            <input type="password" id="login-passwordNew" className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none" placeholder="***********" />
                            </div>
                        </label>
                    </div>
                </div>
                <p className="mt-2">No recuerdas tu contraseña  actual. <a className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recuperar contraseña</a></p>
                <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg">Guardar contraseña</button>
                <hr className="mt-4 mb-8" />
                {/* Fourth Section */}
                <div className="mb-10">
                    <p className="py-2 text-xl font-semibold">Eliminar cuenta personal</p>
                    <p className="inline-flex items-center px-4 py-1 rounded-full bg-rose-100 text-rose-600">
                        Proceda con precaucion
                    </p>
                    <p className="mt-2">Asegúrese de haber realizado una copia de seguridad de su cuenta en caso de que alguna vez necesite acceder a sus datos. Borraremos completamente sus datos. No hay forma de acceder a su cuenta después de esta acción.</p>
                    <button className="ml-auto text-sm font-semibold underline text-rose-600 decoration-2">Continue con la eliminacion</button>
                </div>
            </section>
        </div>
    </div>
  );
};

export default SettingsProfile;