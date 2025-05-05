<template>
  <div class="container mt-4">
    <h2>Personajes</h2>
    <ul class="list-group">
      <li v-for="p in personajes" :key="p.id" class="list-group-item">
        {{ p.nombre }} {{ p.apellido }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
const personajes = ref([])
onMounted(async () => {
  const { data } = await api.get('/personajes')
  personajes.value = data
})
</script>