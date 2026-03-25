import { api } from '../../../shared/api/client'
import type { User } from '../model/types'


export const userApi = {
  getUsers: () => api.get<User[]>('/users'),

  createUser: (user: Omit<User, 'id'>) =>
    api.post<User, Omit<User, 'id'>>('/users', user),

  deleteUser: (id: string) =>
    api.delete(`/users/${id}`),
}