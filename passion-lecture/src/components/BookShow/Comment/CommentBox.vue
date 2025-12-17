<script setup>
import { ref } from 'vue'
import CommentForm from '@/components/BookShow/Comment/CommentForm.vue'
import CommentContent from './CommentContent.vue'

let commenting = ref(false)

// Parent's props
const props = defineProps({
  book: Object,
})

// Exemple de fonction pour afficher le formulaire
const toggleCommenting = () => {
  commenting.value = !commenting.value
}
</script>

<template>
  <div class="comment-box" v-if="book">

      <h2 v-if="!commenting">Commentaires</h2>
      <h2 v-else>Ajouter un commentaire</h2>

    <CommentContent v-if="!commenting" :book="book"></CommentContent>
    <!-- Affiche le formulaire par-dessus -->
    <CommentForm v-if="commenting" :book="book" @close="toggleCommenting" class="overlay" />

    <button class="btn btn-dark mx-auto mt-2 rounded-pill" v-if="!commenting" @click="toggleCommenting">Donner son avis</button>
  </div>
</template>

<style scoped>
.comment-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid;
  padding: 20px;
  margin-top: 50px;
  margin-right: 50px;
  min-height: 395px;
}
h2 {
  border-bottom: 1px solid;
}
</style>
