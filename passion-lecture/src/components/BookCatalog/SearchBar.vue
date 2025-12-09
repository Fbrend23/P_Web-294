<script setup>
import { defineProps } from 'vue'
const props = defineProps(['filters'])
const search = ''

function searchBooks(search) {
  props.filters.search = search
  console.log(props.filters)
}
</script>
<template>
  <input type="text" placehoder="Rechercher" v-model="search" />
  <button type="submit" @click="searchBooks(search)">rechercher</button>
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
