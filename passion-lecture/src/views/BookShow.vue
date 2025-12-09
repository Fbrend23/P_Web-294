<script setup>
import BookInfo from '@/components/BookShow/BookInfo.vue'

import { apiGetOneBook } from '@/api/books'
import { apiGetOneBookAvgEval } from '@/api/evaluation'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const book = ref()
const bookId = route.params.id
const rating = ref([]);

// const user =  ref(null);
// const userId =  ref(null);

onMounted(async () => {
  try {
    const response = await apiGetOneBook(bookId)
    book.value = response.data // met le livres dans le ref

    // userId.value = book.value.userId
    // const resUser = await apiGetUser(userId.value)

    // // FORMAT BACKEND = [ user, count, lastBook ]
    // user.value = resUser.data[0]

    const resEval = await apiGetOneBookAvgEval(bookId)
    rating.value = resEval.data
  } catch (error) {
    console.error('Erreur lors de la récupération du livre :', error)
  }
})
</script>

<template>
  <div v-if="book && rating">
  <router-link :to="{ name: 'userPage', params: { id: book.user.id } }">
    <h1>Créé par {{ book.user.username }}</h1>
  </router-link>

  <BookInfo :book="book" :rating="rating" />
  </div>
</template>

<style scoped>
h1{
    text-align: center;
}
h2{
    border-bottom: 1px solid;
}
a {
    text-decoration: none;
}</style>
