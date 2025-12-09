<script setup>
import { ref } from 'vue'
import { apiAddAnEval, apiGetOneBookAvgEval } from '@/api/evaluation'
import CommentForm from '@/components/BookShow/Comment/CommentForm.vue'

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
    <h2>Commentaires</h2>
    <button @click="toggleCommenting">Donner son avis</button>

    <!-- Affiche le formulaire par-dessus -->
    <CommentForm
      v-if="commenting"
      :book="book"
      @close="toggleCommenting"
      class="overlay"
    />
  </div>
</template>

<style scoped>
.comment {
  border: 2px solid;
  padding: 20px;
}
h2 {
  border-bottom: 1px solid;
}
</style>
