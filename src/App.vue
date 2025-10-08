<script>
import AppFooter from './components/AppFooter.vue';
import AppNavbar from './components/AppNavbar.vue';


export default {
    name: 'App',
    components: { AppNavbar, AppFooter, },
    computed: {
        routeName() {
            return this.$route?.name || 'Sin nombre';
        }
    }
}

</script>

<template>
    <header>
        <AppNavbar />
    </header>
    <main>
        <RouterView />
    </main>
    <AppFooter />
</template>