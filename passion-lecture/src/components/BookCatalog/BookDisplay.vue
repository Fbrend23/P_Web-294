<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps(['bookInfo'])

const book = props.bookInfo
</script>
<template>
  <tr>
    <td>
      <router-link :to="{ name: 'bookShow', params: { id: book.id } }">
        {{ book.title }}
      </router-link>
    </td>
    <td>{{ book.author.firstName }} {{ book.author.lastName }}</td>
    <td>{{ book.category.label }}</td>
    <td>{{ book.user.username }}</td>
    <td>
      {{
        new Date(book.createdAt).toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }}
    </td>
  </tr>
</template>
<style scoped></style>
