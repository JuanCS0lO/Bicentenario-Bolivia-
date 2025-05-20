<template>
  <div class="detalle" v-if="ciudad">
    <h2>{{ ciudad?.nombre }}</h2>
    <p>{{ ciudad?.descripcion }}</p>
    <a :href="ciudad?.linkRef" target="_blank">Más información</a>

  <pre>{{ ciudad }}</pre>

  </div>
  <div v-else>
    <p>Cargando ciudad...</p>
  </div>


  <!-- <div class="detalle">
    <h2>{{ ciudad?.nombre }}</h2>
    <img :src="ciudad?.imagen" alt="Foto del departamento" class="foto" />
    <p><strong>Descripción:</strong> {{ ciudad?.descripcion }}</p>
    
   -->
    


</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const ciudad = ref(null)

onMounted(async () => {
  const id = route.params.id
  const { data } = await api.get(`/ciudades/${id}`)
  ciudad.value = data
  console.log("Ciudad recibida:", ciudad.value.nombre)
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
