<script setup>
import BookForm from '@/components/BookCreateUpdate/BookForm.vue';
import router from '@/router';
import { apiAddBook } from '@/api/books';
import { ref, onMounted } from 'vue';
import { apiGetAllAuthors } from '@/api/category';
import { apiGetAllCategories } from '@/api/category';


const bookData = ref(null);
const authorsList = ref([]);
const categoriesList = ref([]);
const isLoading = ref(true);

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
    };
    authorsList.value = authorsResponse.data;
    categoriesList.value = categoriesResponse.data;

  } catch (e) {
    console.error("Erreur de chargement", e);
  } finally {
    isLoading.value = false;
  }
});

const handleSave = async (dataToSave) => {
  try {
    await apiAddBook(dataToSave);

    router.push('/mybooks');
  } catch (error) {
    console.error("Erreur lors de la création du livre", error);
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div v-if="isLoading" class="text-center">Chargement...</div>

    <BookForm v-else :initial-data="bookData" :is-editing="false" :authors="authorsList" :categories="categoriesList"
      @submit-form="handleSave" @cancel="router.back()" />
  </div>
</template>
<style></style>
