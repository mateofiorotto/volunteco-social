<script>
import PostCard from "../components/PostCard.vue";
import { getUserProfileByPK, getPostsByUser } from "../services/user-profile";
import { subscribeToNewPostsByUser } from "../services/posts";
import MainLoader from "../components/MainLoader.vue";
import { subscribeToAuthStateChanges } from "../services/auth";

let unsubscribeAuth = () => { };
let unsubscribePosts = () => { };

export default {
    name: "UserProfile",
    components: { PostCard, MainLoader },
    data() {
        return {
            authUser: null,
            user: {
                id: null,
                email: null,
                full_name: null,
                biography: null,
                career: null,
            },
            posts: [],
            loading: true,
            unsubscribePosts: null,
        };
    },
    async mounted() {
        const userId = this.$route.params.id;

        //suscribirse al auth
        unsubscribeAuth = subscribeToAuthStateChanges(user => {
            this.authUser = user;
        });

        //obtener datos de perfil
        this.user = await getUserProfileByPK(userId);

        //posts del usuario
        this.posts = await getPostsByUser(userId);

        //suscribirse en realtime
        unsubscribePosts = subscribeToNewPostsByUser(userId, async (post) => {
            const profile = await getUserProfileByPK(post.user_profile_id);
            post.user_profiles = profile;
            this.posts.unshift(post);
            await this.$nextTick();
        });

        this.loading = false;
    },
    unmounted() {
        unsubscribePosts();
        unsubscribeAuth();
    },
};
</script>

<template>
    <section class="perfil-usuario"
             data-aos="fade">
        <div class="px-4 py-8 mx-auto w-full max-w-7xl">
            <template v-if="loading">
                <div class="flex w-full my-50 justify-center items-center">
                    <MainLoader />
                </div>
            </template>
            <template v-else>
                <div data-aos="fade">
                    <h2 class="font-bold text-3xl mb-5 md:mb-10">Perfil de usuario</h2>
                    <div class="flex flex-col md:flex-row justify-between gap-7 md:gap-20 mb-10">
                        <div class="basis-2/5">
                            <div class="md:grid grid-cols-4 gap-1 border rounded-2xl p-4 border-gray-400">
                                <p class="text-body/80">Nombre:</p>
                                <p class="col-span-3 font-medium">{{ user.full_name }}</p>
                                <p class="text-body/80">Email:</p>
                                <p class="col-span-3 font-medium"><a :href="`mailto:${user.email}`"
                                       target="_blank"
                                       class="text-secondary">{{ user.email }}</a></p>
                                <p class="text-body/80">Profesión:</p>
                                <p class="col-span-3 font-medium">{{ user.career ? user.career : 'Sin especificar...' }}
                                </p>
                                <p class="col-span-4 p-4 bg-light rounded-2xl mt-5">{{ user.biography ? user.biography :
                                    'Sin especificar...' }}</p>
                            </div>
                        </div>
                        <div class="basis-3/5">
                            <div v-if="posts.length === 0">
                                Este usuario no tiene publicaciones
                            </div>

                            <div v-else>
                                <h3 class="font-bold text-2xl mb-5">Publicaciones</h3>
                                <ol data-aos="fade"
                                    aria-label="Publicaciones"
                                    ref="postsContainer">
                                    <PostCard v-for="post in posts"
                                              :key="post.id"
                                              :post="post"
                                              :user="authUser" />
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>