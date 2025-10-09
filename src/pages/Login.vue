<script>
import { login } from '../services/auth';
import loginImage from '../assets/login.jpg';

export default {
    name: 'Login',
    components: {},
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            loading: false,
            loginImage
        }
    },
    methods: {
        async loginIntoAcc() {
            try {
                this.loading = true;

                await login(this.user.email, this.user.password);

                this.$router.push('/mi-perfil').then(() => {
                    window.location.reload();
                });
            } catch (error) {
                console.log("[Login.vue loginIntoAcc] Error al iniciar sesion: ", error);
            }
            this.loading = false;
        }
    }
}
</script>

<template>
    <section class="iniciar-sesion bg-primary flex-grow content-center">
        <div class="p-6 md:p-8 mx-auto w-full max-w-7xl">
            <div data-aos="zoom-out"
                 class="contenedor-principal">
                <div class="md:flex w-full rounded-2xl bg-white text-center shadow-lg/50">
                    <!--img-->
                    <div class="hidden md:block w-1/2">
                        <img :src="loginImage"
                             alt="Paisaje de pradera"
                             class="object-cover h-full rounded-tl-2xl rounded-bl-2xl" />
                    </div>
                    <div class="w-full md:w-1/2 flex flex-col">
                        <div class="w-full max-w-xs p-6 md:p-8 mx-auto my-auto">
                            <h2 class="font-bold text-3xl mb-5 md:mb-8">Iniciar sesión</h2>
                            <form action="#"
                                  @submit.prevent="loginIntoAcc">
                                <div class="space-y-5 text-left">
                                    <!--Campo mail-->
                                    <div>
                                        <label for="email"
                                               class="block mb-2">Correo electrónico</label>
                                        <div class="flex">
                                            <input id="email"
                                                   type="email"
                                                   name="email"
                                                   placeholder="usuario@email.com"
                                                   required
                                                   v-model="user.email">
                                        </div>
                                    </div>
                                    <!--Campo contraseña-->
                                    <div>
                                        <label for="password"
                                               class="block mb-2">Contraseña</label>
                                        <div class="flex">
                                            <input id="password"
                                                   name="password"
                                                   type="password"
                                                   placeholder="******"
                                                   required
                                                   v-model="user.password">
                                        </div>
                                    </div>

                                    <!--Boton registrar-->
                                    <div>
                                        <button type="submit"
                                                class="btn-primary btn mx-auto block w-full">
                                            Iniciar sesión
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div class="pt-3">
                                <p class="text-sm">Si aún no estás registrado podes hacerlo desde <RouterLink
                                                to="/registrarse"
                                                class="underline text-primary">aquí</RouterLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>