<script>
export default {
    name: 'AppFooter',
}
</script>

<template>
    <footer class="bg-green-600 rounded-lg shadow-sm text-white p-10 pb-2">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a href="/" class="flex flex-col items-center justify-center mb-4 sm:mb-0 sm:flex-row sm:space-x-3">
                    <img src="../../public/logo.png" class="h-20" alt="Logo Volunteco" />
                    <p class="text-4xl font-semibold whitespace-nowrap">Volunteco</p>
                </a>
                <ul
                    class="flex flex-wrap items-center justify-center mt-9 mb-9 text-xl sm:text-lg font-medium sm:mt-0 sm:mb-0">
                    <li>
                        <RouterLink to="/" href="#" class="hover:underline me-4 md:me-6">Inicio</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/chat" href="#" class="hover:underline me-4 md:me-6">Chat</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/posteos" href="#" class="hover:underline me-4 md:me-6">Posteos</RouterLink>
                    </li>
                </ul>
            </div>
            <p class="block text-xl text-center border-t mt-5 pt-7">Cuidemos al medioambiente.</p>
        </div>
    </footer>



</template>
