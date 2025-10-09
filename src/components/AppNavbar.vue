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
    },
    computed: {
        routeName() {
            return this.$route?.name || 'Sin nombre';
        }
    }
}
</script>

<template>
    <nav class="bg-white py-3">
        <div class="max-w-7xl px-4 mx-auto">
            <div class="flex justify-between items-center">
                <RouterLink to="/"
                            class="brand">
                    <h1 class="sr-only">Volunteco | {{ routeName }}</h1>
                </RouterLink>
                <!-- Boton del menu hamburguesa -->
                <button type="button"
                        @click="open = !open"
                        class="p-2 rounded-lg md:hidden text-primary"
                        aria-label="Abrir menu de navegación"
                        aria-expanded="false"
                        aria-controls="navbar-default">
                    <!-- Svg del btn del menu -->
                    <svg class="w-5 h-5"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <!-- Menu de navegacion -->
                <div :class="[open ? 'block' : 'hidden', 'navbar absolute md:relative md:block border-b-1 border-primary md:border-b-0']"
                     id="navbar-default">
                    <ul class="flex flex-col md:flex-row gap-4 md:items-center items-end justify-end"
                    @click="open = false">
                        <!--Botones de login y registro-->
                        <template v-if="user.id === null">
                            <li>
                                <RouterLink to="/iniciar-sesion"
                                            class="btn btn-primary-outline text-sm">Iniciar sesión</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/registrarse"
                                            class="btn btn-primary text-sm">Registrarse</RouterLink>
                            </li>
                        </template>

                        <!--Si el usuario esta autenticado, mostrar chat, posteos, nombre(click para entrar al perfil) y cerrar sesion-->
                        <template v-else>
                            <li>
                                <RouterLink to="/"
                                            :class="routeName === 'Inicio' ? 'text-secondary' : 'text-primary'">
                                    Inicio</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/chat"
                                            :class="routeName === 'Chat' ? 'text-secondary' : 'text-primary'">
                                    Chat</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/posteos"
                                            :class="routeName === 'Posteos' ? 'text-secondary' : 'text-primary'">
                                    Publicaciones</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/mi-perfil"
                                            :class="routeName === 'Mi perfil' ? 'text-secondary' : 'text-primary'">
                                    {{ user.full_name }}</RouterLink>
                            </li>
                            <li>
                                <form action="#"
                                      @submit.prevent="handleLogout">
                                    <button type="submit"
                                            class="btn btn-primary-outline text-sm">
                                            Logout
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
