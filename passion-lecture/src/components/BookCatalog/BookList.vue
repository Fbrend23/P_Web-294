<script setup>
import { apiGetAllBooks, apiGetCustomBooks } from '@/api/books'
import BookDisplay from '@/components/BookCatalog/BookDisplay.vue'
import { ref, onMounted, watch, defineProps, watchEffect } from 'vue'

const books = ref([])

const props = defineProps(['filters'])

const maxPage = ref(1)

const page = ref(1)

// const fetchBooks = async () => {
//   try {
//     const books2 = await apiGetCustomBooks(1, 10, 'title', 'asc', '', '')
//     maxPage.value = books2.data.meta.lastPage
//     books.value = books2.data.data
//   } catch (error) {
//     console.error('Error while fetching books: ', error)
//   }
// }

onMounted(async () => {
  // fetchBooks()
  watchEffect(async () => {
    const { sort, category, search } = props.filters
    books.value = []
    const response = await apiGetCustomBooks(
      page.value,
      10,
      sort.sort,
      sort.order,
      category,
      search,
    )
    maxPage.value = response.data.meta.lastPage
    page.value <= maxPage ? page : 1
    books.value = response.data.data
  })
})
</script>
<template>
  <table>
    <thead>
      <tr>
        <th>Titre</th>
        <th>Auteur</th>
        <th>Catégorie</th>
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
  <div>
    <button
      v-if="page !== 1"
      @click="
        () => {
          page = page === 1 ? page : page - 1
        }
      "
    >
      <-
    </button>
    <p>Page {{ page }}</p>
    <button
      v-if="page < maxPage"
      @click="
        () => {
          page = page === maxPage ? page : page + 1
        }
      "
    >
      ->
    </button>
  </div>
</template>
<style scoped></style>
