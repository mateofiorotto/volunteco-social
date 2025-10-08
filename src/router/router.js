import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import GlobalChat from "../pages/GlobalChat.vue";
import Login from "../pages/Login.vue";
import Posts from "../pages/Posts.vue";
import Register from "../pages/Register.vue";
import NotFound from "../pages/NotFound.vue";
import MyProfile from "../pages/MyProfile.vue";
import UserProfile from "../pages/UserProfile.vue";
import EditMyProfile from "../pages/EditMyProfile.vue";
import { subscribeToAuthStateChanges } from "../services/auth";
import Swal from 'sweetalert2';

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Inicio',
    },
    {
        path: '/chat',
        component: GlobalChat,
        name: 'Chat',
        meta: { requiresAuth: true, },
    },
    {
        path: '/mi-perfil',
        component: MyProfile,
        name: 'Mi perfil',
        meta: { requiresAuth: true, },
    },
    {
        path: '/mi-perfil/cambiar-datos',
        component: EditMyProfile,
        name: 'Cambiar datos',
        meta: { requiresAuth: true, },
    },
    {
        path: '/posteos',
        component: Posts,
        name: 'Posteos',
        meta: { requiresAuth: true, },
    },
    {
        path: '/perfil/:id',
        component: UserProfile,
        name: 'Perfil de usuario',
        meta: { requiresAuth: true, },
    },
    {
        path: '/iniciar-sesion',
        component: Login,
        name: 'Iniciar sesion',
    },
    {
        path: '/registrarse',
        component: Register,
        name: 'Registrarse',
    },
    {
        path: '/:notFound',
        component: NotFound,
        name: 'No Encontrado',
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

let user = {
    id: null,
    email: null,
}
subscribeToAuthStateChanges(newUserState => user = newUserState);

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && user.id === null) {
        Swal.fire({
            icon: 'warning',
            title: 'AUTENTICATE',
            text: 'Debes iniciar sesion/crear tu cuenta para acceder a esta sección',
            showConfirmButton: true,
            confirmButtonColor: '#348534',
        });

        return '/iniciar-sesion';
    }
});

export default router;