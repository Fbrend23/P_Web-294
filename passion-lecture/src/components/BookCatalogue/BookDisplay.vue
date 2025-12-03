<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps(['bookInfo'])

const book = props.bookInfo

console.log(book)
</script>
<template>
  <tr>
    <td>
      <router-link :to="{ name: 'bookShow', params: { id: book.id } }">
        {{ book.title }}
      </router-link>
    </td>
    <td>{{ book.author.firstName }} {{ book.author.lastName }}</td>
    <td>{{ book.user.username }}</td>
  </tr>
</template>
<style scoped></style>
