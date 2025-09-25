<script>
import PostCard from '../components/PostCard.vue';

export default {
    name: 'Posts',
    components: { PostCard }
}
</script>

<template>
    <section class="posteos px-10 lg:px-30 py-10">
        <h2 class="sr-only">Posteos</h2>
        <div class="crear-post">
            <form @submit.prevent="handleSubmit"
                class="flex flex-col rounded-lg border border-[#348534] focus-within:border-green-600 mb-10">

                <label for="contenido" class="sr-only">Contenido del post</label>
                <textarea
                    id="contenido"
                    placeholder="Escribí lo que pensas..."
                    class="resize-none outline-none w-full h-30 p-3 rounded-lg"
                ></textarea>

                <button class="self-end mt-2 px-4 py-3 my-5 mx-5 bg-green-600 text-white rounded-lg" type="submit">
                    Postear
                </button>
            </form>

            <PostCard />
        </div>
    </section>
</template>