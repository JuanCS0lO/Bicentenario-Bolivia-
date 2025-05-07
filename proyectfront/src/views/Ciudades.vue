<template>
    <div class="container mt-4">
      <h2>Ciudades</h2>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Ciudad</th>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in personajes" :key="p.id">
          <td>{{ p.nombre }}</td>
          <td>{{ p.descripcion }}</td>
        </tr>
      </tbody>
      <!-- ctrl + c + k para comentarios xd -->
        <!-- <li
          v-for="p in personajes"
          :key="p.id"
          class="list-group-item"
        >
          {{ p.nombre }}
        </li> -->
      </table>
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