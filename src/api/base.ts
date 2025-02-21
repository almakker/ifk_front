import { api } from 'src/boot/axios'

export class BaseApi {
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  protected async get<T>(path = '', params = {}) {
    const { data } = await api.get<T>(`${this.endpoint}${path}`, { params })
    return data
  }

  protected async post<T>(path = '', body = {}) {
    const { data } = await api.post<T>(`${this.endpoint}${path}`, body)
    return data
  }

  protected async put<T>(path = '', body = {}) {
    const { data } = await api.put<T>(`${this.endpoint}${path}`, body)
    return data
  }

  protected async delete<T>(path = '') {
    const { data } = await api.delete<T>(`${this.endpoint}${path}`)
    return data
  }
}