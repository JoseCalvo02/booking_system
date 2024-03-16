import React from 'react';

const Profile = () => {
    return (
        <>
             <div className='w-full h-full py-4 pl-4 pr-8 bg-white shadow-custom rounded-xl'>
                <div class="grid grid-cols-6 pt-3 sm:grid-cols-10">

                    <div class="col-span-2 hidden sm:block">
                        <ul>
                            <li class="mt-5 cursor-pointer border-l-2 border-l-primary px-2 py-2 font-semibold text-primary transition hover:border-l-primary hover:text-primary">Cuenta</li>
                            <li class="mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold text-primary transition hover:border-l-primary hover:text-primary">Cuenta</li>
                        </ul>
                    </div>

                    <div class="col-span-8 overflow-hidden rounded-xl sm:px-8 sm:shadow-md">
                        <div class="pt-4">
                            <h1 class="py-2 text-2xl font-semibold">Configuracion de cuenta</h1>
                            <p class="font- text-slate-600">Ingrese los datos que desea configurar</p>
                        </div>
                    <hr class="mt-4 mb-8" />
                    <p class="py-2 text-xl font-semibold">Correo electronico</p>
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p class="text-gray-600">Su correo electronico es: <strong>mcorderoulate@gmial.com</strong></p>
                        <button class="inline-flex text-sm font-semibold text-primary hover:underline decoration-2">Cambiar Correo</button>
                    </div>
                    <hr class="mt-4 mb-8" />
                    <p class="py-2 text-xl font-semibold">Contraseña</p>
                    <div class="flex items-center">
                        <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <label for="login-password">
                                <span class="text-sm text-gray-500">Contraseña actual</span>
                                <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-primary">
                                    <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="********" />
                                </div>
                            </label>
                            <label for="login-password">
                                <span class="text-sm text-gray-500">Nueva contraseña</span>
                                <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-primary">
                                    <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="********" />
                                </div>
                            </label>
                        </div>
                    </div>
                    <p class="mt-2">
                        No recuerdas tu contraseña  actual.
                        <a class="text-sm font-semibold text-primary hover:underline decoration-2" href="#">Recuperar contraseña</a>
                    </p>
                    <button class="mt-4 rounded-lg bg-primary px-4 py-2 text-white">Guardar contraseña</button>
                    <hr class="mt-4 mb-8" />

                    <div class="mb-10">
                        <p class="py-2 text-xl font-semibold">Eliminar cuenta personal</p>
                        <p class="inline-flex items-center rounded-lg bg-rose-100 px-4 py-1 text-rose-600">
                            Proceda con precaucion
                        </p>
                        <p class="mt-2">Asegúrese de haber realizado una copia de seguridad de su cuenta en caso de que alguna vez necesite acceder a sus datos. Borraremos completamente sus datos. No hay forma de acceder a su cuenta después de esta acción.</p>
                        <button class="ml-auto text-sm font-semibold text-rose-600 hover:underline decoration-2">Continue con la eliminacion</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
