import { api } from './axios'

export function apiGetAllBooks() {
  return api.get('/books')
}

export function apiGetOneBook(bookId) {
  return api.get(`books/${bookId}`)
}

export function addBook() {
  return api.post('/books')
}

export function editBook(bookId) {
  return api.put(`books/${bookId}`)
}

export function deleteBook(bookId) {
  return api.delete(`books/${bookId}`)
}
