<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

async function logout() {
  await auth.logout()
  router.push('/')
}
</script>
<template>
  <div id="popup">
    <div id="profile">
      <div id="profile-infos">
        <img src="@/assets/icons/profile-icon.svg" alt="profile-icon" />
        <p>Username</p>
      </div>
      <router-link :to="{ name: 'userPage', params: { id: auth.user.id } }" id="profile-link"
        >Voir son profil</router-link
      >
    </div>
    <div id="parameters">
      <router-link :to="{ name: 'userBook' }" class="link">
        <img src="@/assets/icons/book-open.svg" alt="books" />
        <p>Gérer vos ouvrages</p>
      </router-link>
      <a href="#" class="link">
        <img src="@/assets/icons/logout.svg" alt="logout" />
        <button @click="logout">Se déconnecter</button>
      </a>
    </div>
  </div>
</template>
<style scoped>
#popup {
  position: absolute;
  background-color: #1c1c1c;
  color: #fafafa;
  right: 8.5vw;
  margin-top: 2px;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12vw;
}

#parameters {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: solid #fafafa 3px;
  margin-bottom: 10px;
  width: 13vw;
}

#profile-infos {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#profile-infos img {
  margin-right: 10px;
}

#profile-link {
  margin: 5px 0px;
  text-decoration: none;
  color: #3770ff;
}

#profile-link:hover {
  color: #fafafa;
}

.link {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fafafa;
  text-decoration: none;
}

.link:hover {
  color: #42d21a;
}

#parameters a img {
  margin-right: 10px;
}
</style>
