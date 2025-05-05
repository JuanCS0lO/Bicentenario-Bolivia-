import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: localStorage.getItem('jwt') || null }),
  actions: {
    setToken(t) {
      this.token = t
      localStorage.setItem('jwt', t)
    },
    clear() {
      this.token = null
      localStorage.removeItem('jwt')
    }
  }
})