<script setup>
import { apiGetAllBooks } from '@/api/books'
import { ref, onMounted } from 'vue'

const books = ref([])
const defaultImg = '/no_cover.jpg'

const getImageUrl = (path) => {
  if (path) {
    return `${import.meta.env.VITE_API_URL}${path}`
  }
  return defaultImg
}

onMounted(async () => {
  try {
    const response = await apiGetAllBooks()

    // Sort by date in descending order (most recent → oldest)
    const sorted = response.data.data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    // Keeps the 5 latest
    books.value = sorted.slice(0, 5)
  } catch (error) {
    console.error('Error while fetching books:', error)
  }
})
</script>

<template>
  <div class="latest">
    <h2>Derniers ouvrages ajoutés</h2>

    <div v-if="books.length === 0">Chargement…</div>

    <div class="books-row">
      <div class="booksimages" v-for="book in books" :key="book.id">
        <router-link :to="{ name: 'bookShow', params: { id: book.id } }">
          <img
            class="bookimage"
            :src="getImageUrl(book.imagePath)"
            alt="bookImage"
            @error="(event) => (event.target.src = defaultImg)"
          />
          <p>{{ book.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.latest {
  max-width: 70%;
  border: 2px solid;
  padding: 20px;
  margin: 20px auto;
}
h2,
p {
  text-align: center;
  padding: 20px;
  padding: 20px;
}
a {
  text-decoration: none;
}
.books-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: nowrap;
  align-items: flex-start; /* important */
}

.booksimages {
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bookimage {
  max-width: 100%;
  height: auto;
  display: block;
}

.booksimages p {
  margin-top: 10px;
  padding: 0 5px;
  text-align: center;
  word-break: break-word;
}
</style>
