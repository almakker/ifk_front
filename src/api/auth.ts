import { api } from 'src/boot/axios'
import type { LoginCredentials, AuthResponse } from './types/auth'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/api/login', credentials)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/api/logout')
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/user')
    return response.data
  }
} 