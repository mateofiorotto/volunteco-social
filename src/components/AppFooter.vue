<script>
import { subscribeToAuthStateChanges } from '../services/auth';
import logo from '../assets/logo-white.svg';

export default {
    name: 'AppFooter',
    data() {
        return {
            user: {
                id: null,
                email: null
            },
            logo
        }
    },
    mounted() {
        subscribeToAuthStateChanges(newUserState => this.user = newUserState);
    }
}

</script>

<template>
    <footer class="bg-primary text-white py-6 border-t border-white">
        <div class="px-4 mx-auto max-w-7xl">
            <div class="flex md:flex-row gap-6 flex-col items-center justify-between">
                <RouterLink to="/"><img :src="logo"
                         width="387"
                         height="80"
                         class="h-auto w-50"
                         alt="Logo Volunteco" /></RouterLink>
                <ul class="flex flex-col md:flex-row items-center justify-center gap-5">
                    <template v-if="user.id != null">
                        <li>
                            <RouterLink to="/"
                                        class="hover:text-light">Inicio</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/chat"
                                        class="hover:text-light">Chat</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/posteos"
                                        class="hover:text-light">Mensajes</RouterLink>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <RouterLink to="/iniciar-sesion"
                                        class="hover:text-light">Iniciar sesión</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/registrarse"
                                        class="hover:text-light">Registrarse</RouterLink>
                        </li>
                    </template>
                </ul>
            </div>
            <div
                 class="flex flex-col md:flex-row gap-3 text-center md:text-left justify-center md:justify-between border-t mt-5 pt-5 items-center">
                <p>Cuidemos al medioambiente.<br />Herminia Bento y Mateo Fiorotto.</p>
                <ul class="redes flex flex-row justify-center gap-7 text-3xl">
                    <li class="red-social">
                        <a href="https://www.instagram.com/volunteco"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="hover:text-light">
                            <i class="fa-brands fa-instagram">
                                <span class="sr-only">icono de Instagram</span>
                            </i>
                        </a>
                    </li>
                    <li class="red-social">
                        <a href="https://www.facebook.com/volunteco"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="hover:text-light">
                            <i class="fa-brands fa-facebook">
                                <span class="sr-only">icono de Facebook</span>
                            </i>
                        </a>
                    </li>
                    <li class="red-social">
                        <a href="https://twitter.com/volunteco"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="hover:text-light">
                            <i class="fa-brands fa-x-twitter">
                                <span class="sr-only">icono de Twitter</span>
                            </i>
                        </a>
                    </li>
                    <li class="red-social">
                        <a href="https://github.com/mateofiorotto/volunteco-social"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="hover:text-light">
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
