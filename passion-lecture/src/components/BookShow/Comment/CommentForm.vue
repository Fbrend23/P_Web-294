<script setup>
import { defineEmits, ref } from 'vue'
import { apiAddAnEval } from '@/api/evaluation'

const props = defineProps({
  book: Object
})

const emits = defineEmits(['close'])

const commentText = ref('')

const submitComment = async () => {
  try {
    // ici tu peux appeler ton API pour enregistrer le commentaire
    // await apiAddAnEval(props.book.id, commentText.value)

    console.log('Commentaire envoyé :', commentText.value)
    
    // Fermer le formulaire après l'envoi
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
      <button type="submit">Envoyer</button>
      <button type="button" @click="$emit('close')">Annuler</button>
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