<template>
    <div class="container hechos-container">
      <h2 class="titulo-hechos">Hechos Históricos</h2>
      <table class="hechos-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha Inicio</th>
            <th>Fecha Final</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in personajes" :key="p.id">
            <td>{{ p.nombre }}</td>
            <td>{{ p.descripcion }}</td>
            <td>{{ formatDate(p.fechaInicio) }}</td>
            <td>{{ formatDate(p.fechaFinal) }}</td>
          </tr>
        </tbody>
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
      const resp = await api.get('/hechos');
      console.log("Datos recibidos:", resp.data);
      this.personajes = resp.data;
    },
    methods: {
      formatDate(fecha) {
        const date = new Date(fecha);
        return isNaN(date) ? 'Fecha inválida' : date.toLocaleDateString();
      }
    }
  };
  </script>
  
  <style scoped>
  .hechos-container {
    max-width: 1000px;
    margin: 2rem auto;
    background-color: #fff;
    padding: 2rem;
    border-radius: 6px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  }
  
  .titulo-hechos {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #8b0000;
  }
  
  .hechos-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    background-color: #fafafa;
  }
  
  .hechos-table thead {
    background-color: #8b0000;
    color: #fff;
  }
  
  .hechos-table th,
  .hechos-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
  }
  
  .hechos-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .hechos-table tr:hover {
    background-color: #670000;
    color: #fff;
  }
  </style>
   