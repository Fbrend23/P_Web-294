<script setup>
import { defineEmits, ref } from 'vue'
import { apiAddAComments } from '@/api/comments'

const props = defineProps({
  book: Object
})

const emits = defineEmits(['close'])

const commentText = ref(null)

const submitComment = async () => {
  try {
    await apiAddAComments(props.book.id, commentText.value)

    console.log('Commentaire envoyé :', commentText.value)
    
    // Close form after sending it
    emits('close')
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="comment-form">
    <form @submit.prevent="submitComment">
      <textarea v-model="commentText" placeholder="Votre commentaire"></textarea>
      <button type="button" @click="$emit('close')">Annuler</button>
      <button type="submit">Envoyer</button>
    </form>
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