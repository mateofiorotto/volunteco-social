<script>
import { subscribeToNewPosts, createPost, getLastPosts } from '../services/posts'
import PostCard from '../components/PostCard.vue'
import { subscribeToAuthStateChanges } from '../services/auth';

export default {
    name: 'Posts',
    components: { PostCard },
    data() {
        return {
            posts: [],
            content: '',
            user: {
                id: null,
                email: null,
                full_name: null,
                biography: null,
                career: null
            }
        }
    },
    methods: {
        async createNewPost() {
            try {
                await createPost(this.content, this.user.id);

                this.content = '';
            } catch (error) {
                console.error('[Posts.vue handleSubmit] Error al crear el post: ', error);
            }
        }
    },
     async mounted() {
        subscribeToAuthStateChanges(newUser => this.user = newUser);

        // Traer posts iniciales
        subscribeToNewPosts(async post => {
            this.posts.unshift(post); //agregarlo al inicio para verlo
        });

        this.posts = await getLastPosts();
    },
}
</script>

<template>
    <section class="posteos px-10 lg:px-30 py-10">
        <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase text-[#348534]">Ultimos posteos</h2>
        <div class="crear-post">
            <form @submit.prevent="createNewPost"
                class="flex flex-col rounded-lg border border-[#348534] focus-within:border-green-600 mb-10">

                <label for="content" class="sr-only">Contenido del post</label>
                <textarea v-model="content" id="content" placeholder="Escribí lo que pensas..."
                    class="resize-none outline-none w-full h-30 p-3 rounded-lg"></textarea>

                <button 
                    class="self-end mt-2 px-4 py-3 my-5 mx-5 bg-green-600 text-white rounded-lg" type="submit">
                    Postear
                </button>
            </form>


            <div>
                <PostCard v-for="post in posts" :key="post.id" :post="post" :user="user" />
            </div>
        </div>
    </section>
</template>