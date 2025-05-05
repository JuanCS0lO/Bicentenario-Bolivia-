<template>
    <div class="container mt-5" style="max-width: 400px;">
      <h2>Registro de Usuario</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input v-model="nombre" type="text" id="name" class="form-control" required />
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
  const nombre = ref(''); const password = ref(''); const error = ref(null)
  const router = useRouter()
  async function register() {
    error.value = null
    try {
      await api.post('/auth/register', { nombre: nombre.value, password: password.value })
      router.push('/login')
    } catch (e) {
      error.value = e.response?.data?.message || 'Error al registrar'
    }
  }
  </script>