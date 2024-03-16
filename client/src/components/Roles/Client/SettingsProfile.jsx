import React from 'react'


const SettingsProfile = () => {
  return (
    <div class="mx-4 min-h-screen sm:mx-8 xl:mx-auto max-w-full py-14">
        <div class="grid grid-cols-6 pt-3 sm:grid-cols-10">
            <div class="my-4 w-56 sm:hidden">
                <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
                <label for="select-1" class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
            </div>

            <div class="col-span-2 hidden sm:block">
                <ul>
                    <li class="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">Cuenta</li>
                </ul>
            </div>

            <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                <div class="pt-4">
                    <h1 class="py-2 text-2xl font-semibold">Configuracion de cuenta</h1>
                    <p class="font- text-slate-600">Ingrese los datos que desea configurar</p>
                </div>
            <hr class="mt-4 mb-8" />
            <p class="py-2 text-xl font-semibold">Correo electronico</p>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p class="text-gray-600">Su correo electronico es: <strong>mcorderoulate@gmial.com</strong></p>
                <button class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Cambiar Correo</button>
            </div>
            <hr class="mt-4 mb-8" />
            <p class="py-2 text-xl font-semibold">Contraseña</p>
            <div class="flex items-center">
                <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <label for="login-password">
                        <span class="text-sm text-gray-500">Contraseña actual</span>
                        <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                        </div>
                    </label>
                    <label for="login-password">
                        <span class="text-sm text-gray-500">Nueva contraseña</span>
                        <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                        </div>
                    </label>
                </div>
            </div>
            <p class="mt-2">No recuerdas tu contraseña  actual. <a class="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recuperar contraseña</a></p>
            <button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Guardar contraseña</button>
            <hr class="mt-4 mb-8" />

            <div class="mb-10">
                <p class="py-2 text-xl font-semibold">Eliminar cuenta personal</p>
                <p class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                    Proceda con precaucion 
                </p>
                <p class="mt-2">Asegúrese de haber realizado una copia de seguridad de su cuenta en caso de que alguna vez necesite acceder a sus datos. Borraremos completamente sus datos. No hay forma de acceder a su cuenta después de esta acción.</p>
                <button class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue con la eliminacion</button>
            </div>
            </div>
        </div>
    </div>
  );
};

export default SettingsProfile;