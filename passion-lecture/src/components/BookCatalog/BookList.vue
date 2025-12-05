<script setup>
import { apiGetAllBooks, apiGetCustomBooks } from '@/api/books'
import BookDisplay from '@/components/BookCatalog/BookDisplay.vue'
import { ref, onMounted, watch, defineProps, reactive } from 'vue'

const books = ref([])

const props = defineProps(['filters'])

watch(
  () => props.filters,
  async (newFilters) => {
    const { sort, category } = newFilters
    books.value = []
    const response = await apiGetCustomBooks(1, 10, sort.sort, sort.order, category, '', '')
    books.value = response.data.data
  },
  { deep: true },
)

// watchEffect(async () => {
//   const { sort, category } = filters
//   const response = await apiGetCustomBooks(1, 10, sort.sort, sort.order, category, '', '')
//   books.value = response.data.data
// })

const fetchBooks = async () => {
  try {
    const books2 = await apiGetCustomBooks(1, 10, 'title', 'asc', '', '')
    // const response = await apiGetAllBooks()

    // const sorted = response.data.data.sort((a, b) => {
    //   return new Date(b.createdAt) - new Date(a.createdAt)
    // })

    // books.value = sorted
    books.value = books2.data.data
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
        <th>Créé le</th>
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
