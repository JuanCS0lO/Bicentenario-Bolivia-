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
  <div class="container psnj">
    <h2 class="Tp">Personajes</h2>
    <table class="Tps">
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
<style scoped>
.psnj{
  max-width: 1000px;
  margin: 2rem auto;
  background-color: #fff;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.Tp {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #8b0000;
}

.Tps {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: #fafafa;
}

.Tps thead {
  background-color: #8b0000;
  color: #fff;
}

.Tps th,
.Tps td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.Tps tr:nth-child(even) {
  background-color: #f9f9f9;
}

.Tps tr:hover {
  background-color: #670000;
    color: #fff;
}
</style>
 
