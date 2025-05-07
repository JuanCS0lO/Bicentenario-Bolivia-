<!-- 

<template>
  <div class="container mt-4">
    <h2>Personajes</h2>
    <ul class="list-group">
      <li v-for="p in personajes" :key="p.id" class="list-group-item">
        {{ p.nombre }} {{ p.apellido }}

        <li v-for="p in personajes" :key="p.id" class="list-group-item">
     {{ p.descripcion }}
      </li>

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
</script> -->

<template>
  <div class="container mt-4">
    <h2>Personajes</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Descripción</th>
          <th>Seudónimo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in personajes" :key="p.id">
          <td>{{ p.nombre }}</td>
          <td>{{ p.apellido }}</td>
          <td>{{ p.descripcion }}</td>
          <td>{{ p.seudonimo }}</td>
        </tr>
      </tbody>
    </table>
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
