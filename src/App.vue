<script>
import AppFooter from './components/AppFooter.vue';
import AppNavbar from './components/AppNavbar.vue';

export default {
    name: 'App',
    components: { AppNavbar, AppFooter, },
}
</script>

<template>
    <AppNavbar />
    <main>
        <h1 class="hidden">Volunteco Social Media</h1>
        <RouterView />
    </main>
    <AppFooter />
</template>