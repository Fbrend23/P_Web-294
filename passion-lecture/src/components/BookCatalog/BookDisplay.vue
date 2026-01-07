<script setup>
import { defineProps } from 'vue'

const props = defineProps(['bookInfo'])

const book = props.bookInfo
</script>
<template>
  <tr>
    <td>
      <router-link :to="{ name: 'bookShow', params: { id: book.id } }" class="text-decoration-none fw-bold text-dark">
        {{ book.title }}
      </router-link>
    </td>
    <td>{{ book.author.firstName }} {{ book.author.lastName }}</td>
    <td><span class="badge bg-info text-dark">{{ book.category.label }}</span></td>
    <td class="text-muted">{{ book.user.username }}</td>
    <td class="text-muted small">
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
