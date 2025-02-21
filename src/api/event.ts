import { api } from 'src/boot/axios'
import type { HotelEventFilters, HotelEventResponse, HotelEventUser } from './types/event'

interface ApiResponse<T> {
  data: T
}

export const hotelEventsApi = {
  getEvents: async (filters: HotelEventFilters): Promise<HotelEventResponse> => {
    const response = await api.get('/api/hotel-events', { params: filters })
    return response.data
  },

  getEventTypes: async (): Promise<string[]> => {
    const response = await api.get('/api/hotel-events/types')
    return response.data
  },

  getUsers: async (): Promise<HotelEventUser[]> => {
    const response = await api.get<ApiResponse<HotelEventUser[]>>('/api/hotel-events/users')
    return response.data.data
  }
}