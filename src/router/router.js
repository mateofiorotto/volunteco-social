import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import GlobalChat from "../pages/GlobalChat.vue";
import Login from "../pages/Login.vue";
import Posts from "../pages/Posts.vue";
import Register from "../pages/Register.vue";
import NotFound from "../pages/NotFound.vue";
import MyProfile from "../pages/MyProfile.vue";
import { subscribeToAuthStateChanges } from "../services/auth";

const routes = [
    { path: '/',                                    component: Home, },
    { path: '/chat',                                component: GlobalChat,      meta: { requiresAuth: true, }, },
    { path: '/mi-perfil',                           component: MyProfile,       meta: { requiresAuth: true, }, },
    { path: '/posteos',                             component: Posts,           meta: { requiresAuth: true, }, },
    { path: '/iniciar-sesion',                      component: Login, },
    { path: '/registrarse',                         component: Register, },
    { path: '/:notFound',                           component: NotFound, },
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
    if(to.meta.requiresAuth && user.id === null) {
        return '/iniciar-sesion';
    }
});

export default router;