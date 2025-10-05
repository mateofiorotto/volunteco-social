<script>
import { subscribeToAuthStateChanges } from '../services/auth';
import { createPost, subscribeToNewPosts, subscribeToNewPostsByUser } from '../services/posts';
import { getPostsByUser, getUserProfileByPK } from '../services/user-profile';
import PostCard from '../components/PostCard.vue';
import MainLoader from '../components/MainLoader.vue';

let unsubscribeAuth = () => { };
let unsubscribePosts = () => { };

export default {
    name: 'MyProfile',
    components: { PostCard, MainLoader },
    data() {
        return {
            loading: true,
            user: {
                id: null,
                email: null,
                full_name: null,
                biography: null,
                career: null,
            },
            posts: [],
            content: '',
        }
    },
    methods: {
        async createNewPost() {
            if (!this.content) return;

            try {
                await createPost(this.content, this.user.id);

                this.content = '';
            } catch (error) {
                console.error('[MyProfile.vue createNewPost] Error al crear el post: ', error);
            }
        }
    },
    async mounted() {
        unsubscribeAuth = subscribeToAuthStateChanges(userStatus => this.user = userStatus);

        unsubscribePosts = subscribeToNewPostsByUser(this.user.id, async post => {

            const profile = await getUserProfileByPK(post.user_profile_id);
            post.user_profiles = profile;

            this.posts.unshift(post) // agregar al inicio

            await this.$nextTick();
        });

        this.posts = await getPostsByUser(this.user.id);

        this.loading = false;
    },
    unmounted() {
        unsubscribeAuth();
        unsubscribePosts();
    }
}
</script>

<template>
    <section class="overflow-hidden px-10 lg:px-30 py-10 mi-perfil" data-aos="fade">
        <template v-if="loading">
            <div class="flex w-full my-40 justify-center items-center">
                <MainLoader />
            </div>
        </template>
        <template v-else>

            <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase">Mi Perfil</h2>

            <p><span class="font-bold">Nombre:</span> {{ user.full_name }}</p>
            <p><span class="font-bold">Email:</span> {{ user.email }}</p>
            <p><span class="font-bold">Carrera:</span> {{ user.career ? user.career : 'Sin especificar...' }}</p>
            <p><span class="font-bold">Biografía:</span> {{ user.biography ? user.biography : 'Sin especificar...' }}</p>

            <RouterLink to="/mi-perfil/cambiar-datos" class="text-blue-600 block mb-10" href="#">
                Cambiar datos (contraseña, bio y carrera. Email y nombre no se pueden cambiar)
            </RouterLink>

            <!-- Formulario para crear post -->
            <form action="#" @submit.prevent="createNewPost"
                class="flex flex-col rounded-lg border border-[#348534] focus-within:border-green-600 mb-10 p-4">
                <label for="content" class="sr-only">Contenido del post</label>
                <textarea v-model="content" id="content" placeholder="Escribí lo que pensas..."
                    class="resize-none outline-none w-full h-30 p-3 rounded-lg mb-2"></textarea>
                <button type="submit" class="self-end mt-2 px-4 py-3 bg-green-600 text-white rounded-lg">
                    Postear
                </button>
            </form>

            <!-- Lista de posts -->
            <div v-if="posts.length === 0" class="text-center text-gray-500">
                No hay posts aún.
            </div>
            <div v-else>
                <h3 class="font-bold text-3xl text-center mb-10 mt-5 uppercase">Mis Posts</h3>
                <PostCard v-for="post in posts" :key="post.id" :post="post" :user="user" />
            </div>
        </template>
    </section>
</template>
