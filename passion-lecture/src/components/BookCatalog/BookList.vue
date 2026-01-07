<script setup>
import { apiGetCustomBooks } from '@/api/books'
import BookDisplay from '@/components/BookCatalog/BookDisplay.vue'
import { ref, onMounted, defineProps, watchEffect } from 'vue'

const books = ref([])

const props = defineProps(['filters'])

const maxPage = ref(1)

const page = ref(1)

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
    page.value = page.value <= maxPage.value ? page.value : 1
    books.value = response.data.data
  })
})
</script>
<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-hover table-striped mb-0 align-middle">
          <thead class="table-dark">
            <tr>
              <th scope="col" class="py-3 ps-3">Titre</th>
              <th scope="col" class="py-3">Auteur</th>
              <th scope="col" class="py-3">Catégorie</th>
              <th scope="col" class="py-3">Créateur</th>
              <th scope="col" class="py-3">Créé le</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="books.length === 0">
              <td colspan="5" class="text-center py-4 text-muted">Chargement...</td>
            </tr>
            <BookDisplay
              v-else
              v-for="(book, index) in books"
              :key="index"
              :bookInfo="book"
            ></BookDisplay>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center align-items-center mt-4 gap-3">
    <button
      class="btn btn-primary"
      :disabled="page === 1"
      @click="
        () => {
          page = page === 1 ? page : page - 1
        }
      "
    >
      &lt; Précédent
    </button>
    <span class="fw-semibold">Page {{ page }} / {{ maxPage }}</span>
    <button
      class="btn btn-primary"
      :disabled="page >= maxPage"
      @click="
        () => {
          page = page === maxPage ? page : page + 1
        }
      "
    >
      Suivant &gt;
    </button>
  </div>
</template>
