<!-- src/views/CiudadDetalle.vue -->
<template>
  <div class="ciudad-container">
    <!-- Loading state -->
    <div v-if="!ciudad && !error" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Cargando información de la ciudad...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-container">
      <h2>Error al cargar la ciudad</h2>
      <p>{{ error }}</p>
      <button @click="$router.go(-1)" class="btn-regresar">← Regresar</button>
    </div>

    <!-- Ciudad content -->
    <div v-else class="ciudad-content">
      <!-- Header con gradiente -->
      <div class="ciudad-header">
        <h1>{{ ciudad.nombre }}</h1>
        <p class="subtitulo">Descubre la historia y cultura de esta importante ciudad</p>
      </div>

      <!-- Contenido principal -->
      <div class="ciudad-main">
        <div class="ciudad-card">
          <!-- Imagen de la ciudad -->
          <div class="imagen-container">
            <img 
              :src="ciudad.imagen || '/api/placeholder/400/300'" 
              :alt="`Vista de ${ciudad.nombre}`" 
              class="ciudad-foto"
              @error="handleImageError"
            />
            <div class="imagen-overlay">
              <h3>{{ ciudad.nombre }}</h3>
            </div>
          </div>

          <!-- Información de la ciudad -->
          <div class="info-container">
            <!-- Descripción principal -->
            <div class="info-section">
              <h3>Acerca de {{ ciudad.nombre }}</h3>
              <p class="descripcion">{{ ciudad.descripcion || 'Información no disponible' }}</p>
            </div>

            <!-- Datos adicionales si existen -->
            <div v-if="hasAdditionalData" class="info-section">
              <h3>Datos Adicionales</h3>
              <div class="datos-grid">
                <div v-if="ciudad.poblacion" class="dato-item">
                  <span class="dato-label">Población:</span>
                  <span class="dato-valor">{{ formatNumber(ciudad.poblacion) }} habitantes</span>
                </div>
                <div v-if="ciudad.altitud" class="dato-item">
                  <span class="dato-label">Altitud:</span>
                  <span class="dato-valor">{{ ciudad.altitud }} m.s.n.m.</span>
                </div>
                <div v-if="ciudad.fundacion" class="dato-item">
                  <span class="dato-label">Fundación:</span>
                  <span class="dato-valor">{{ formatDate(ciudad.fundacion) }}</span>
                </div>
                <div v-if="ciudad.superficie" class="dato-item">
                  <span class="dato-label">Superficie:</span>
                  <span class="dato-valor">{{ ciudad.superficie }} km²</span>
                </div>
              </div>
            </div>

            <!-- Enlaces y acciones -->
            <div class="acciones-section">
              <div class="enlaces">
                <a 
                  v-if="ciudad.linkRef" 
                  :href="ciudad.linkRef" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn-link"
                >
                  📖 Más información
                </a>
                <a 
                  v-if="ciudad.sitioWeb" 
                  :href="ciudad.sitioWeb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn-link"
                >
                  🌐 Sitio oficial
                </a>
              </div>
              
              <button @click="$router.go(-1)" class="btn-regresar">
                ← Regresar al mapa
              </button>
            </div>
          </div>
        </div>

        <!-- Sección de características destacadas -->
        <div v-if="ciudad.caracteristicas" class="caracteristicas-section">
          <h3>Características Destacadas</h3>
          <div class="caracteristicas-grid">
            <div 
              v-for="(caracteristica, index) in ciudad.caracteristicas" 
              :key="index"
              class="caracteristica-item"
            >
              <div class="caracteristica-icon">🏛️</div>
              <p>{{ caracteristica }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Debug info (remover en producción) -->
    <div v-if="showDebug && ciudad" class="debug-section">
      <h4>Información de Debug:</h4>
      <pre>{{ ciudad }}</pre>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const ciudad = ref(null)
const error = ref(null)
const showDebug = ref(false) // Cambiar a true para mostrar debug

const hasAdditionalData = computed(() => {
  if (!ciudad.value) return false
  return ciudad.value.poblacion || ciudad.value.altitud || ciudad.value.fundacion || ciudad.value.superficie
})

onMounted(async () => {
  const id = route.params.id
  try {
    const { data } = await api.get(`/ciudades/${id}`)
    ciudad.value = data
    console.log("Ciudad recibida:", ciudad.value.nombre)
  } catch (err) {
    console.error('Error cargando ciudad:', err)
    error.value = 'No se pudo cargar la información de la ciudad'
  }
})

const handleImageError = (event) => {
  // Imagen placeholder si falla la carga
  event.target.src = '/api/placeholder/400/300'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatNumber = (number) => {
  if (!number) return ''
  return new Intl.NumberFormat('es-ES').format(number)
}
</script>

<style scoped>
/* Contenedor principal */
.ciudad-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 2rem;
}

/* Loading state */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #8b0000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.2rem;
  color: #666;
}

/* Error state */
.error-container {
  max-width: 600px;
  margin: 3rem auto;
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.error-container h2 {
  color: #8b0000;
  margin-bottom: 1rem;
}

/* Header con gradiente */
.ciudad-header {
  background: linear-gradient(to right, #8b0000, #b22222);
  color: white;
  text-align: center;
  padding: 3rem 1rem 2rem;
  box-shadow: 0 2px 15px rgba(0,0,0,0.2);
  margin-bottom: 2rem;
}

.ciudad-header h1 {
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitulo {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

/* Contenido principal */
.ciudad-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.ciudad-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  overflow: hidden;
  margin-bottom: 2rem;
}

/* Contenedor de imagen */
.imagen-container {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.ciudad-foto {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.ciudad-foto:hover {
  transform: scale(1.05);
}

.imagen-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 2rem;
}

.imagen-overlay h3 {
  font-size: 1.8rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

/* Información de la ciudad */
.info-container {
  padding: 2rem;
}

.info-section {
  margin-bottom: 2rem;
}

.info-section h3 {
  color: #8b0000;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #8b0000;
  padding-bottom: 0.5rem;
}

.descripcion {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  text-align: justify;
}

/* Grid de datos */
.datos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.dato-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;
  border-left: 4px solid #8b0000;
  transition: transform 0.2s ease;
}

.dato-item:hover {
  transform: translateX(5px);
}

.dato-label {
  font-weight: bold;
  color: #8b0000;
  margin-right: 1rem;
  min-width: 80px;
}

.dato-valor {
  color: #333;
}

/* Enlaces y acciones */
.acciones-section {
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.enlaces {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-link {
  background: linear-gradient(135deg, #8b0000, #b22222);
  color: white;
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(139, 0, 0, 0.3);
  display: inline-block;
}

.btn-link:hover {
  background: linear-gradient(135deg, #a00000, #c33333);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(139, 0, 0, 0.4);
  text-decoration: none;
  color: white;
}

.btn-regresar {
  background: linear-gradient(to right, #666, #888);
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.btn-regresar:hover {
  background: linear-gradient(to right, #777, #999);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Características destacadas */
.caracteristicas-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  padding: 2rem;
  margin-bottom: 2rem;
}

.caracteristicas-section h3 {
  color: #8b0000;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border-bottom: 2px solid #8b0000;
  padding-bottom: 0.5rem;
}

.caracteristicas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.caracteristica-item {
  display: flex;
  align-items: center;
  padding: 1.2rem;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.caracteristica-item:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.caracteristica-icon {
  font-size: 2rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.caracteristica-item p {
  margin: 0;
  color: #333;
  line-height: 1.5;
}

/* Sección debug */
.debug-section {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.debug-section h4 {
  color: #8b0000;
  margin-bottom: 1rem;
}

.debug-section pre {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  overflow-x: auto;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .ciudad-header h1 {
    font-size: 2.2rem;
  }
  
  .subtitulo {
    font-size: 1rem;
  }
  
  .ciudad-main {
    padding: 0 0.5rem;
  }
  
  .info-container {
    padding: 1.5rem;
  }
  
  .datos-grid {
    grid-template-columns: 1fr;
  }
  
  .dato-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .dato-label {
    margin-right: 0;
    margin-bottom: 0.5rem;
    min-width: auto;
  }
  
  .acciones-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .enlaces {
    justify-content: center;
  }
  
  .caracteristicas-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 480px) {
  .ciudad-header {
    padding: 2rem 1rem 1.5rem;
  }
  
  .ciudad-header h1 {
    font-size: 1.8rem;
  }
  
  .info-container {
    padding: 1rem;
  }
  
  .caracteristicas-section {
    padding: 1.5rem;
  }
  
  .caracteristica-item {
    padding: 1rem;
  }
}
</style>