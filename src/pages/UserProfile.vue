<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import PostCard from "../components/PostCard.vue";
import { getUserProfileByPK, getPostsByUser } from "../services/user-profile";
export default {
    name: "UserProfile",
    components: {
        PostCard,
    },
    setup() {
        const route = useRoute();
        const profile = ref(null);
        const posts = ref([]);
        const loading = ref(true);

        onMounted(async () => {
            const { id } = route.params;

            try {
                profile.value = await getUserProfileByPK(id);
                posts.value = await getPostsByUser(id);
            } catch (error) {
                console.error("Error al cargar perfil o datos del usuario:", error);
            } finally {
                loading.value = false;
            }
        });

        return {
            profile,
            posts,
        };
    },
};
</script>

<template>

    <section class="overflow-hidden px-10 lg:px-30 py-10 mi-perfil" data-aos="fade">
        <h2 class="font-bold text-3xl text-center mb-10 mt-5 uppercase">{{ profile?.full_name.value }}</h2>

        <p>{{ profile?.email }}</p>
        <p>{{ profile?.career ?? 'Sin especificar...' }}</p>
        <p>{{ profile?.biography ?? 'Sin especificar...' }}</p>

        <div v-if="posts.length === 0">Este usuario no tiene posts.</div>

        <div v-else>
            <PostCard v-for="post in posts" :key="post.id" :post="post" :user="post.user_profiles ?? {}" />
        </div>
    </section>

</template>