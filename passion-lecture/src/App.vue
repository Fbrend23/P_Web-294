<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/Essentials/NavBar/NavBar.vue'
import FooterComponent from './components/Essentials/Footer/FooterComponent.vue'
</script>
<template>
  <div id="body">
    <header>
      <NavBar />
    </header>
    <main class="bg-dark-subtle my-4 border border-black">
      <RouterView />
    </main>

    <FooterComponent />
  </div>
</template>

<style scoped>
#body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 80vw;
  margin: auto;
}
</style>
