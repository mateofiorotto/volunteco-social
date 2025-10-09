<script>
import { register } from '../services/auth';
import registerImage from '../assets/register.jpg';

export default {
    name: 'Register',
    components: {},
    data() {
        return {
            user: {
                full_name: '',
                email: '',
                password: '',
                career: '',
                biography: ''
            },
            loading: false,
            registerImage
        }
    },
    methods: {
        async registerAcc() {
            try {

                this.loading = true;

                await register(this.user.email, this.user.password, {
                    full_name: this.user.full_name,
                    biography: this.user.biography,
                    career: this.user.career
                });

                this.$router.push('/mi-perfil').then(() => {

                    window.location.reload();
                });

                
            } catch (error) {
                console.log(error);
                // por manejar error
            }
            this.loading = false;
        }
    }
}
</script>

<template>
    <section class="registrarse bg-primary flex-grow content-center">
        <div class="p-6 md:p-8 mx-auto w-full max-w-7xl">
            <div data-aos="zoom-out"
                 class="contenedor-principal">
                <div class="md:flex w-full rounded-2xl bg-white text-center shadow-lg/50">
                    <!--img-->
                    <div class="hidden lg:block w-1/2">
                        <img :src="registerImage"
                             alt="Hojas de un arbol"
                             class="object-cover h-full rounded-tl-2xl rounded-bl-2xl" />
                    </div>
                    <div
                         class="w-full md:w-1/2 flex flex-col">
                         <div class="w-full max-w-lg p-6 md:p-8 md:pb-10 mx-auto my-auto">
                            <h2 class="font-bold text-3xl mb-5 md:mb-8">Registrate</h2>
                            <form action="#"
                                @submit.prevent="registerAcc">
                                <div class="space-y-4 text-left">
                                    <!--Campo Nombre-->
                                    <div>
                                        <label for="full_name" class="block mb-2">Nombre completo:*</label>
                                        <div class="flex">
                                            <input id="full_name"
                                                type="text"
                                                name="full_name"
                                                placeholder="Ej. José Pérez"
                                                v-model="user.full_name"
                                                required>
                                        </div>
                                    </div>
                                    <!--Campo mail-->
                                    <div >
                                        <label for="email" class="block mb-2">Correo electrónico:*</label>
                                        <div class="flex">
                                            <input id="email"
                                                type="email"
                                                name="email"
                                                placeholder="email@email.com"
                                                v-model="user.email"
                                                required>
                                        </div>
                                    </div>
                                    <!--Campo contraseña-->
                                    <div>
                                        <label for="password" class="block mb-2">Contraseña:*</label>
                                        <div class="flex">
                                            <input id="password"
                                                type="password"
                                                name="password"
                                                placeholder="******"
                                                v-model="user.password"
                                                required>
                                        </div>
                                    </div>
                                    <!--Campo repetir contraseña-->
                                    <div>
                                        <label for="career" class="block mb-2">Profesión:</label>
                                        <div class="flex">
                                            <input id="career"
                                                type="text"
                                                name="career"
                                                placeholder="Ing. agrónomo"
                                                v-model="user.career">
                                        </div>
                                    </div>

                                    <div>
                                        <label for="biography" class="block mb-2">Sobre mí:</label>
                                        <div class="flex">
                                            <textarea id="biography"
                                                    name="biography"
                                                    placeholder="Hace una breve descripción"
                                                    v-model="user.biography" rows="3"></textarea>
                                        </div>
                                    </div>

                                    <!--Boton registrar-->
                                    <div>
                                        <button type="submit"
                                                class="btn-primary btn mx-auto block w-full">
                                            Registrarse
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>