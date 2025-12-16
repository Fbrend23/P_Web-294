<script setup>
import { defineProps, onMounted, ref } from 'vue'
const props = defineProps(['filters'])
const search = ''

function searchBooks(search) {
  props.filters.search = search
}
</script>
<template>
  <input type="text" @keyup.enter="searchBooks(search)" placehoder="Rechercher" v-model="search" />
  <button @click="searchBooks(search)">rechercher</button>
</template>
<style scoped>
input {
  color: black;
}

::placeholder {
  color: red;
  opacity: 1;
}
</style>
