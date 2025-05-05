import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import PersonajesView from '../views/Personajes.vue';
import CiudadesView from '../views/Ciudades.vue';
import HechosView from '../views/Hechos.vue';
import AboutView from '../views/AboutView.vue';

const routes = [
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  // Home is public, shows carousel without login
  { path: '/', name: 'Home', component: Home },
  { path: '/personajes', name: 'Personajes', component: PersonajesView, meta: { requiresAuth: true } },
  { path: '/ciudades', name: 'Ciudades', component: CiudadesView, meta: { requiresAuth: true } },
  { path: '/hechos', name: 'Hechos', component: HechosView, meta: { requiresAuth: true } },
  { path: '/about', name: 'About', component: AboutView }
];

const router = createRouter({ history: createWebHistory(), routes });

// Global guard: protect only routes with requiresAuth
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt');
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }
  next();
});

export default router;