import { api } from './axios'

export function apiRegisterUser({ email, username, password }) {
  return api.post('/register', { email, username, password })
}

export function apiLoginUser({ username, password }) {
  return api.post('/login', { username, password })
}

export function apiLogoutUser() {
  return api.post('/logout')
}

export function apiGetUser(userId) {
  return api.get(`users/${userId}`)
}
