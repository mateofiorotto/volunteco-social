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
    <section class="mi-perfil">
        <div class="px-4 py-8 mx-auto w-full max-w-3xl">
            <template v-if="loading">
                <div class="flex w-full my-40 justify-center items-center">
                    <MainLoader />
                </div>
            </template>
            <template v-else>
                <div data-aos="fade">
                    <h2 class="font-bold text-3xl mb-10 text-center">Actualizar mi perfil</h2>

                    <div class="border rounded-2xl p-4 md:p-8">
                        <form action="#"
                            @submit.prevent="editProfile">
                            <div class="space-y-4 text-left">
                                <div>
                                    <label class="block mb-2 text-body/80"
                                        for="full_name">Nombre completo: *</label>
                                    <input 
                                        type="text"
                                        placeholder="Nombre completo"
                                        v-model="updateFormData.full_name"
                                        name="full_name"
                                        id="full_name"
                                        required>
                                </div>
                                <div>
                                    <label class="block mb-2 text-body/80"
                                    for="career">Profesión:</label>
                                    <input 
                                        type="text"
                                        placeholder="Profesión"
                                        name="career"
                                        id="career"
                                        v-model="updateFormData.career">
                                </div>
                                <div>
                                    <label class="block mb-2 text-body/80"
                                        for="biography">Sobre mí:</label>
                                    <textarea
                                        placeholder="Biografía"
                                        name="biography"
                                        id="biography"
                                        v-model="updateFormData.biography"
                                        rows="3"></textarea>
                                </div>
                                <div>
                                    <label class="block mb-2 text-body/80"
                                for="password">Contraseña:</label>
                                    <input
                                        type="password"
                                        placeholder="******"
                                        name="password"
                                        id="password"
                                        v-model="updateFormData.password">

                                </div>
                                <div class="text-right">
                                    <button type="submit"
                                    class="btn btn-primary">Guardar</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>

                </div>
            </template>
        </div>
    </section>
</template>