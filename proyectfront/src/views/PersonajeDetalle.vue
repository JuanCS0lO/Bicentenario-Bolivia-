<!-- src/views/PersonajeDetalle.vue -->
<template>
  <div class="detalle">
    <h2>{{ personaje?.nombre }} {{ personaje?.ap_pat }}</h2>
    <img :src="personaje?.imagen" alt="Foto del personaje" class="foto" />
    <p><strong>Seudónimo:</strong> {{ personaje?.seudonimo }}</p>
    <p><strong>Descripción:</strong> {{ personaje?.descripcion }}</p>
    <!-- Agrega más campos si es necesario -->
  
    
  <pre>{{ personaje }}</pre>

  
  </div>



  <!-- <div class="carousel-item active">
          <img src="https://www.opinion.com.bo/asset/thumbnail,992,558,center,center/media/opinion/images/2013/08/06/2013N102448.jpg" class="d-block w-100" alt="Imágen 1"/>
        </div> -->


</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const personaje = ref(null)

onMounted(async () => {
  const id = route.params.id
  const { data } = await api.get(`/personajes/${id}`)
  personaje.value = data
  
  
  console.log("FOTITO PIPIPI FOTITO:", personaje.value.imagen)
})
</script>

<style scoped>
.foto {
  max-width: 300px;
  border-radius: 8px;
  margin-top: 1rem;
}
.detalle {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
}
</style>
