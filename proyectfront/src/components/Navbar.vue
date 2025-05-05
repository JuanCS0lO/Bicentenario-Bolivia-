<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">Bicentenario Bolivia</router-link>
        <div class="d-flex">
          <template v-if="!auth.token">
            <router-link class="btn btn-outline-primary me-2" to="/login">Login</router-link>
            <router-link class="btn btn-success" to="/register">Register</router-link>
          </template>
          <template v-else>
            <router-link class="btn btn-outline-success me-2" to="/personajes">Personajes</router-link>
            <router-link class="btn btn-outline-success me-2" to="/ciudades">Ciudades</router-link>
            <router-link class="btn btn-outline-success me-2" to="/hechos">Hechos</router-link>
            <button class="btn btn-outline-danger" @click="logout">Logout</button>
          </template>
        </div>
      </div>
    </nav>
  </template>
  <script setup>
  import { useAuthStore } from '../store/authStore'
  import { useRouter } from 'vue-router'
  const auth = useAuthStore()
  const router = useRouter()
  function logout() {
    auth.clear()
    router.push('/login')
  }
  </script>