<script>
import { register } from '../services/auth';

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
            loading: false
        }
    },
    methods: {
        async handleSubmit() {
            try {

                this.loading = true;

                await register(this.user.email, this.user.password, {
                    full_name: this.user.full_name,
                    biography: this.user.biography,
                    career: this.user.career
                });

                this.$router.push('/mi-perfil');
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
    <section class="registrarse overflow-hidden">
        <div
            class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5 bg-green-900 border-b-3 border-white">
            <div data-aos="zoom-out" class="contenedor-principal w-full max-w-[80%] rounded-3xl overflow-hidden">
                <div class="md:flex w-full">
                    <!--img-->
                    <div class="hidden lg:block w-1/2">
                        <img src="/public/register.jpeg" alt="Imagen de registro" class="w-full h-full object-cover" />
                    </div>
                    <div
                        class="w-full lg:w-1/2 py-10 lg:px-10 px-5 md:px-15 bg-slate-100 text-[#348534] justify-center flex flex-col">
                        <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase">Registrate</h2>
                        <form @submit.prevent="handleSubmit">
                            <div>
                                <div class="flex flex-wrap">
                                    
                                    <!--Campo Nombre-->
                                    <div class="w-1/2 px-3 mb-12">
                                        <label for="full_name" class="sr-only">Nombre Completo</label>
                                        <div class="flex">
                                            <input id="full_name" type="text" name="nombre_completo"
                                                class="w-full px-3 py-2 rounded-lg border-1 border-[#348534] outline-none focus:border-green-600"
                                                placeholder="Nombre Completo *" v-model="user.full_name">

                                        </div>
                                    </div>
                                    <!--Campo mail-->
                                    <div class="w-1/2 px-3 mb-12">
                                        <label for="email" class="sr-only">Email</label>
                                        <div class="flex">
                                            <input id="email" type="email"
                                                class="w-full px-3 py-2 rounded-lg border-1 border-[#348534] outline-none focus:border-green-600"
                                                placeholder="Correo electrónico *" v-model="user.email">
                                        </div>
                                    </div>
                                    <!--Campo contraseña-->
                                    <div class="w-1/2 px-3 mb-12">
                                        <label for="password" class="sr-only">Contraseña</label>
                                        <div class="flex">
                                            <input id="password" type="password"
                                                class="w-full px-3 py-2 rounded-lg border-1 border-[#348534] outline-none focus:border-green-600"
                                                placeholder="Contraseña *" v-model="user.password">
                                        </div>
                                    </div>
                                    <!--Campo repetir contraseña-->
                                    <div class="w-1/2 px-3 mb-12">
                                        <label for="career" class="sr-only">Carrera</label>
                                        <div class="flex">
                                            <input id="career" type="text"
                                                class="w-full px-3 py-2 rounded-lg border-1 border-[#348534] outline-none focus:border-green-600"
                                                placeholder="Carrera" v-model="user.career">
                                        </div>
                                    </div>

                                    <div class="w-full px-3 mb-12">
                                        <label for="biography" class="sr-only">Biografia</label>
                                        <div class="flex">
                                            <textarea id="biography" type="text"
                                                class="resize-none w-full px-3 py-2 rounded-lg border-1 border-[#348534] outline-none focus:border-green-600"
                                                placeholder="Biografia" v-model="user.biography"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <!--Boton registrar-->
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <button type="submit"
                                            class="block w-full max-w-xs mx-auto bg-[#348534] hover:bg-green-600 cursor-pointer text-xl 
                                        transition duration-300 ease-in-out text-white rounded-lg px-3 py-3 font-bold uppercase">
                                            Registrarse</button>
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

<style>
/**placeholders */
input::placeholder {
    color: #348534;
}

/**sombra */
.contenedor-principal {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.65);
}
</style>