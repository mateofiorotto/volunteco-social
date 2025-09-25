<script>
import { logout, subscribeToAuthStateChanges } from '../services/auth';

export default {
    name: 'AppNavbar',
    data() {
        return {
            open: false,

            user: {
                id: null,
                email: null
            }
        }
    },
    methods: {
        handleLogout() {
            logout();
            this.$router.push('/iniciar-sesion');
        }
    },
    mounted() {
        subscribeToAuthStateChanges(newUserState => this.user = newUserState);
    }
}
</script>

<template>
    <nav class="bg-white border-b-[#348534] border-b-3 p-4">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <RouterLink to="/" class="flex items-center space-x-3">
                <img src="../../public/logo-2.png" class="h-16" alt="Logo Volunteco" />
                <p class="text-4xl text-[#348534] font-semibold whitespace-nowrap">Volunteco</p>
            </RouterLink>
            <!-- Boton del menu hamburguesa -->
            <button type="button" @click="open = !open"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-[#348534] rounded-lg md:hidden hover:bg-[#348534] 
                focus:outline-none focus:ring-2 focus:ring-[#348534] hover:text-white transition duration-300 ease-in-out" aria-controls="navbar-default"
                aria-expanded="false">
                <!-- Svg del btn del menu -->
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
            <!-- Menu de navegacion -->
            <div :class="[open ? 'block' : 'hidden', 'w-full md:block md:w-auto']" id="navbar-default">
                <ul class="font-medium text-xl flex flex-col p-4 mt-4 text-[#348534] rounded-lg 
                    md:flex-row md:space-x-8 md:mt-0 text-center items-center">
                    <li>
                        <RouterLink to="/"
                            class="block py-3 px-3 text-[#348534] hover:text-green-600 transition duration-300 ease-in-out rounded-sm 
                            md:hover:bg-transparent md:hover:text-green-600 md:text-[#348534] md:p-0 text-[#348534] hover:bg-green-500 hover:text-white"
                            aria-current="page">Inicio</RouterLink>
                    </li>

                    <!--Botones de login y registro-->
                   <template v-if="user.id === null">
                    <li
                        class="border-2 rounded hover:border-green-600 transition duration-300 ease-in-out mt-2 md:mt-0">
                        <RouterLink to="/iniciar-sesion"
                            class="w-[100%] px-4 py-2 block text-[#348534] hover:text-green-600 transition duration-300 ease-in-out  text-[#348534]"
                            aria-current="page">
                            Iniciar Sesión</RouterLink>
                    </li>
                    <li
                        class="bg-[#348534] rounded hover:bg-green-600 transition duration-300 ease-in-out mt-5 md:mt-0">
                        <RouterLink to="/registrarse" class="w-[100%] px-4 py-2 block text-white font-bold"
                            aria-current="page">
                            Registrarse</RouterLink>
                    </li>
                    </template>
                    <!--Si el usuario esta autenticado, mostrar chat, posteos, nombre(click para entrar al perfil) y cerrar sesion-->
                    <template v-else>
                    <li>
                        <RouterLink to="/chat"
                            class="block py-3 px-3 text-[#348534] hover:text-green-600 transition duration-300 ease-in-out rounded-sm 
                            md:hover:bg-transparent md:hover:text-green-600 md:text-[#348534] md:p-0 text-[#348534] hover:bg-green-500 hover:text-white"
                            aria-current="page">Chat</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/posteos"
                            class="block py-3 px-3 text-[#348534] hover:text-green-600 transition duration-300 ease-in-out rounded-sm 
                            md:hover:bg-transparent md:hover:text-green-600 md:text-[#348534] md:p-0 text-[#348534] hover:bg-green-500 hover:text-white"
                            aria-current="page">Posteos</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/mi-perfil"
                            class="block py-3 px-3 text-[#348534] hover:text-green-600 transition duration-300 ease-in-out rounded-sm 
                            md:hover:bg-transparent md:hover:text-green-600 md:text-[#348534] md:p-0 text-[#348534] hover:bg-green-500 hover:text-white"
                            aria-current="page">{{ user.email }}asd</RouterLink>
                    </li>
                    <li>
                        <form action="#" @submit.prevent="handleLogout">
                            <button type="submit"
                                class="cursor-pointer hover:text-green-300 transition duration-300 ease-in-out">
                                <i class="fa fa-sign-out">
                                    <span class="sr-only">icono de logout</span>
                                </i>
                            </button>
                        </form>
                    </li>
                    </template>

                </ul>
            </div>
        </div>
    </nav>



</template>
