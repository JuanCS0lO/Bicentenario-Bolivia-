<template>
  <div class="hecho-container">
    <!-- Header con gradiente -->
    <div class="hecho-header">
      <h1>{{ hecho?.nombre || 'Hecho Histórico' }}</h1>
      <p v-if="hecho?.fecha" class="fecha">"{{ formatDate(hecho?.fecha) }}"</p>
    </div>

    <!-- Contenido principal -->
    <div class="hecho-content">
      <div class="hecho-card">
        <!-- Imagen del hecho histórico -->
        <div class="imagen-container">
          <img 
            :src="hecho?.imagen || '/api/placeholder/400/300'" 
            :alt="`Imagen de ${hecho?.nombre}`" 
            class="hecho-foto"
            @error="handleImageError"
          />
        </div>

        <!-- Información del hecho -->
        <div class="info-container">
          <div class="info-section">
            <h3>Descripción</h3>
            <p class="descripcion">{{ hecho?.descripcion || 'Información no disponible' }}</p>
          </div>

          <!-- Datos adicionales -->
          <div v-if="hecho?.lat || hecho?.lng || hecho?.fecha || hecho?.ubicacion" class="info-section">
            <h3>Datos del Hecho</h3>
            <div class="datos-grid">
              <div v-if="hecho?.fecha" class="dato-item">
                <span class="dato-label">Fecha:</span>
                <span class="dato-valor">{{ formatDate(hecho.fecha) }}</span>
              </div>
              <div v-if="hecho?.ubicacion" class="dato-item">
                <span class="dato-label">Ubicación:</span>
                <span class="dato-valor">{{ hecho.ubicacion }}</span>
              </div>
              <div v-if="hecho?.lat && hecho?.lng" class="dato-item">
                <span class="dato-label">Coordenadas:</span>
                <span class="dato-valor">Lat {{ hecho.lat }}, Lng {{ hecho.lng }}</span>
              </div>
              <div v-if="hecho?.periodo" class="dato-item">
                <span class="dato-label">Período:</span>
                <span class="dato-valor">{{ hecho.periodo }}</span>
              </div>
            </div>
          </div>

          <!-- Enlaces y acciones -->
          <div class="acciones">
            <div class="enlaces">
              <a 
                v-if="hecho?.linkRef" 
                :href="hecho.linkRef" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn-link"
              >
                📖 Más información
              </a>
              <a 
                v-if="hecho?.lat && hecho?.lng" 
                :href="`https://www.google.com/maps?q=${hecho.lat},${hecho.lng}`" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn-link"
              >
                🗺️ Ver en mapa
              </a>
            </div>
            
            <button @click="$router.go(-1)" class="btn-regresar">
              ← Regresar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Debug info (remover en producción) -->
    <div v-if="showDebug" class="debug-section">
      <h4>Información de Debug:</h4>
      <pre>{{ hecho }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const hecho = ref(null)
const showDebug = ref(false) // Cambiar a true para mostrar debug

onMounted(async () => {
  const { id } = route.params
  try {
    const resp = await api.get(`/hechos/${id}`)
    hecho.value = resp.data
    console.log("Hecho cargado:", hecho.value)
  } catch (error) {
    console.error('Error cargando hecho histórico:', error)
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
</script>

<style scoped>
/* Contenedor principal */
.hecho-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 2rem;
}

/* Header con gradiente similar al HTML base */
.hecho-header {
  background: linear-gradient(to right, #8b0000, #b22222);
  color: white;
  text-align: center;
  padding: 3rem 1rem 2rem;
  box-shadow: 0 2px 15px rgba(0,0,0,0.2);
  margin-bottom: 2rem;
}

.hecho-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.fecha {
  font-size: 1.3rem;
  font-style: italic;
  opacity: 0.9;
  margin-top: 0.5rem;
}

/* Contenido principal */
.hecho-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hecho-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0;
  min-height: 500px;
}

/* Contenedor de imagen */
.imagen-container {
  background: linear-gradient(135deg, #8b0000, #b22222);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
}

.imagen-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.1);
  z-index: 1;
}

.hecho-foto {
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  object-fit: cover;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.hecho-foto:hover {
  transform: scale(1.02);
}

/* Información del hecho */
.info-container {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-section {
  margin-bottom: 2rem;
}

.info-section h3 {
  color: #8b0000;
  font-size: 1.4rem;
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
  gap: 1rem;
}

.dato-item {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  background: #f8f8f8;
  border-radius: 6px;
  border-left: 4px solid #8b0000;
}

.dato-label {
  font-weight: bold;
  color: #8b0000;
  margin-right: 1rem;
  min-width: 100px;
}

.dato-valor {
  color: #333;
}

/* Enlaces y acciones */
.acciones {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
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

/* Sección debug */
.debug-section {
  max-width: 1000px;
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
  .hecho-header h1 {
    font-size: 2rem;
  }
  
  .fecha {
    font-size: 1.1rem;
  }
  
  .hecho-card {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .imagen-container {
    padding: 1.5rem;
  }
  
  .hecho-foto {
    max-height: 300px;
  }
  
  .info-container {
    padding: 1.5rem;
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
  
  .acciones {
    flex-direction: column;
    align-items: stretch;
  }
  
  .enlaces {
    justify-content: center;
    margin-bottom: 1rem;
  }
}

@media screen and (max-width: 480px) {
  .hecho-header {
    padding: 2rem 1rem 1.5rem;
  }
  
  .hecho-header h1 {
    font-size: 1.7rem;
  }
  
  .hecho-content {
    padding: 0 0.5rem;
  }
  
  .info-container {
    padding: 1rem;
  }
}
</style>