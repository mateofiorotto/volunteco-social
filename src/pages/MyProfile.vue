<script>
import { subscribeToAuthStateChanges } from '../services/auth';
import { createPost, subscribeToNewPosts } from '../services/posts';
import { getPostsByUser } from '../services/user-profile';
import PostCard from '../components/PostCard.vue';

export default {
    name: 'MyProfile',
    components: { PostCard },
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
            newContent: '',
        }
    },
    methods: {
        async createNewPost() {
            if (!this.newContent) return;

            try {
                await createPost(this.newContent, this.user.id);
                this.newContent = '';
            } catch (error) {
                console.error('[MyProfile.vue createNewPost] Error al crear el post: ', error);
            }
        }
    },
    async mounted() {
        // Suscribirse al estado del usuario
        subscribeToAuthStateChanges(async newUser => {
            this.user = newUser;

            if (this.user.id) {
                try {
                    // Traer posts del usuario
                    this.posts = await getPostsByUser(this.user.id);

                    // Escuchar nuevos posts en tiempo real
                    subscribeToNewPosts(post => {
                        if (post.user_profile_id === this.user.id) {
                            this.posts.unshift(post); // agregar al inicio
                        }
                    });
                } catch (error) {
                    console.error('[MyProfile.vue] Error al traer posts: ', error);
                }
            }
        });
    }
}
</script>

<template>
    <section class="overflow-hidden px-10 lg:px-30 py-10 mi-perfil" data-aos="fade">
        <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase">{{ user.full_name }}</h2>

        <p>{{ user.email }}</p>
        <p>{{ user.career ?? 'Sin especificar...' }}</p>
        <p>{{ user.biography ?? 'Sin especificar...' }}</p>

        <a class="text-blue-600 block mb-10" href="#">
            Cambiar datos (contraseña, bio y carrera. Email y nombre no se pueden cambiar)
        </a>

        <!-- Formulario para crear post -->
        <form @submit.prevent="createNewPost"
              class="flex flex-col rounded-lg border border-[#348534] focus-within:border-green-600 mb-10 p-4">
            <label for="newContent" class="sr-only">Contenido del post</label>
            <textarea v-model="newContent" id="newContent"
                      placeholder="Escribí lo que pensas..."
                      class="resize-none outline-none w-full h-30 p-3 rounded-lg mb-2"></textarea>
            <button type="submit"
                    class="self-end mt-2 px-4 py-3 bg-green-600 text-white rounded-lg">
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
    </section>
</template>
