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
        <h1 class="sr-only">Volunteco Social Media | {{ routeName }}</h1> <!--H1 General para toda la web, sr-only para los lectores pero oculto para vista-->
        <RouterView />
    </main>
    <AppFooter />
</template>