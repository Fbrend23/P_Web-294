<script setup>
import { ref, onMounted } from 'vue';
import { apiGetUsersAllBooks } from '@/api/user';
import router from '@/router';
import { apiDeleteBook } from '@/api/books';

// Initialiser avec un tableau vide
const booksList = ref([]);
const isLoading = ref(false);

onMounted(async () => {
    // TODO: Remplacer par l'ID venant du store d'auth
    const userId = 1;

    isLoading.value = true;
    try {
        const response = await apiGetUsersAllBooks(userId);

        booksList.value = response.data.map(book => ({
            id: book.id,
            title: book.title,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
    } finally {
        isLoading.value = false;
    }
});

async function handleDelete(bookId) {
    if (!confirm('Voulez-vous vraiment supprimer ce livre ?')) return;

    try {
        await apiDeleteBook(bookId);

        // Mettre à jour l'UI immédiatement en filtrant la liste locale
        booksList.value = booksList.value.filter(book => book.id !== bookId);

    } catch (error) {
        console.error("Erreur suppression", error);
        alert("Une erreur est survenue lors de la suppression.");
    }
}
</script>

<template>
    <div>
        <p v-if="isLoading">Chargement...</p>

        <ul v-else>
            <li v-for="book in booksList" :key="book.id" class="book-item">
                <p>
                    <span class="fw-bold">{{ book.id }}. </span>
                    {{ book.title }}
                </p>

                <div class="actions">
                    <router-link :to="{ name: 'EditBook', params: { id: book.id } }"> <button
                            class="btn btn-outline-secondary btn-sm" title="Modifier">
                            <i class="bi bi-pencil"></i>
                        </button></router-link>

                    <button class="btn btn-outline-danger btn-sm" @click="handleDelete(book.id)" title="Supprimer">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </li>
        </ul>

        <p v-if="!isLoading && booksList.length === 0">Aucun livre trouvé.</p>
    </div>
</template>

<style scoped>
.book-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.actions button {
    margin-left: 5px;
}
</style>