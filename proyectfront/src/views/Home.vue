<script setup>
import api from '../services/api';
import { ref, onMounted ,nextTick} from 'vue';
import * as bootstrap from 'bootstrap';
//para el mapa leaflet
import L from 'leaflet';
import LineaDeTiempo from './LineaDeTiempo.vue'


import Lt from './Lt.vue'

const nuevaImagen = ref('')

const imagenesCarrusel = ref([])


function agregarImagen() {
  if (nuevaImagen.value.trim() !== '') {
    imagenesCarrusel.value.push(nuevaImagen.value.trim())
    localStorage.setItem('imagenesCarrusel', JSON.stringify(imagenesCarrusel.value))
    nuevaImagen.value = ''
    cerrarModal('modalAgregarImagen')
    reiniciarCarrusel()
  }
}

const indiceAEliminar = ref('')

function borrarImagen() {
  if (indiceAEliminar.value !== '') {
    const index = parseInt(indiceAEliminar.value)
    imagenesCarrusel.value.splice(index, 1)
    localStorage.setItem('imagenesCarrusel', JSON.stringify(imagenesCarrusel.value))
    indiceAEliminar.value = ''
    
    // 🔁 Reinicia el carrusel después de que Vue reactive la lista
    nextTick(() => {
      aplicarClaseActiveCarrusel()
      reiniciarCarrusel()
      cerrarModal('modalBorrarImagen')
    })
  }
}

function aplicarClaseActiveCarrusel() {
  const items = document.querySelectorAll('#carouselExample .carousel-item')
  const indicators = document.querySelectorAll('#carouselExample .carousel-indicators button')

  items.forEach((el, idx) => el.classList.toggle('active', idx === 0))
  indicators.forEach((el, idx) => el.classList.toggle('active', idx === 0))
}



function cerrarModal(idModal) {
  const modalEl = document.getElementById(idModal)

  const existing = bootstrap.Modal.getInstance(modalEl)
    || new bootstrap.Modal(modalEl)
  existing.hide()

  // Limpia el backdrop si queda opaco
  setTimeout(() => {
    document.body.classList.remove('modal-open')
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
  }, 200)
}


function reiniciarCarrusel() {
  nextTick(() => {
    const el = document.querySelector('#carouselExample')
    if (el) {
      const prevInstance = bootstrap.Carousel.getInstance(el)
      if (prevInstance) {
        prevInstance.dispose()
      }
      new bootstrap.Carousel(el, { interval: 5000 })
    }
  })
}





const personajes = ref([])

const isAdmin = ref(false)
const estaLogeado = ref(false)

const formatDate = (fecha) => {
  const date = new Date(fecha)
  return isNaN(date) ? 'Fecha inválida' : date.toLocaleDateString()
}


onMounted(async () => {
  // Cargar imágenes del localStorage o valores por defecto
  const guardadas = localStorage.getItem('imagenesCarrusel')
  imagenesCarrusel.value = guardadas
    ? JSON.parse(guardadas)
    : [
        'https://i.pinimg.com/736x/ec/45/7f/ec457f7648d5aa0c33e18f86f47da3fa.jpg',
        'https://i.pinimg.com/736x/2e/12/db/2e12dba4c994f7f067b9e9f255d752f1.jpg',
        'https://i.pinimg.com/736x/aa/e9/8f/aae98fd8eea3965650436e9578429927.jpg',
        '/images/I1.jpg'
      ]

  // Obtener rol
  const rolGuardado = parseInt(localStorage.getItem('rol'))
  isAdmin.value = rolGuardado === 1

  // Obtener hechos históricos
  const resp = await api.get('/hechos')
  personajes.value = resp.data

  // Crear el mapa
  const map = L.map('map').setView([-16.2902, -63.5887], 5)
  map.setMaxBounds([[-22.9, -70.0], [-9.5, -57.5]])
  map.setMinZoom(5)
  map.setMaxZoom(10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  personajes.value.forEach(personaje => {
    L.marker([personaje.lat, personaje.lng]).addTo(map)
      .bindPopup(`<strong>${personaje.nombre}</strong><br>${personaje.descripcion}`)
  })

  // Inicializar carrusel Bootstrap
  const el = document.querySelector('#carouselExample')
  if (el) new bootstrap.Carousel(el, { interval: 5000 })
})


</script>


<template>
  <div class="container mt-4">
    <h1 id="lbBicen" class="text-center mb-4">Bicentenario Bolivia</h1>
    <h1 class="text-center mapa">Mapa Hechos Historicos</h1>

<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
  <button
    v-for="(img, index) in imagenesCarrusel"
    :key="index"
    type="button"
    data-bs-target="#carouselExample"
    :data-bs-slide-to="index"
    :class="{ active: index === 0 }"
    aria-current="true"
    :aria-label="'Slide ' + (index + 1)">
  </button>
</div>

      <div class="carousel-inner rounded">
  <div
    class="carousel-item"
    v-for="(img, index) in imagenesCarrusel"
    :class="{ active: index === 0 }"
    :key="img"
  >
    <img :src="img" class="d-block w-100" :alt="'Imagen ' + (index + 1)" />
  </div>
</div>


      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>

<div class="text-center mt-3 mb-4" v-if="isAdmin">
  <button class="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#modalAgregarImagen">
    Agregar imagen
  </button>
  <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalBorrarImagen">
  Borrar imagen
</button>
</div>



    <!-- div class para el leaflet map -->
    <div id="map" style="height: 500px;"></div>
    <h2 class="text-center mt-5 LT">Línea de Tiempo Histórica</h2>

    <Lt/>

    <!-- <LineaDeTiempo /> -->

    <!-- ............................ -->

  <!-- Modal Agregar Imagen -->
<div class="modal fade" id="modalAgregarImagen" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalLabel">Agregar nueva imagen al carrusel</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <label for="nuevaImagen" class="form-label">URL de la imagen:</label>
        <input v-model="nuevaImagen" type="text" id="nuevaImagen" class="form-control" placeholder="https://...">
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button class="btn btn-primary" @click="agregarImagen">Agregar</button>
      </div>
    </div>
  </div>
</div>



<!-- Modal Borrar Imagen -->
<div class="modal fade" id="modalBorrarImagen" tabindex="-1" aria-labelledby="modalBorrarLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalBorrarLabel">Borrar imagen del carrusel</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <p>Seleccione la imagen que desea eliminar:</p>
        <select v-model="indiceAEliminar" class="form-select">
  <option disabled value="">Seleccione una imagen</option>
  <option v-for="(img, index) in imagenesCarrusel" :key="index" :value="index">
    Imagen {{ index + 1 }} - {{ img }}
  </option>
</select>

      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button class="btn btn-danger" @click="borrarImagen">Borrar</button>
      </div>
    </div>
  </div>
</div>



<!-- <div v-else class="text-center p-5 bg-light border rounded">
  <h2 class="mb-3">¡Bienvenido a la línea de tiempo histórica de Bolivia!</h2>
  <p>Explora los hechos más importantes del país a través de un mapa interactivo y un carrusel visual.</p>
  <p class="fw-bold">Para acceder a todas las funcionalidades, por favor inicia sesión o regístrate.</p>
</div> -->

</div>

    


</template>
<style>
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