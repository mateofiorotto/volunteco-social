<template>
    <section class="w-full h-[80vh] flex justify-center items-center flex-col">
        <img alt="Error 404" class="w-50" src="/public/error.png">
        <h2 class="font-bold uppercase text-3xl text-center mb-10 mt-10 text-[#348534]">No Encontrado</h2>
        <p class="text-center text-xl text-green-700">Lo sentimos, la pagina que estas buscando no existe.</p>
        <RouterLink to="/" class="text-xl btn mt-10 text-[#348534] font-semibold underline 
        hover:text-green-600 transition-all duration-300 ease-in-out">Volver al inicio</RouterLink>

    </section>

</template>