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
    <li class="post odd:bg-light even:bg-light/10 border rounded-2xl p-4 mb-5">
        <div class="flex items-baseline gap-1.5 mb-2">
            <RouterLink class="text-primary-dark font-semibold"
                        :to="`/perfil/${post.user_profiles.id}`">
                {{ post.user_profiles.full_name }}
            </RouterLink> 
            <span class="text-primary/75 text-sm">{{formatDate(post.created_at) }}</span>
        </div>

        <!-- Contenido post -->
        <div>{{ post.content }}</div>

    </li>
</template>