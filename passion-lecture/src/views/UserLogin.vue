<script setup>
// import { apiLoginUser } from '@/api/user'

// const authData = {
//   username: '',
//   password: '',
// }

// async function submit() {
//   if (authData.username === '' || authData.password === '') {
//     console.log('nuhuh')
//     return
//   }
//   await apiLoginUser({ username: authData.username, hash_password: authData.password })
// }

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
  <h2>Se connecter</h2>
  <form @submit.prevent="login">
    <label for="username">Nom d'utilisateur</label>
    <input type="text" name="username" v-model="username" />
    <label for="password">Mot de passe</label>
    <input type="password" name="password" v-model="password" />
    <p v-if="error" class="error">{{ error }}</p>
    <button type="submit">Submit</button>
  </form>
</template>
<style></style>
