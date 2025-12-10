<script setup>
import { apiGetAllCategories } from '@/api/category'
import { onMounted, ref, defineProps, defineEmits } from 'vue'

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
  <div id="filters-container">
    <h2>Filtres</h2>
    <div>
      <h3>Trier</h3>
      <select name="sort" id="select-sort" v-model="props.filters.sort">
        >
        <option :value="{ sort: 'title', order: 'asc' }">Alphabétique</option>
        <option :value="{ sort: 'title', order: 'desc' }">Alphabétique inverse</option>
        <option :value="{ sort: 'createdAt', order: 'desc' }">Nouveaux</option>
        <option :value="{ sort: 'createdAt', order: 'asc' }">Anciens</option>
      </select>
    </div>
    <div>
      <h3>Catégorie</h3>
      <select name="category" id="select-category" v-model="props.filters.category">
        <option value="">Sélectionnez une catégorie</option>
        <option v-if="categories.length === 0" value="" disabled>Chargement...</option>
        <option v-for="category in categories" :value="category.id">{{ category.label }}</option>
      </select>
    </div>
  </div>
</template>
<style scoped>
#filters-container {
  display: flex;
  flex-direction: column;
}
</style>
