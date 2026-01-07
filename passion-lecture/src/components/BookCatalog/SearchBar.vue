<script setup>
import { defineProps } from 'vue'
const props = defineProps(['filters'])
const search = ''

function searchBooks(search) {
  props.filters.search = search
}
</script>
<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      @keyup.enter="searchBooks(search)"
      placeholder="Rechercher"
      v-model="search"
      aria-label="Recherche"
    />
    <button class="btn btn-primary" type="button" @click="searchBooks(search)">Rechercher</button>
  </div>
</template>
