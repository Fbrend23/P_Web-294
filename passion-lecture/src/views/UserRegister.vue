<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { ref } from 'vue'
import { apiRegisterUser } from '@/api/user'
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const errors = ref([])

async function register() {
  errors.value = []

  try {
    if (username.value === '' || password.value === '') {
      errors.value = ['Veuillez remplir tous les champs']
      return
    }
    await apiRegisterUser({ username: username.value, hash_password: password.value }).then(
      async () => {
        await auth.login({ username: username.value, hash_password: password.value })
        router.push('/')
      },
    )
  } catch (e) {
    // console.log(e)
    console.log(e.response.data.errors)
    e.response.data.errors.forEach((error) => {
      if (error.message === 'The username has already been taken') {
        errors.value.push("Ce nom d'utilisateur existe déjà.")
      }
      if (error.message === 'The username field must have at least 3 characters') {
        errors.value.push("Le nom d'utilisateur doit contenir au moins 3 caractère")
      }
      if (error.message === 'The username field must not be greater than 32 characters') {
        errors.value.push("Le nom d'utilisateur ne doit pas dépasser 32 caractères")
      }
      if (error.message === 'The hash_password field must have at least 8 characters') {
        errors.value.push('Le mot de passe doit contenir au moins 8 caractères')
      }
      if (error.message === 'The hash_password field must not be greater than 512 characters') {
        errors.value.push('Le mot de passe ne doit pas dépasser 512 caractères')
      }
    })
  }
}
</script>
<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <div class="card shadow border-0 p-4" style="width: 100%; max-width: 400px;">
      <h2 class="card-title text-center mb-4 display-6">S'enregistrer</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label fw-bold">Nom d'utilisateur</label>
          <input type="text" class="form-control" v-model="username" required />
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Mot de passe</label>
          <input type="password" class="form-control" v-model="password" required />
        </div>
        <div v-if="errors.length > 0" class="alert alert-danger">
          <ul class="mb-0 ps-3">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
        <button type="submit" class="btn btn-dark w-100 rounded-pill py-2 mt-2 fw-bold">Créer un compte</button>
      </form>
    </div>
  </div>
</template>
