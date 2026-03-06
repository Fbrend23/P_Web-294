<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/api/axios'// Importe ton instance axios configurée

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
    const tokenValue = route.query.token

    if (tokenValue) {
        try {
            // 1. On stocke le token immédiatement pour que les appels API suivants soient authentifiés
            authStore.accessToken = tokenValue
            authStore.user = { username: route.query.username }
            localStorage.setItem('accessToken', tokenValue)

            // 2. On récupère les infos de l'utilisateur car Microsoft ne nous a donné que le token
            // Tu dois avoir une route comme /auth/me ou /profile sur ton Adonis
            const res = await api.get('/auth/me')

            // 3. On met à jour le user dans le store
            authStore.user = res.data
            localStorage.setItem('user', JSON.stringify(res.data))

            // 4. Redirection vers la home
            router.push({ name: 'home' })
        } catch (error) {
            console.error("Erreur lors de la récupération du profil:", error)
            router.push({ name: 'login', query: { error: 'profile_failed' } })
        }
    } else {
        router.push({ name: 'login' })
    }
})
</script>

<template>
    <div style="text-align: center; margin-top: 50px;">
        <p>Finalisation de la connexion avec Microsoft...</p>
    </div>
</template>