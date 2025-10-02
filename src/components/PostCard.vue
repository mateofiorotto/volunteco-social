<script>

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
    }
}

</script>

<template>
    <article class="post bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6 border-1 border-[#348534] py-10 break-all">
        <RouterLink :to="`/perfil/${post.user_profiles.id}`" class="font-bold text-[#348534] mb-3">{{ post.user_profiles.full_name }}</RouterLink>

        <!-- Contenido post -->
        <p class="text-gray-700 mb-4">
            {{post.content }}
        </p>

        <!-- acciones -->
        <div>
            <p class="text-[#348534] hover:text-green-600 transition-all duration-300 ease-in-out mr-4">{{
                post.created_at }}</p>
        </div>
    </article>
</template>