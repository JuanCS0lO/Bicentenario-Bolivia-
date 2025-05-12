<script setup>
import { onMounted } from 'vue';
import * as bootstrap from 'bootstrap';
//para el mapa leaflet
import L from 'leaflet';
//...................


/*Script para leaflet
onMounted(() => {
  const map = L.map('map').setView([-16.2902, -63.5887], 5) // Coordenadas centrales de Bolivia

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  // Puedes agregar un marcador si quieres
  L.marker([-16.5, -68.15]).addTo(map)
    .bindPopup('La Paz, Bolivia')
    .openPopup()
})
//-...............................*/


//Script 2 para el leaflet
const hechos = [
  {
    nombre: 'Proclamación de Independencia',
    descripcion: 'El 6 de agosto de 1825 se proclamó la independencia de Bolivia.',
    lat: -19.0333,
    lng: -65.2627,
  },
  {
    nombre: 'Revolución de La Paz',
    descripcion: 'El 16 de julio de 1809, se inicia la lucha por la independencia.',
    lat: -16.5,
    lng: -68.15,
  },
  {
    nombre: 'Batalla de Ingavi',
    descripcion: 'Batalla clave en la consolidación de la independencia.',
    lat: -17.55,
    lng: -67.1167,
  }
]

onMounted(() => {
  const map = L.map('map').setView([-16.2902, -63.5887], 5)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  // Agregar los marcadores
  hechos.forEach(hecho => {
    L.marker([hecho.lat, hecho.lng]).addTo(map)
      .bindPopup(`<strong>${hecho.nombre}</strong><br>${hecho.descripcion}`)
  })
})
//............................
onMounted(() => {
  const el = document.querySelector('#carouselExample');
  if (el) new bootstrap.Carousel(el, { interval: 5000 });



  
});
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Bicentenario Bolivia</h1>
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
      </div>
      <div class="carousel-inner rounded">
        <div class="carousel-item active">
          <img src="https://i.pinimg.com/736x/ec/45/7f/ec457f7648d5aa0c33e18f86f47da3fa.jpg" class="d-block w-100" alt="Imágen 1"/>
        </div>
        <div class="carousel-item">
          <img src="https://i.pinimg.com/736x/2e/12/db/2e12dba4c994f7f067b9e9f255d752f1.jpg" class="d-block w-100" alt="Imágen 2"/>
        </div>
        <div class="carousel-item">
          <img src="https://i.pinimg.com/736x/aa/e9/8f/aae98fd8eea3965650436e9578429927.jpg" class="d-block w-100" alt="Imágen 3"/>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
    <!-- div class para el leaflet map -->
    <div id="map" style="height: 500px;"></div>
    <!-- ............................ -->
  </div>

</template>
<style scoped>
/* Estilo para el leaflet  */
#map {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}
/* ........................... */
.carousel img { max-height:400px; object-fit:fill; }
</style>