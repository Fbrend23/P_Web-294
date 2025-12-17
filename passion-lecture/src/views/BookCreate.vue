<script setup>
import BookForm from '@/components/BookCreateUpdate/BookForm.vue'
import router from '@/router'
import { apiAddBook } from '@/api/books'
import { ref, onMounted } from 'vue'
import { apiGetAllAuthors } from '@/api/category'
import { apiGetAllCategories } from '@/api/category'

const bookData = ref(null)
const authorsList = ref([])
const categoriesList = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const [authorsResponse, categoriesResponse] = await Promise.all([
      apiGetAllAuthors(),
      apiGetAllCategories(),
    ])
    bookData.value = {
      title: '',
      authorId: '',
      categoryId: '',
      numberOfPages: '',
      editor: '',
      editionYear: '',
      abstract: '',
      imagePath: '',
      pdfLink: '',
    }
    authorsList.value = authorsResponse.data
    categoriesList.value = categoriesResponse.data
  } catch (e) {
    console.error('Erreur de chargement', e)
  } finally {
    isLoading.value = false
  }
})

const handleSave = async (dataToSave) => {
  const body = new FormData()

  body.append('title', dataToSave.title)
  body.append('authorId', dataToSave.authorId)
  body.append('categoryId', dataToSave.categoryId)
  body.append('abstract', dataToSave.abstract)
  body.append('editionYear', dataToSave.editionYear)
  body.append('editor', dataToSave.editor)
  body.append('numberOfPages', dataToSave.numberOfPages)

  if (dataToSave.image) {
    body.append('image', dataToSave.image)
  }
  if (dataToSave.pdf) {
    body.append('pdf', dataToSave.pdf)
  }

  try {
    await apiAddBook(body)

    router.push('/mybooks')
  } catch (error) {
    console.error('Erreur lors de la mise à jour', error)
    alert('Une erreur est survenue lors de la sauvegarde.')
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <div v-if="isLoading" class="text-center">Chargement...</div>

    <BookForm
      v-else
      :initial-data="bookData"
      :is-editing="false"
      :authors="authorsList"
      :categories="categoriesList"
      @submit-form="handleSave"
      @cancel="router.back()"
    />
  </div>
</template>
<style></style>
