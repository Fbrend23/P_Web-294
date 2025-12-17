<script setup>
import { ref, computed } from 'vue'
import NavBarPopup from './NavBarPopup.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const connected = computed(() => auth.isAuthenticated)

const popup = ref(false)

function showPopup() {
  popup.value = !popup.value
}
</script>
<template>
  <nav>
    <h1>Passion lecture</h1>
    <div class="nav-div">
      <router-link :to="{ name: 'home' }" class="nav-link">Accueil</router-link>
      <router-link :to="{ name: 'bookCatalogue' }" class="nav-link">Catalogue</router-link>
    </div>
    <div v-if="!connected" class="nav-div">
      <router-link :to="{ name: 'register' }" class="nav-link">S'inscrire</router-link>
      <router-link :to="{ name: 'login' }" class="nav-btn">Se connecter</router-link>
    </div>
    <div v-else class="nav-div">
      <router-link :to="{ name: 'bookCreate' }" class="nav-btn">+ Créer</router-link>
      <button @click="showPopup">
        <img src="@/assets/icons/profile-icon.svg" alt="profile" />
      </button>
    </div>
  </nav>
  <NavBarPopup v-if="popup" @close-popup="showPopup"></NavBarPopup>
</template>
<style scoped>
nav {
  display: flex;
  flex-direction: row;
  width: 85vw;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  background-color: #1c1c1c;
  color: #fafafa;
  padding: 0px 30px;
  border-radius: 50px;
  margin-top: 20px;
}

.nav-link {
  color: #fafafa;
  text-decoration: none;
}

.nav-link:hover {
  color: #42d21a;
}

.nav-btn {
  background-color: #42d21a;
  color: #fafafa;
  text-decoration: none;
  padding: 10px;
  border-radius: 25px;
}

.nav-btn:hover {
  color: #42d21a;
  background-color: #fafafa;
}

.nav-div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 15%;
  align-items: center;
}

button {
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
}

button:hover {
  cursor: pointer;
}
</style>
