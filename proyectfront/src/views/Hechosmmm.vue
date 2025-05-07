<template>
    <div class="container mt-4">
      <h2>Hechos</h2>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha Inicio</th>
          <th>Fecha Final</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in personajes" :key="p.id">
          <td>{{ p.nombre }}</td>
          <td>{{ p.descripcion }}</td>
          <!-- <td>{{ p.fechainicio }}</td>
          <td>{{ p.fechafinal }}</td> -->

          <td>{{ new Date(p.fechaInicio).toLocaleDateString() }}</td>
<td>{{ new Date(p.fechaFinal).toLocaleDateString() }}</td>

        </tr>
      </tbody>


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


    // async created() {
    //   const resp = await api.get('/hechos');
    //   this.personajes = resp.data;
    // }

    async created() {
  const resp = await api.get('/hechos');
  console.log("Datos recibidos:", resp.data);
  this.personajes = resp.data;
}
  };
  </script>