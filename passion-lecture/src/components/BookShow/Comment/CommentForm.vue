<script setup>
import { defineEmits, ref } from 'vue'
import { apiAddAComments } from '@/api/comments'

const props = defineProps({
  book: Object,
})

const emits = defineEmits(['close'])

const commentText = ref(null)

const submitComment = async () => {
  try {
    await apiAddAComments(props.book.id, commentText.value)
    // Close form after sending it
    emits('close')
  } catch (err) {
    console.error(err)
  }
}

const onEnter = (e) => {
  if (e.shiftKey || e.ctrlKey) {
    // Shift+Enter ou Ctrl+Enter => retour à la ligne
    const textarea = e.target
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    // Insérer un \n à la position du curseur
    textarea.value = textarea.value.substring(0, start) + '\n' + textarea.value.substring(end)

    // Remettre le curseur après le saut de ligne
    textarea.selectionStart = textarea.selectionEnd = start + 1

    commentText.value = textarea.value
  } else {
    // Enter seul => submit
    submitComment()
  }
}
</script>

<template>
  <div class="comment-form">
    <form @submit.prevent="submitComment">
      <textarea
        v-model="commentText"
        placeholder="Votre commentaire"
        @keydown.enter.prevent="onEnter"
      ></textarea>
      <div>
        <button type="button" class="btn btn-light mt-2 rounded-pill" @click="$emit('close')">
          Annuler
        </button>
        <button type="submit" class="btn btn-dark mx-2 mt-2 rounded-pill">Envoyer</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.comment {
  border: 2px solid;
  padding: 20px;
  min-height: 395px;
}
h2 {
  border-bottom: 1px solid;
}
form {
  display: flex;
  flex-direction: column;
}
textarea {
  min-height: 300px;
}
</style>
