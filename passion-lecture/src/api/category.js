import { api } from './axios'

export function apiGetAllCategories() {
  return api.get('/categories')
}

export function apiGetAllAuthors() {
  return api.get('/authors')
}
