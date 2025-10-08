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

                this.$router.push('/mi-perfil');
            } catch (error) {
                console.log(error)
                // por hacer
            }
            this.loading = false;
        }
    }
}
</script>

<template>
    <section class="iniciar-sesion overflow-hidden">
        <div
             class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5 bg-primary border-b-3 border-white">
            <div data-aos="zoom-out"
                 class="contenedor-principal w-full max-w-[80%] rounded-3xl overflow-hidden">
                <div class="md:flex w-full">
                    <!--img-->
                    <div class="hidden md:block w-1/2">
                        <img :src="loginImage"
                             alt="Imagen de login"
                             class="w-full h-full object-cover" />
                    </div>
                    <div
                         class="h-[82vh] w-full md:w-1/2 py-10 px-5 lg:px-10 xl:px-30 bg-slate-100 text-primary justify-center flex flex-col">
                        <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase">Iniciar Sesión</h2>
                        <form action="#"
                              @submit.prevent="loginIntoAcc">
                            <div>
                                <div class="flex flex-col">

                                    <!--Campo mail-->
                                    <div class="w-full px-3 mb-12">
                                        <label for="email"
                                               class="sr-only">Email</label>
                                        <div class="flex">
                                            <input id="email"
                                                   type="email"
                                                   name="email"
                                                   class="w-full px-3 py-2 rounded-lg border-1 border-primary outline-none focus:border-green-600"
                                                   placeholder="Correo electrónico *"
                                                   required
                                                   v-model="user.email">
                                        </div>
                                    </div>
                                    <!--Campo contraseña-->
                                    <div class="w-full px-3 mb-12">
                                        <label for="password"
                                               class="sr-only">Contraseña</label>
                                        <div class="flex">
                                            <input id="password"
                                                   name="password"
                                                   type="password"
                                                   class="w-full px-3 py-2 rounded-lg border-1 border-primary outline-none focus:border-green-600"
                                                   placeholder="Contraseña *"
                                                   required
                                                   v-model="user.password">
                                        </div>
                                    </div>

                                </div>

                                <!--Boton registrar-->
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <button type="submit"
                                                class="font-bold text-lg block w-full max-w-xs mx-auto btn-primary btn">
                                            Iniciar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>