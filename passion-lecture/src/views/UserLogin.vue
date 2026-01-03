<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { ref } from 'vue'

const auth = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref(null)

async function login() {
  error.value = null

  try {
    await auth.login({ username: username.value, hash_password: password.value })
    router.push('/')
  } catch (e) {
    error.value = 'Invalid username or password'
  }
}
</script>
<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <div class="card shadow border-0 p-4" style="width: 100%; max-width: 400px;">
      <h2 class="card-title text-center mb-4 display-6">Se connecter</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label fw-bold">Nom d'utilisateur</label>
          <input type="text" class="form-control" v-model="username" required />
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Mot de passe</label>
          <input type="password" class="form-control" v-model="password" required />
        </div>
        <p v-if="error" class="text-danger text-center mb-3">{{ error }}</p>
        <button type="submit" class="btn btn-dark w-100 rounded-pill py-2 mt-2 fw-bold">Se connecter</button>
      </form>
    </div>
  </div>
</template>
