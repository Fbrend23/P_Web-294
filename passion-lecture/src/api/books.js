import { api } from './axios'

export function apiGetAllBooks() {
  return api.get('/books')
}

export function apiGetCustomBooks(page, limit, sort, order, categoryId, search) {
  return api.get(
    `/books?page=${page}&limit=${limit}&sort${sort}&order=${order}${categoryId !== '' ? `&categoryId=${categoryId}` : ''}${search !== '' ? `&search=${search}` : ''}`,
  )
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
