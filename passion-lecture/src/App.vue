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
    <main><RouterView /></main>

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
}
</style>
