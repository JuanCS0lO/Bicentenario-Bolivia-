<script setup>
import { onMounted } from 'vue';
import * as bootstrap from 'bootstrap';
//para el mapa leaflet
import L from 'leaflet';
import LineaDeTiempo from './LineaDeTiempo.vue'

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
// vector de prueba
const hechos = [
  {
    nombre: 'Proclamación de Independencia',
    descripcion: 'El 6 de agosto de 1825 se proclamó la independencia de Bolivia.',
    lat: -19.0333,
    lng: -65.2627,
  },
  {
    nombre: 'Revolución de La Paz',
    descripcion: 'El 16 de julio de 1809, se inició la lucha por la independencia.',
    lat: -16.5,
    lng: -68.15,
  },
  {
    nombre: 'Batalla de Ingavi',
    descripcion: 'Victoria boliviana en 1841 contra Perú, consolidando la independencia.',
    lat: -17.55,
    lng: -67.1167,
  },
  {
    nombre: 'Revolución de Cochabamba',
    descripcion: 'El 14 de septiembre de 1810, Cochabamba se rebeló contra la corona española.',
    lat: -17.3895,
    lng: -66.1568,
  },
  {
    nombre: 'Revolución de Santa Cruz',
    descripcion: 'El 24 de septiembre de 1810, Santa Cruz se unió a la causa independentista.',
    lat: -17.7833,
    lng: -63.1833,
  },
  {
    nombre: 'Combate de Aroma',
    descripcion: 'En 1810, los patriotas vencieron al ejército español en Aroma, La Paz.',
    lat: -17.0,
    lng: -67.5,
  },
  {
    nombre: 'Muerte de Túpac Katari',
    descripcion: 'Ejecutado en 1781 tras liderar un cerco revolucionario en La Paz.',
    lat: -16.5,
    lng: -68.15,
  },
  {
    nombre: 'Ejecutan a Bartolina Sisa',
    descripcion: 'Heroína indígena capturada y asesinada por los realistas en 1782.',
    lat: -16.5,
    lng: -68.15,
  },
  {
    nombre: 'Fundación de la República',
    descripcion: 'La Asamblea de 1825 declara a Bolivia como una república libre.',
    lat: -19.0333,
    lng: -65.2627,
  },
  {
    nombre: 'Batalla del Alto de la Alianza',
    descripcion: 'Derrota boliviano-peruana en la Guerra del Pacífico (1880).',
    lat: -17.9731,
    lng: -70.2328,
  },
  {
    nombre: 'Guerra del Chaco',
    descripcion: 'Conflicto entre Bolivia y Paraguay (1932-1935) por el Chaco Boreal.',
    lat: -21.0,
    lng: -63.0,
  },
  {
    nombre: 'Nacionalización del Estaño',
    descripcion: 'Víctor Paz Estenssoro nacionaliza las minas en 1952.',
    lat: -18.4167,
    lng: -66.6,
  },
  {
    nombre: 'Revolución Nacional de 1952',
    descripcion: 'Proceso que transformó Bolivia con voto universal y reforma agraria.',
    lat: -16.5,
    lng: -68.15,
  },
  {
    nombre: 'Muerte de Che Guevara',
    descripcion: 'Fue capturado y ejecutado en La Higuera, Santa Cruz en 1967.',
    lat: -18.7667,
    lng: -64.2167,
  },
  {
    nombre: 'Masacre de San Juan',
    descripcion: 'Represión contra mineros en 1967 en Siglo XX y Catavi.',
    lat: -18.4167,
    lng: -66.6,
  },
  {
    nombre: 'Creación del Alto como ciudad',
    descripcion: 'El Alto se convirtió oficialmente en ciudad en 1985.',
    lat: -16.5000,
    lng: -68.1833,
  },
  {
    nombre: 'Octubre Negro',
    descripcion: 'Masacre en El Alto y La Paz durante las protestas de 2003.',
    lat: -16.5,
    lng: -68.15,
  },
  {
    nombre: 'Primera Constitución del Estado Plurinacional',
    descripcion: 'En 2009 se promulga la nueva constitución que refunda Bolivia.',
    lat: -16.5,
    lng: -68.15,
  }
]

//......................................................
onMounted(() => {
  const map = L.map('map').setView([-16.2902, -63.5887], 5)
map.setMaxBounds([
  [-22.9, -70.0], // suroeste de Bolivia
  [-9.5, -57.5]   // noreste de Bolivia
]);
map.setMinZoom(5);
map.setMaxZoom(10);


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
    <h1 class="text-center mapa">Mapa Hechos Historicos</h1>
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3"></button>
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
        <div class="carousel-item">
          <img src="/images/I1.jpg" class="d-block w-100" alt="Imágen 4"/>
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
    <h2 class="text-center mt-5 LT">Línea de Tiempo Histórica</h2>
<LineaDeTiempo />

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
.LT{
  top: 0;
  left: 100;
  right: 200; 
  bottom: 500;
  background: rgb(137, 51, 51);
  color: white;
}
.mapa{
  top: 0;
  left: 100;
  right: 200; 
  bottom: 500;
  background: rgb(137, 51, 51);
  color: white;
}
/* ........................... */
.carousel img { max-height:400px; object-fit:fill; }
</style>