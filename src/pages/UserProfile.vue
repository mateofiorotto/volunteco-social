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
        this.unsubscribePosts();
    },
};
</script>

<template>
    <section class="overflow-hidden px-10 lg:px-30 py-10 mi-perfil" data-aos="fade">
        <template v-if="loading">
            <div class="flex w-full my-40 justify-center items-center">
                <MainLoader />
            </div>
        </template>
        <template v-else>
            <div data-aos="fade">
                <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase">{{ user.full_name }}</h2>

                <p><span class="font-bold">Email:</span> {{ user.email }}</p>
                <p><span class="font-bold">Carrera:</span> {{ user.career ? user.career : 'Sin especificar...' }}</p>
                <p><span class="font-bold">Biografía:</span> {{ user.biography ? user.biography : 'Sin especificar...'
                    }}</p>

                <div v-if="posts.length === 0" class="text-center text-gray-500">
                    Este usuario no tiene posts.
                </div>

                <div v-else>
                    <PostCard v-for="post in posts" :key="post.id" :post="post" :user="post.user_profiles ?? {}" />
                </div>
            </div>
        </template>
    </section>
</template>