<template>
    <div class="container mt-4">
      <h2>Personajes</h2>
      <ul class="list-group">
        <li
          v-for="p in personajes"
          :key="p.id"
          class="list-group-item"
        >
          {{ p.nombre }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  export default {
    data() {
      return { personajes: [] };
    },
    async created() {
      const resp = await api.get('/ciudades');
      this.personajes = resp.data;
    }
  };
  </script>