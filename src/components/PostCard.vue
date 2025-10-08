<script>
import { useDateFormat } from '@vueuse/core';

export default {
    name: 'PostCard',
    props: {
        post: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatDate(created_at) {
            return useDateFormat(created_at, 'DD/MM/YYYY HH:mm').value
        }
    }
}

</script>

<template>
    <li class="post bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6 border-1 border-primary py-10 break-all">
        <RouterLink class="font-bold text-primary mb-3"
                    :to="`/perfil/${post.user_profiles.id}`">
            {{ post.user_profiles.full_name }}
        </RouterLink>

        <!-- Contenido post -->
        <p class="text-gray-700 mb-4">
            {{ post.content }}
        </p>

        <!-- acciones -->
        <div>
            <p class="text-primary">{{
                formatDate(post.created_at) }}</p>
        </div>
    </li>
</template>