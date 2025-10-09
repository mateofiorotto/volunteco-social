<script>
import errorImage from '../assets/iso.svg'

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
           class="flex-grow content-center">
      <div class="p-6 md:p-8 mx-auto w-full max-w-3xl text-center space-y-6">
          <img alt="Error 404"
              class="w-35 mx-auto"
              :src="errorImage">
          <div class="font-bold uppercase text-8xl text-primary">404</div>
          <h2 class="font-bold uppercase text-2xl text-primary">Página no encontrada</h2>
          <p class="text-center text-xl">Lo sentimos, la pagina que estas buscando no existe.</p>
          <RouterLink to="/"
                      class="btn btn-primary">
            Volver al inicio</RouterLink>
      </div>
  </section>
</template>