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
    unmounted(){
        unsubscribeAuth();
        unsubscribePosts();
    }
}
</script>

<template>
    <section data-aos="fade" class="posteos px-10 lg:px-30 py-10">
        <h2 class="sr-only">Ultimos posteos</h2>
        <div class="crear-post">
            <form action="#" @submit.prevent="createNewPost"
                class="flex flex-col rounded-lg border border-[#348534] focus-within:border-green-600 mb-10 p-4">

                <label for="content" class="sr-only">Contenido del post</label>
                <textarea v-model="content" id="content" placeholder="Escribí lo que pensas..."
                    class="resize-none outline-none w-full h-30 p-3 rounded-lg"></textarea>

               <button type="submit"
                            class="self-end mt-2 px-4 py-3 bg-[#348534] hover:bg-green-600 cursor-pointer text-white rounded-lg transition-all duration-300 ease-in-out">
                        Postear
                    </button>
            </form>


            <template v-if="loading">
                <div class="flex w-full mt-6 mb-6 justify-center items-center">
                    <MainLoader />
                </div>
            </template>
            <template v-else>
                <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase text-[#348534]">Ultimos posteos</h2>
                <div data-aos="fade" ref="postsContainer">
                    <PostCard v-for="post in posts" :key="post.id" :post="post" :user="user" />
                </div>
            </template>

        </div>
    </section>
</template>