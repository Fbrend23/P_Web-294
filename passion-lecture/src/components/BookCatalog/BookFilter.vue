<script setup>
import { apiGetAllCategories } from '@/api/category'
import { onMounted, ref, defineProps } from 'vue'

const categories = ref([])

const props = defineProps(['filters'])

const fetchCategories = async () => {
  try {
    const response = await apiGetAllCategories()
    categories.value = response.data
  } catch (error) {
    console.error('Error while fetching books: ', error)
  }
}

onMounted(async () => {
  fetchCategories()
})
</script>
<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h2 class="h4 card-title mb-4">Filtres</h2>
      <div class="mb-3">
        <label for="select-sort" class="form-label fw-semibold">Trier</label>
        <select name="sort" id="select-sort" class="form-select" v-model="props.filters.sort">
          <option :value="{ sort: 'title', order: 'asc' }">Alphabétique</option>
          <option :value="{ sort: 'title', order: 'desc' }">Alphabétique inverse</option>
          <option :value="{ sort: 'created_at', order: 'desc' }">Nouveaux</option>
          <option :value="{ sort: 'created_at', order: 'asc' }">Anciens</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="select-category" class="form-label fw-semibold">Catégorie</label>
        <select
          name="category"
          id="select-category"
          class="form-select"
          v-model="props.filters.category"
        >
          <option value="">Sélectionnez une catégorie</option>
          <option v-if="categories.length === 0" value="" disabled>Chargement...</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
