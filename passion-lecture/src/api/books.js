import { api } from './axios'

export function apiGetAllBooks() {
  return api.get('/books')
}

export function apiGetOneBook(bookId) {
  return api.get(`books/${bookId}`)
}

export function apiAddBook() {
  return api.post('/books')
}

export function apiEditBook(bookId) {
  return api.put(`books/${bookId}`)
}

export function apiDeleteBook(bookId) {
  return api.delete(`books/${bookId}`)
}
