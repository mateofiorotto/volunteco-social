<script>
import { subscribeToAuthStateChanges } from '../services/auth';

export default {
    name: 'MyProfile',
    components: { },
    data() {
        return {
            user: {
                id: null,
                email: null,
                full_name: null,
                biography: null,
                career: null,
            },
        }
    },
    mounted() {
        subscribeToAuthStateChanges(newUserState => this.user = newUserState);
    }
}
</script>

<template>
    <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase">Mi Perfil</h2>

    <p>{{ user.full_name }}</p>
    <p>{{ user.email }}</p>
    <p>{{ user.career ?? 'Sin especificar...' }}</p>
    <p>{{ user.biography ?? 'Sin especificar...' }}</p>

    <a class="text-blue-600" href="#">cambiar datos (contraseña, bio y carrera. Email y nombre no se pueden cambiar)</a>
</template>