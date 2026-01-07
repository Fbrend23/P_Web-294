import { api } from './axios'

export function apiGetAllComments(bookId) {
  return api.get(`/books/${bookId}/comments`)
}

export function apiAddAComments(bookId, value) {
  return api.post(`/books/${bookId}/comments`, { content: value })
}
