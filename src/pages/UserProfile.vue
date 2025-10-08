<script>
import PostCard from "../components/PostCard.vue";
import { getUserProfileByPK, getPostsByUser } from "../services/user-profile";
import { subscribeToNewPostsByUser } from "../services/posts";
import MainLoader from "../components/MainLoader.vue";

let unsubscribeAuth = () => { };
let unsubscribePosts = () => { };

export default {
    name: "UserProfile",
    components: { PostCard, MainLoader },
    data() {
        return {
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

        //traigo datos
        this.user = await getUserProfileByPK(userId);

        //traigo post
        this.posts = await getPostsByUser(userId);

        //posts nuevos en tiempo real
        this.unsubscribePosts = subscribeToNewPostsByUser(userId, async (post) => {

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
    <section class="overflow-hidden px-10 lg:px-30 pb-30 pt-10 perfil-usuario"
             data-aos="fade">
        <template v-if="loading">
            <div class="flex w-full my-50 justify-center items-center">
                <MainLoader />
            </div>
        </template>
        <template v-else>
            <div data-aos="fade">
                <h2 class="font-bold text-3xl text-center mb-5 mt-5 uppercase text-primary">{{ user.full_name }}</h2>

                <p class="text-lg mb-3 text-center text-secondary font-semibold">{{ user.email }}</p>
                <p class="text-md mb-3 text-center">{{ user.career ? user.career : 'Sin especificar...' }}</p>
                <p class="text-md mb-8 text-center">{{ user.biography ? user.biography : 'Sin especificar...'
                }}</p>

                <div v-if="posts.length === 0"
                     class="text-center text-gray-500">
                    Este usuario no tiene posts.
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