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
        },
        groupStyle: Number
    },
    methods: {
        formatDate(created_at) {

            const date = new Date(created_at)
            const now = new Date()

            const isSameDay =
                date.getFullYear() === now.getFullYear() &&
                date.getMonth() === now.getMonth() &&
                date.getDate() === now.getDate()
            if (isSameDay) {
                return useDateFormat(date, 'HH:mm').value
            } else {
                return useDateFormat(date, 'DD/MM/YYYY - HH:mm').value
            }
        }
    },

}

</script>

<template>
    <li :class="['post border rounded-2xl p-4 mb-5 w-7/8 bg-light',
        post.user_profiles.id === user.id ? 'ml-auto bg-light/30' : '',
        groupStyle === 0 ? 'bg-light' : 'bg-light/10']">
        <div class="flex items-baseline gap-1.5 mb-2">

            <template v-if="post.user_profiles.id !== user.id">
                <RouterLink class="text-primary-dark font-semibold"
                            :to="`/perfil/${post.user_profiles.id}`">
                    {{ post.user_profiles.full_name }}
                </RouterLink>
            </template>
            <template v-else>
                <span class="text-primary-dark font-semibold">
                    Yo
                </span>
            </template>

            <span class="text-primary text-sm">{{ formatDate(post.created_at) }}</span>
        </div>

        <!-- Contenido post -->
        <div>{{ post.content }}</div>

    </li>
</template>