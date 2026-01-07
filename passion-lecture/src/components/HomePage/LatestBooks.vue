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
  <div class="container my-5">
    <div class="card w-75 mx-auto border border-2 border-dark rounded-4 p-4 shadow-sm bg-body">
      <h2 class="text-center mb-4 display-6 fw-bold">Derniers ouvrages ajoutés</h2>

      <div v-if="books.length === 0" class="text-center my-5">
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
        <div class="col" v-for="book in books" :key="book.id">
          <router-link
            :to="{ name: 'bookShow', params: { id: book.id } }"
            class="text-decoration-none text-dark d-flex flex-column align-items-center h-100"
          >
            <img
              class="img-fluid rounded shadow-sm mb-2"
              :src="getImageUrl(book.imagePath)"
              alt="Book Cover"
              style="width: 100%; height: 200px; object-fit: cover"
              @error="(event) => (event.target.src = defaultImg)"
            />
            <p class="text-center fw-semibold small px-1 mb-0">{{ book.title }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
