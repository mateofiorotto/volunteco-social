<script>
import { subscribeToAuthStateChanges } from '../services/auth';
import { createPost, subscribeToNewPostsByUser } from '../services/posts';
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
    <section class="overflow-hidden px-10 lg:px-30 pt-10 pb-30 mi-perfil">
        <template v-if="loading">
            <div class="flex w-full my-50 justify-center items-center">
                <MainLoader />
            </div>
        </template>
        <template v-else>
            <div data-aos="fade">

                <h2 class="font-bold text-3xl mb-5 mt-5 uppercase text-primary">Mi Perfil</h2>

                <p class="text-md mb-3"><span class="font-bold">Nombre:</span> {{ user.full_name }}</p>
                <p class="text-md mb-3"><span class="font-bold">Email:</span> {{ user.email }}</p>
                <p class="text-md mb-3"><span class="font-bold">Carrera:</span> {{ user.career ? user.career :
                    'Sinespecificar...' }}</p>
                <p class="text-md mb-3"><span class="font-bold">Biografía:</span> {{ user.biography ? user.biography :
                    'Sin especificar...' }}</p>

                <RouterLink to="/mi-perfil/cambiar-datos"
                            class="text-primary block mb-10 flex gap-2 text-lg align-middle items-center mt-3 hover:text-green-600 transition-all duration-300 ease-in-out"
                            href="#">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         class="size-8">
                        <path stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    Cambiar datos
                </RouterLink>

                <!-- Formulario para crear post -->
                <form action="#"
                      @submit.prevent="createNewPost"
                      class="flex flex-col rounded-lg border border-primary focus-within:border-green-600 mb-10 p-4">
                    <label for="content"
                           class="sr-only">Contenido del post</label>
                    <textarea v-model="content"
                              id="content"
                              required
                              name="content"
                              placeholder="Escribí lo que pensas..."
                              class="resize-none outline-none w-full h-30 p-3 rounded-lg mb-2"></textarea>
                    <button type="submit"
                            class="self-end mt-2 px-4 py-3 bg-primary py-3 px-8 text-lg font-bold text-white rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out">
                        Postear
                    </button>
                </form>

                <!-- Lista de posts -->
                <div v-if="posts.length === 0"
                     class="text-center text-gray-500">
                    No hay posts aún.
                </div>
                <div v-else>
                    <h3 class="sr-only">Posteos</h3>
                    <ol data-aos="fade"
                        aria-label="Posteos"
                        ref="postsContainer">
                        <PostCard v-for="post in posts"
                                  :key="post.id"
                                  :post="post"
                                  :user="user" />
                    </ol>
                </div>
            </div>
        </template>
    </section>
</template>
