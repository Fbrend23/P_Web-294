import { api } from './axios'
 
export function apiGetAllBooks() {
  return api.get('/books')
}
 
 