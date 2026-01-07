<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/Essentials/NavBar/NavBar.vue'
import FooterComponent from './components/Essentials/Footer/FooterComponent.vue'
</script>
<template>
  <div id="body" class="d-flex flex-column min-vh-100">
    <header>
      <NavBar />
    </header>
    <main class="container flex-grow-1 my-4 border border-black bg-dark-subtle">
      <RouterView />
    </main>

    <FooterComponent />
  </div>
</template>
