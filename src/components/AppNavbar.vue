<script>
import { logout, subscribeToAuthStateChanges } from '../services/auth';
import logo from '../assets/logo.svg';

export default {
    name: 'AppNavbar',
    data() {
        return {
            open: false,
            user: {
                id: null,
                email: null
            },
            logo
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
    <nav class="bg-white py-3">
        <div class="max-w-7xl px-4 mx-auto">
            <div class="flex justify-between items-center">
                <RouterLink to="/" class="brand"><h1 class="hidden">Volunteco</h1></RouterLink>
                <!-- Boton del menu hamburguesa -->
                <button type="button" @click="open = !open" class="p-2 rounded-lg md:hidden text-primary">
                    <!-- Svg del btn del menu -->
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <!-- Menu de navegacion -->
                <div :class="[open ? 'block' : 'hidden', 'navbar absolute md:relative md:block']" id="navbar-default">
                    <ul class="flex flex-col md:flex-row gap-3 md:items-center items-end justify-end">
                        <!--Botones de login y registro-->
                        <template v-if="user.id === null">
                            <li>
                                <RouterLink to="/iniciar-sesion" class="btn btn-primary-outline">Iniciar Sesión</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/registrarse" class="btn btn-primary">Registrarse</RouterLink>
                            </li>
                        </template>

                        <!--Si el usuario esta autenticado, mostrar chat, posteos, nombre(click para entrar al perfil) y cerrar sesion-->
                        <template v-else>
                            <li><RouterLink to="/">Inicio</RouterLink></li>
                            <li>
                                <RouterLink to="/chat" class="block py-3 px-3 text-[#348534] hover:text-green-600 transition duration-300 ease-in-out rounded-sm md:hover:bg-transparent md:hover:text-green-600 md:text-[#348534] md:p-0 hover:bg-green-500">Chat</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/posteos" class="block py-3 px-3 text-[#348534] hover:text-green-600 transition duration-300 ease-in-out rounded-sm md:hover:bg-transparent md:hover:text-green-600 md:text-[#348534] md:p-0 hover:bg-green-500">Posteos</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/mi-perfil" class="block py-3 px-3 text-[#348534] hover:text-green-600 transition duration-300 ease-in-out rounded-sm md:hover:bg-transparent md:hover:text-green-600 md:text-[#348534] md:p-0 hover:bg-green-500">{{ user.email }}</RouterLink>
                            </li>
                            <li>
                                <form action="#" @submit.prevent="handleLogout">
                                    <button type="submit" class="cursor-pointer hover:text-green-300 transition duration-300 ease-in-out">
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
        </div>
    </nav>
</template>
