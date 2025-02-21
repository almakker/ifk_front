import { BaseApi } from './base'
import type { User } from './types/auth'

interface UpdateUserData {
  name?: string
  email?: string
}

class UsersApi extends BaseApi {
  constructor() {
    super('/users')
  }

  async getAll() {
    return this.get<User[]>()
  }

  async getById(id: number) {
    return this.get<User>(`/${id}`)
  }

  async update(id: number, data: UpdateUserData) {
    return this.put<User>(`/${id}`, data)
  }
}

export const usersApi = new UsersApi()