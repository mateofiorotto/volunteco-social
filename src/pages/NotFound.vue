<script>
import errorImage from '../assets/error.png'

export default {
  data() {
    return {
      errorImage
    }
  }
}
</script>
<template>
  <section data-aos="fade"
           class="w-full h-[85vh] flex justify-center items-center flex-col">
    <img alt="Error 404"
         class="w-50"
         :src="errorImage">
    <h2 class="font-bold uppercase text-3xl text-center mb-10 mt-10 text-primary">No Encontrado</h2>
    <p class="text-center text-xl">Lo sentimos, la pagina que estas buscando no existe.</p>
    <RouterLink to="/"
                class="text-xl btn mt-10 text-primary font-semibold underline">
      Volver al inicio</RouterLink>
  </section>
</template>