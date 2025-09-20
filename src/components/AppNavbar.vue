<script>
export default {
    name: 'AppNavbar',
}
</script>

<template>
    <nav class="flex items-center gap-8 p-4 bg-slate-200">
        <RouterLink class="text-xl" to="/">DV Social</RouterLink>
        <ul class="flex gap-4">
            <li>
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/chat">Chat general</RouterLink>
            </li>
            <li>
                <RouterLink to="/ingresar">Ingresar</RouterLink>
            </li>
            <li>
                <RouterLink to="/crear-cuenta">Crear cuenta</RouterLink>
            </li>
        </ul>
    </nav>
</template>