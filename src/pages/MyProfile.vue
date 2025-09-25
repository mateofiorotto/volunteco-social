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
                display_name: null,
                bio: null,
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
    <h2>Mi Perfil</h2>

    <div class="ms-4 my-8 text-gray-700 italic">{{ user.bio ?? 'Sin especificar...' }}</div>

    <dl>
        <dt class="mb-1 font-bold">Email</dt>
        <dd class="mb-2">{{ user.email }}</dd>
        <dt class="mb-1 font-bold">Nombre</dt>
        <dd class="mb-2">{{ user.display_name ?? 'Sin especificar...' }}</dd>
        <dt class="mb-1 font-bold">Carrera</dt>
        <dd class="mb-2">{{ user.career ?? 'Sin especificar...' }}</dd>
    </dl>
</template>