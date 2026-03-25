import { api } from '../../../shared/api/client'
import type { Group } from '../model/types'

export const groupApi = {
  getGroups: () => api.get<Group[]>('/groups'),
}