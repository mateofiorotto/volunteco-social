<script>
import MainLoader from '../components/MainLoader.vue';
import { subscribeToAuthStateChanges, updateAuthenticatedUser, changePassword } from '../services/auth';
import Swal from 'sweetalert2';

let unsubscribeAuth = () => { };

export default {
    name: 'EditMyProfile',
    components: { MainLoader },
    data() {
        return {
            updateFormData: {},
            user: {
                //estos datos solo se podran cambiar (mail y contra no por ahora no)
                full_name: null,
                biography: null,
                career: null
            },
            loading: true
        }
    },
    methods: {
        async editProfile() {
            try {

                await updateAuthenticatedUser({
                    full_name: this.updateFormData.full_name,
                    biography: this.updateFormData.biography,
                    career: this.updateFormData.career
                });

                if (this.updateFormData.password != '') {
                    await changePassword(this.updateFormData.password);
                }

                //si el perfil se edito correctamente mandar a perfil
                Swal.fire({
                    icon: 'success',
                    title: 'Perfil editado correctamente',
                    showConfirmButton: true,
                    timer: 3000,
                    confirmButtonColor: '#348534',
                }).then(() => {
                    this.$router.push('/mi-perfil');
                });
            } catch (error) {
                console.error("[EditMyProfile.vue sendMessage] Error al editar perfil: ", error);

            }
        }
    },
    mounted() {
        //cargar datos al form

        let initialized = false;

        unsubscribeAuth = subscribeToAuthStateChanges(newUserStatus => {
            if (!initialized) {
                this.updateFormData = {
                    full_name: newUserStatus.full_name,
                    biography: newUserStatus.biography,
                    career: newUserStatus.career,
                    password: ''
                }
            }
        });

        initialized = true;
        this.loading = false;
    },
    unmounted() {
        unsubscribeAuth();
    }
}
</script>

<template>
    <section class="overflow-hidden px-10 lg:px-30 pt-10 pb-30 mi-perfil">
        <template v-if="loading">
            <div class="flex w-full my-40 justify-center items-center">
                <MainLoader />
            </div>
        </template>
        <template v-else>
            <div data-aos="fade">
                <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase text-primary">Actualizar perfil</h2>

                <form action="#"
                      @submit.prevent="editProfile">
                    <label class="text-lg font-bold"
                           for="full_name">Nombre<span class="ml-2 text-orange-500">*</span></label>
                    <input class="py-3 my-3"
                           type="text"
                           placeholder="Nombre *"
                           v-model="updateFormData.full_name"
                           name="full_name"
                           id="full_name"
                           required>

                    <label class="text-lg font-bold"
                           for="biography">Biografia</label>
                    <input class="py-3 my-3"
                           type="text"
                           placeholder="Biografia"
                           name="biography"
                           id="biography"
                           v-model="updateFormData.biography">

                    <label class="text-lg font-bold"
                           for="career">Carrera</label>
                    <input class="py-3 my-3"
                           type="text"
                           placeholder="Carrera"
                           name="career"
                           id="career"
                           v-model="updateFormData.career">

                    <label class="text-lg font-bold"
                           for="password">Contraseña</label>
                    <input class="py-3 my-3"
                           type="password"
                           placeholder="Contraseña"
                           name="password"
                           id="password"
                           v-model="updateFormData.password">

                    <button type="submit"
                            class="self-end mt-2 px-4 py-3 bg-primary py-3 px-8 text-lg font-bold text-white rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out">Editar</button>
                </form>
            </div>
        </template>
    </section>
</template>

<style>
input {
    color: black;
}
</style>