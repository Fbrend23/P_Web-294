<script setup>
import { apiGetAllCategories } from '@/api/category'
import { onMounted, ref } from 'vue'

const categories = ref([])

const fetchCategories = async () => {
  try {
    const response = await apiGetAllCategories()
    console.log(response.data)
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
      <select name="sort" id="select-sort">
        <option value="abc">Alphabétique</option>
        <option value="zyx">Alphabétique inverse</option>
        <option value="new">Nouveaux</option>
        <option value="old">Anciens</option>
      </select>
    </div>
    <div>
      <h3>Catégorie</h3>
      <select name="category" id="select-category">
        <option value="">Sélectionnez une catégorie</option>
        <option v-if="categories.length === 0" value="" disabled>Chargement...</option>
        <option v-for="category in categories" value="category.label">{{ category.label }}</option>
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
