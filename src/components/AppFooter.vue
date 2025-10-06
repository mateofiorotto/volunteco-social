<script>
import { subscribeToAuthStateChanges } from '../services/auth';

export default {
    name: 'AppFooter',
    data() {
        return {
            user: {
                id: null,
                email: null
            }
        }
    },
    mounted() {
        subscribeToAuthStateChanges(newUserState => this.user = newUserState);
    }
}

</script>

<template>
    <footer class="bg-[#348534] shadow-sm text-white p-10 pb-2">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <RouterLink to="/"
                            class="flex flex-col items-center justify-center mb-4 sm:mb-0 sm:flex-row sm:space-x-3">
                    <img src="../../public/logo.png"
                         class="h-20"
                         alt="Logo Volunteco" />
                    <p class="text-4xl font-semibold whitespace-nowrap">Volunteco</p>
                </RouterLink>
                <ul
                    class="flex flex-wrap items-center justify-center mt-9 mb-9 text-xl sm:text-lg font-medium sm:mt-0 sm:mb-0">
                    <li>
                        <RouterLink to="/"
                                    href="#"
                                    class="hover:underline me-4 md:me-6">Inicio</RouterLink>
                    </li>
                    <template v-if="user.id != null">
                        <li>
                            <RouterLink to="/chat"
                                        href="#"
                                        class="hover:underline me-4 md:me-6">Chat</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/posteos"
                                        href="#"
                                        class="hover:underline me-4 md:me-6">Posteos</RouterLink>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <RouterLink to="/iniciar-sesion"
                                        href="#"
                                        class="hover:underline me-4 md:me-6">Iniciar Sesión</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/registrarse"
                                        href="#"
                                        class="hover:underline me-4 md:me-6">Registrarse</RouterLink>
                        </li>
                    </template>
                </ul>
            </div>
            <div
                 class="flex flex-col md:flex-row justify-center md:justify-between border-t mt-5 mb-5 md:mb-0 pt-0 md:pt-7">
                <p class="text-xl text-center md:text-left py-10 md:py-0 pb-7">Cuidemos al medioambiente. Bento Herminia
                    y Fiorotto
                    Mateo.</p>
                <ul class="redes flex flex-row justify-center gap-7 text-3xl">
                    <li class="red-social">
                        <a href="https://www.instagram.com/volunteco"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="cursor-pointer hover:text-green-300 transition duration-300 ease-in-out">
                            <i class="fa-brands fa-instagram">
                                <span class="sr-only">icono de Instagram</span>
                            </i>
                        </a>
                    </li>
                    <li class="red-social">
                        <a href="https://www.facebook.com/volunteco"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="cursor-pointer hover:text-green-300 transition duration-300 ease-in-out">
                            <i class="fa-brands fa-facebook">
                                <span class="sr-only">icono de Facebook</span>
                            </i>
                        </a>
                    </li>
                    <li class="red-social">
                        <a href="https://twitter.com/volunteco"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="cursor-pointer hover:text-green-300 transition duration-300 ease-in-out">
                            <i class="fa-brands fa-x-twitter">
                                <span class="sr-only">icono de Twitter</span>
                            </i>
                        </a>
                    </li>
                    <li class="red-social">
                        <a href="https://github.com/mateofiorotto/volunteco-social"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="cursor-pointer hover:text-green-300 transition duration-300 ease-in-out">
                            <i class="fa-brands fa-github">
                                <span class="sr-only">icono de Github</span>
                            </i>
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    </footer>
</template>
