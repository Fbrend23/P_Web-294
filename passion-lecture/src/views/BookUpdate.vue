<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BookForm from '@/components/BookCreateUpdate/BookForm.vue';
import { apiEditBook, apiGetOneBook } from '@/api/books';
import { apiGetAllAuthors, apiGetAllCategories } from '@/api/category';

const route = useRoute();
const router = useRouter();

const bookId = route.params.id;
const bookData = ref(null);
const authorsList = ref([]);
const categoriesList = ref([]);
const isLoading = ref(true);

onMounted(async () => {
    try {
        const [bookResponse, authorsResponse, categoriesResponse] = await Promise.all([
            apiGetOneBook(bookId),
            apiGetAllAuthors(),
            apiGetAllCategories(),
        ])
        const data = bookResponse.data;
        bookData.value = {
            title: data.title,
            authorId: data.authorId,
            categoryId: data.categoryId,
            numberOfPages: data.numberOfPages,
            editor: data.editor,
            editionYear: data.editionYear,
            abstract: data.abstract,
            imagePath: data.imagePath,
            pdfLink: data.pdfLink,
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
        await apiEditBook(bookId, dataToSave);

        router.push('/mybooks');
    } catch (error) {
        console.error("Erreur lors de la mise à jour", error);
        alert("Une erreur est survenue lors de la sauvegarde.");
    }
};
</script>

<template>
    <div class="container mx-auto p-4">
        <div v-if="isLoading" class="text-center">Chargement...</div>

        <BookForm v-else :initial-data="bookData" :is-editing="true" :authors="authorsList" :categories="categoriesList"
            @submit-form="handleSave" @cancel="router.back()" />
    </div>
</template>