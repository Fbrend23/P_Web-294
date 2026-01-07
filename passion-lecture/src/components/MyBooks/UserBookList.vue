<script setup>
import { ref, onMounted } from 'vue'
import { apiGetUsersAllBooks } from '@/api/user'
import { apiDeleteBook } from '@/api/books'
import { useAuthStore } from '@/stores/auth'

// Initialiser avec un tableau vide
const booksList = ref([])
const isLoading = ref(false)

onMounted(async () => {
  const userId = useAuthStore().getUser.id

  isLoading.value = true
  try {
    const response = await apiGetUsersAllBooks(userId)

    booksList.value = response.data.map((book) => ({
      id: book.id,
      title: book.title,
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des livres :', error)
  } finally {
    isLoading.value = false
  }
})

async function handleDelete(bookId) {
  if (!confirm('Voulez-vous vraiment supprimer ce livre ?')) return

  try {
    await apiDeleteBook(bookId)

    // Mettre à jour l'UI immédiatement en filtrant la liste locale
    booksList.value = booksList.value.filter((book) => book.id !== bookId)
  } catch (error) {
    console.error('Erreur suppression', error)
    alert('Une erreur est survenue lors de la suppression.')
  }
}
</script>

<template>
  <div class="h-100 d-flex flex-column">
    <div v-if="isLoading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <p class="mt-2 text-muted">Chargement...</p>
    </div>

    <div v-else-if="booksList.length > 0" class="list-group shadow-sm">
      <div
        v-for="book in booksList"
        :key="book.id"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        <div class="text-truncate me-3">
          <span class="badge bg-secondary me-2">#{{ book.id }}</span>
          <span class="h6 mb-0 text-dark">{{ book.title }}</span>
        </div>

        <div class="btn-group flex-shrink-0">
          <router-link
            :to="{ name: 'EditBook', params: { id: book.id } }"
            class="btn btn-outline-secondary btn-sm"
            title="Modifier"
          >
            <i class="bi bi-pencil"></i>
          </router-link>

          <button
            class="btn btn-outline-danger btn-sm"
            @click="handleDelete(book.id)"
            title="Supprimer"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-if="!isLoading && booksList.length === 0" class="alert alert-info text-center mt-3">
      Aucun livre trouvé.
    </div>
  </div>
</template>
