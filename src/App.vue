<script>
import AppFooter from './components/AppFooter.vue';
import AppNavbar from './components/AppNavbar.vue';


export default {
    name: 'App',
    components: { AppNavbar, AppFooter, },
}

</script>

<template>
    <header class="border-b-1 border-primary">
        <AppNavbar />
    </header>
    <main>
        <RouterView />
    </main>
    <AppFooter />
</template>