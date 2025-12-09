import { api } from './axios'

export function apiGetOneBookAvgEval(bookId) {
  return api.get(`/books/${bookId}/evaluations`)
}

export function apiAddAnEval(bookId, value) {
  return api.post(`/books/${bookId}/evaluations`, { note: value })
}
