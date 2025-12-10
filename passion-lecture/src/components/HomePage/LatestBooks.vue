<script setup>
import { apiGetAllBooks } from '@/api/books';
import { ref, onMounted } from 'vue'

const books = ref([]);

onMounted(async () => {
  try {
    const response = await apiGetAllBooks();

    // Sort by date in descending order (most recent → oldest)
    const sorted = response.data.data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Keeps the 5 latest
    books.value = sorted.slice(0, 5);

  } catch (error) {
    console.error("Error while fetching books:", error);
  }
});
</script>

<template>
<div class="latest">
    <h2>Derniers ouvrages ajoutés</h2>

    <div v-if="books.length === 0">Chargement…</div>

    <div 
      class="booksimages" 
      v-for="book in books" 
      :key="book.id"
    >
    <router-link :to="{ name: 'bookShow', params: { id: book.id } }"> <!--Renvoyer vers la page BookShow-->
      <img :src="book.imagePath" alt="book image"></img>
      {{ book.title }}
    </router-link>
    </div>
  </div>
</template>

<style scoped>
.latest {
  border: 2px solid;
  padding: 20px;
  margin: 10px;
}
h2,
p {
  text-align: center;
  padding: 20px;
  padding: 20px;
}
a {
  text-decoration: none;
}
</style>
