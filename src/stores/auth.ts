import { defineStore } from 'pinia'
import { authApi } from 'src/api/auth'
import type { User } from 'src/api/types/auth'
import { api } from 'src/boot/axios'
import { Cookies } from 'quasar'

interface AuthState {
  user: User | null
  token: string | null
}

const TOKEN_COOKIE_NAME = 'auth_token'
const COOKIE_OPTIONS = {
  path: '/',
  secure: Boolean(process.env.PROD),
  sameSite: 'Strict' as const
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const token = Cookies.get(TOKEN_COOKIE_NAME)
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    return {
      user: null,
      token: token || null,
    }
  },

  persist: true,

  actions: {
    setToken(token: string | null) {
      this.token = token
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        Cookies.set(TOKEN_COOKIE_NAME, token, COOKIE_OPTIONS)
      } else {
        delete api.defaults.headers.common['Authorization']
        Cookies.remove(TOKEN_COOKIE_NAME, COOKIE_OPTIONS)
      }
    },

    async login(email: string, password: string) {
      const response = await authApi.login({ email, password });
      this.user = response.user;
      this.setToken(response.access_token);
      return response;
    },

    async logout() {
      try {
        await authApi.logout();
      } finally {
        this.user = null;
        this.setToken(null);
      }
    }
  }
}) 