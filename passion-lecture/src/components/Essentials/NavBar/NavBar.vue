<script setup>
import { ref } from 'vue'
import NavBarPopup from './NavBarPopup.vue'

const connected = true
const popup = ref(false)

function showPopup() {
  popup.value = !popup.value
  console.log(popup.value)
}
</script>
<template>
  <nav>
    <h1>Passion lecture</h1>
    <div class="nav-div">
      <a href="#" class="nav-link">Accueil</a>
      <a href="#" class="nav-link">Catalogue</a>
    </div>
    <div v-if="!connected" class="nav-div">
      <a href="#" class="nav-link">S'inscrire</a>
      <a href="#" class="nav-btn">Se connecter</a>
    </div>
    <div v-else class="nav-div">
      <a href="#" class="nav-btn">+ Créer</a>
      <button @click="showPopup">
        <img src="@/assets/icons/profile-icon.svg" alt="profile" />
      </button>
    </div>
  </nav>
  <NavBarPopup v-if="popup"></NavBarPopup>
</template>
<style scoped>
nav {
  display: flex;
  flex-direction: row;
  width: 80vw;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  background-color: #1c1c1c;
  color: #fafafa;
  padding: 0px 30px;
  border-radius: 30px;
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
