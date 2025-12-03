import { api } from './axios'

export function apiGetOneBookAvgEval(bookId) {
  return api.get(`/books/${bookId}/evaluations`)
}
