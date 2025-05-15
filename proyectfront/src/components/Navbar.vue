<template>
  <nav class="navbar navbar-expand-lg" :style="{ backgroundColor: navbarBackgroundColor }">
    <div class="container">
      <router-link class="navbar-brand" to="/">Bicentenario Bolivia</router-link>
      <div class="d-flex align-items-center">
        <router-link class="my-custom-btn me-2" to="/">Inicio</router-link>
        <template v-if="auth.token">
          <!-- <div class="dropdown me-2">
            <button class="my-custom-btn dropdown-toggle" type="button" id="exploreDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Explorar
            </button>
            <ul class="dropdown-menu" aria-labelledby="exploreDropdown">
              <li><router-link class="dropdown-item" to="/personajes">Personajes</router-link></li>
              <li><router-link class="dropdown-item" to="/ciudades">Ciudades</router-link></li>
              <li><router-link class="dropdown-item" to="/hechos">Hechos</router-link></li>
            </ul>
          </div> -->
          <router-link class="my-custom-btn me-2 me-2" to="/personajes">Personajes</router-link>
            <router-link class="my-custom-btn me-2 me-2" to="/ciudades">Ciudades</router-link>
            <router-link class="my-custom-btn me-2 me-2" to="/hechos">Hechos</router-link>
            <router-link class="my-custom-btn me-2 me-2" to="/aboutview">About Us</router-link>
          <router-link class="my-custom-btn me-2" to="/aboutview">About Us</router-link>
          <button class="btn btn-outline-danger" @click="logout">Logout</button>
        </template>
        <template v-else>
          <router-link class="btn btn-outline-primary login me-2" to="/login">Login</router-link>
          <router-link class="btn btn-success" to="/register">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { Dropdown } from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa el JS de Bootstrap

const auth = useAuthStore();
const router = useRouter();

const navbarBackgroundColor = computed(() => {
  return '#8b0000';
});

function logout() {
  auth.clear();
  router.push('/login');
}

// Asegúrate de que Bootstrap JavaScript esté inicializado (opcional, pero recomendado)
onMounted(() => {
  const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
  dropdownElementList.forEach(dropdown => new Dropdown(dropdown)); // ✅ Inicialización correcta
});
</script>

<style>
.navbar-brand {
  color: #333;
}

.my-custom-btn {
  text-align: center;
  color: #fafafa;
  background-color: #8b0000;
  border: 1px solid #8b0000;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.my-custom-btn:hover {
  background-color: #670000;
  color: white;
}

.login {
  background-color: #e3e34d;
  color: #333;
  border-color: #e3e34d;
}

.login:hover {
  background-color: #e3d14d;
  color: #333;
  border-color: #e3e34d;
}

.dropdown-menu {
  background-color: #f8f9fa; /* Un fondo claro para el dropdown */
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

.dropdown-item {
  color: #333;
  padding: 0.5rem 1rem;
  text-decoration: none;
  display: block;
}

.dropdown-item:hover {
  background-color: #e9ecef;
  color: #212529;
}
</style>