<template>
  <div class="container ccd">
    <h2 class="Tciu">Ciudades</h2>
    <table class="tcdd">
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

<style scoped>
.ccd{
  max-width: 1000px;
  margin: 2rem auto;
  background-color: #fff;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.Tciu {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #8b0000;
}

.tcdd {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: #fafafa;
}

.tcdd thead {
  background-color: #8b0000;
  color: #fff;
}

.tcdd th,
.tcdd td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.tcdd tr:nth-child(even) {
  background-color: #f9f9f9;
}

.tcdd tr:hover {
  background-color: #670000;
    color: #fff;
}
</style>
 