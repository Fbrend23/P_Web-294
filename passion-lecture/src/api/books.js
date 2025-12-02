import { api } from './axios'

export function apiGetAllBooks() {
  return api.get('/books')
}

export function apiGetOneBook(bookId) {
  return api.get(`/${bookId}`)
}

export function addBook() {
  return api.post('/books')
}

export function editBook(bookId) {
  return api.put(`/${bookId}`)
}

export function deleteBook(bookId) {
  return api.delete(`/${bookId}`)
}
