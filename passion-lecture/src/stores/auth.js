import { defineStore } from 'pinia'
import { apiLoginUser, apiLogoutUser, apiRegisterUser } from '@/api/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null || localStorage.getItem('accessToken'),
    user: JSON.parse(localStorage.getItem('user') || null),
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getUser: (state) => state.user,
    getAccessToken: (state) => state.accessToken,
  },

  actions: {
    async login(request) {
      const res = await apiLoginUser(request)

      const { token, ...user } = res.data

      this.accessToken = token.token
      this.user = user

      localStorage.setItem('accessToken', token)
      localStorage.setItem('user', JSON.stringify(user))
    },
  },
})
