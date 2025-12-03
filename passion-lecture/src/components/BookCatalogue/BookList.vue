<script setup>
import { apiGetAllBooks, apiGetOneBook } from '@/api/books'
import BookDisplay from '@/components/BookCatalogue/BookDisplay.vue'
import { ref, onMounted, computed } from 'vue'

const books = ref([])

const props = defineProps(['filters'])

const filters = props.filters

const booksFiltered = computed(() => {
  return true
})

const fetchBooks = async () => {
  try {
    const response = await apiGetAllBooks()

    const sorted = response.data.data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    books.value = sorted
  } catch (error) {
    console.error('Error while fetching books: ', error)
  }
}

onMounted(async () => {
  fetchBooks()
})
</script>
<template>
  <table>
    <thead>
      <tr>
        <th>Titre</th>
        <th>Auteur</th>
        <th>Créateur</th>
      </tr>
    </thead>
    <tbody>
      <p v-if="books.length === 0">Chargement....</p>
      <BookDisplay
        v-else
        v-for="(book, index) in books"
        :key="index"
        :bookInfo="book"
      ></BookDisplay>
    </tbody>
  </table>
</template>
<style scoped></style>
