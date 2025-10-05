<script>
import { login } from '../services/auth';

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
        <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5 bg-green-900 border-b-3 border-white">
            <div data-aos="zoom-out" class="contenedor-principal w-full max-w-[80%] rounded-3xl overflow-hidden">
                <div class="md:flex w-full">
                    <!--img-->
                    <div class="hidden md:block w-1/2">
                        <img src="/public/login.jpeg" alt="Imagen de login" class="w-full h-full object-cover" />
                    </div>
                    <div class="h-[82vh] w-full md:w-1/2 py-10 px-5 px-5 lg:px-10 xl:px-30 bg-slate-100 text-[#348534] justify-center flex flex-col">
                        <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase">Iniciar Sesión</h2>
                        <form 
                            action="#"
                            @submit.prevent="loginIntoAcc"
                        >
                            <div>
                                <div class="flex flex-col">

                                    <!--Campo mail-->
                                    <div class="w-full px-3 mb-12">
                                        <label for="email" class="sr-only">Email</label>
                                        <div class="flex">
                                            <input 
                                                id="email" 
                                                type="email"
                                                class="w-full px-3 py-2 rounded-lg border-1 border-[#348534] outline-none focus:border-green-600"
                                                placeholder="Correo electrónico *"
                                                v-model="user.email"
                                            >
                                        </div>
                                    </div>
                                    <!--Campo contraseña-->
                                    <div class="w-full px-3 mb-12">
                                        <label for="password" class="sr-only">Contraseña</label>
                                        <div class="flex">
                                            <input 
                                                id="password" 
                                                type="password" 
                                                class="w-full px-3 py-2 rounded-lg border-1 border-[#348534] outline-none focus:border-green-600"
                                                placeholder="Contraseña *"
                                                v-model="user.password"
                                            >
                                        </div>
                                    </div>

                                </div>

                                <!--Boton registrar-->
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <button 
                                            type="submit"
                                            class="block w-full max-w-xs mx-auto bg-[#348534] hover:bg-green-600 cursor-pointer text-xl 
                                            transition duration-300 ease-in-out text-white rounded-lg px-3 py-3 font-bold uppercase"
                                        >Iniciar Sesión</button>
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