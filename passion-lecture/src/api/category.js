import { api } from './axios'

export function apiGetAllCategories() {
  return api.get('/categories')
}
