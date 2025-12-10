import { api } from './axios'

export function apiRegisterUser({ email, username, password }) {
  return api.post('/register', { email, username, password })
}

export function apiLoginUser({ username, hash_password }) {
  return api.post('/user/login', { username, hash_password })
}

export function apiLogoutUser() {
  return api.post('/logout')
}

export function apiGetUser(userId) {
  return api.get(`users/${userId}`)
}

export function apiGetUsersAllBooks(userId) {
  return api.get(`/users/${userId}/books`)
}
