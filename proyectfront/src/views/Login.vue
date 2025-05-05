<template>
    <div class="container mt-5" style="max-width: 400px;">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Usuario</label>
          <input v-model="username" id="username" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="contrasenia" class="form-label">Contraseña</label>
          <input v-model="contrasenia" id="contrasenia" type="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Ingresar</button>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </form>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  import api from '../services/api'
  import { useAuthStore } from '../store/authStore'
  import { useRouter } from 'vue-router'
  const username = ref(''); const contrasenia = ref(''); const error = ref(null)
  const auth = useAuthStore(); const router = useRouter()
  async function login() {
    error.value = null
    try {
      const { data } = await api.post('/auth/login', { username: username.value, contrasenia: contrasenia.value })
      auth.setToken(data.token)
      router.push('/')
    } catch (e) {
      error.value = e.response?.data?.message || 'Error en inicio de sesión'
    }
  }
  </script>