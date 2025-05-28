<template>
    <div class="container mt-5" style="max-width: 400px;">
      <h2>Registro de Usuario</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input v-model="nombre" type="text" id="name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="ap_pat" class="form-label">Apellido Paterno</label>
          <input v-model="ap_p" type="text" id="ap_pat" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="ap_mat" class="form-label">Apellido Materno</label>
          <input v-model="ap_m" type="text" id="ap_mat" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="Username" class="form-label">Nombre de Usuario</label>
          <input v-model="username" type="text" id="Username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input v-model="password" type="password" id="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success w-100">Registrarse</button>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </form>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  import api from '../services/api'
  import { useRouter } from 'vue-router'
  const nombre = ref(''); 
  const ap_p = ref(''); 
  const ap_m = ref('');
  const username = ref('');
  const password = ref('');
  const error = ref(null)
  const router = useRouter()
  async function register() {
    error.value = null
    try {
      await api.post('/auth/register', { nombre: nombre.value,ap_pat: ap_p.value, ap_mat: ap_m.value, username: username.value, contrasenia: password.value})
      router.push('/login')
    } catch (e) {
      error.value = e.response?.data?.message || 'Error al registrar'
    }
  }
  </script>