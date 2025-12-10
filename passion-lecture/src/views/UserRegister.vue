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
  <h2>S'enregistrer</h2>
  <form @submit.prevent="register">
    <label for="username">Nom d'utilisateur</label>
    <input type="text" name="username" v-model="username" />
    <label for="password">Mot de passe</label>
    <input type="password" name="password" v-model="password" />
    <p v-for="error in errors" class="error">{{ error }}</p>
    <button type="submit">Submit</button>
  </form>
</template>
<style></style>
