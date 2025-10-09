<script>
import PostCard from '../components/PostCard.vue'
import { subscribeToNewPosts, createPost, getLastPosts } from '../services/posts'
import { subscribeToAuthStateChanges } from '../services/auth';
import MainLoader from '../components/MainLoader.vue';
import { getUserProfileByPK } from '../services/user-profile';

let unsubscribeAuth = () => { };
let unsubscribePosts = () => { };

export default {
    name: 'Posts',
    components: { PostCard, MainLoader },
    data() {
        return {
            loading: true,
            posts: [],
            content: '',
            user: {
                id: null,
                full_name: null,
            }
        }
    },
    methods: {
        async createNewPost() {

            try {
                await createPost(this.content, this.user.id);

                this.content = '';
            } catch (error) {
                console.error('[Posts.vue createNewPost] Error al crear el post: ', error);
            }
        }
    },
    async mounted() {
        unsubscribeAuth = subscribeToAuthStateChanges(userStatus => this.user = userStatus);

        unsubscribePosts = subscribeToNewPosts(async post => {

            const profile = await getUserProfileByPK(post.user_profile_id);
            post.user_profiles = profile;

            this.posts.unshift(post) // agregar al inicio

            await this.$nextTick();
        });

        this.posts = await getLastPosts();

        this.loading = false;
    },
    unmounted() {
        unsubscribeAuth();
        unsubscribePosts();
    }
}
</script>

<template>
    <section data-aos="fade" class="posteos">
        <div class="px-4 py-8 mx-auto w-full max-w-7xl">
            <h2 class="font-bold text-3xl mb-5 md:mb-8">Mensajes</h2>
            <div class="flex flex-col md:flex-row justify-between gap-7 md:gap-20 mb-10">
                <div class="basis-3/5">
                    <template v-if="loading">
                        <div class="flex w-full mt-16 mb-16 justify-center items-center">
                            <MainLoader />
                        </div>
                    </template>
                    <template v-else>
                        <h3 class="font-bold text-2xl mb-5">Ultimos mensajes</h3>
                        <ol data-aos="fade"
                            aria-label="Posteos"
                            ref="postsContainer">
                            <PostCard v-for="post in posts"
                                    :key="post.id"
                                    :post="post"
                                    :user="user" />
                        </ol>
                    </template>
                </div>
                <div class="basis-2/5">
                    <h3 class="font-bold text-2xl mb-5">Mensaje nuevo</h3>
                    <div class="crear-post bg-light border rounded-2xl p-4 mb-8">
                        <form action="#"
                            @submit.prevent="createNewPost">
                            

                            <label for="content" class="block mb-3">Mensaje nuevo:</label>
                            <textarea v-model="content"
                                    id="content"
                                    required
                                    name="content"
                                    placeholder="Escribí tu mensaje..."
                                    rows="4"
                                    class="bg-white mb-5"></textarea>
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

        </div>
    </section>
</template>