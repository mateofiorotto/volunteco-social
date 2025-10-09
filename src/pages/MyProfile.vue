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
    <section class="mi-perfil">
        <div class="px-4 py-8 mx-auto w-full max-w-7xl">
            <template v-if="loading">
                <div class="flex w-full my-50 justify-center items-center">
                    <MainLoader />
                </div>
            </template>
            <template v-else>
                <div data-aos="fade">
                    <h2 class="font-bold text-3xl mb-5 md:mb-10">Mi perfil</h2>
                    <div class="flex flex-col md:flex-row justify-between gap-7 md:gap-20 mb-10">
                        <div class="basis-2/5">

                            <div class="flex mb-3 px-4">
                                <RouterLink to="/mi-perfil/cambiar-datos" class="text-sm inline-flex items-center gap-1 ml-auto text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-6 inline-block align-middle">
                                        <path stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    Modificar datos
                                </RouterLink>
                            </div>

                            <div class="md:grid grid-cols-4 gap-1 border rounded-2xl p-4 border-gray-400">
                                <p class="text-body/80">Nombre:</p>
                                <p class="col-span-3 font-medium">{{ user.full_name }}</p>
                                <p class="text-body/80">Email:</p>
                                <p class="col-span-3 font-medium">{{ user.email }}</p>
                                <p class="text-body/80">Profesión:</p>
                                <p class="col-span-3 font-medium">{{ user.career ? user.career :'Sin especificar...' }}</p>
                                <p class="col-span-4 p-4 bg-light rounded-2xl mt-5">{{ user.biography ? user.biography : 'Sin especificar...' }}</p>
                            </div>

                        </div>
                        <div class="basis-3/5">
                            <div class="bg-light border rounded-2xl p-4">
                                <!-- Formulario para crear post -->
                                <form action="#"
                                    @submit.prevent="createNewPost">
                                    <label for="content" class="block mb-3">Nueva publicación:</label>
                                    <textarea v-model="content"
                                            id="content"
                                            required
                                            name="content"
                                            placeholder="Escribí tu mensaje..."
                                            class="bg-white mb-5"
                                            rows="4"></textarea>
                                            <div class="text-right">
                                    <button type="submit"
                                            class="btn btn-primary">
                                        Enviar
                                    </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>


                    <!-- Lista de posts -->
                    <div v-if="posts.length === 0"
                        class="text-center text-gray-500">
                        No hay publicaciones aún.
                    </div>
                    <div v-else>
                        <div class="md:w-3/5 w-full">
                        <h2 class="font-bold text-3xl mb-5 md:mb-10">Mis publicaciones</h2>
                        <ol data-aos="fade"
                            aria-label="Publicaciones"
                            ref="postsContainer"
                            class="-ml-[12.5%]"
                            >
                            <PostCard v-for="post in posts"
                                    :key="post.id"
                                    :post="post"
                                    :user="user" />
                        </ol>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>
