<script setup>
import { ref, onMounted, defineProps } from 'vue'
import CommentForm from '@/components/BookShow/Comment/CommentForm.vue'
import { apiGetAllComments } from '@/api/comments'


// Parent's props
const props = defineProps({
  book: Object,
})

let comments = ref(null)

onMounted(async () => {
  try {
    const allComments = await apiGetAllComments(props.book.id)
    comments.value = allComments.data // met le livres dans le ref

  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error)
  }
})
</script>

<template>
    <div class="comment" v-for="comment in comments" :key="comment.id">
        <h4>{{ comment.content }}</h4>
        <p class="username">{{ comment.user.username }}</p>
    </div>
</template>

<style scoped>
.comment{
  border: 1px solid;
  padding-left: 10px;
  margin: 10px;
}
.username{
    text-align: right;
    padding-right: 20px;
}
h2 {
  border-bottom: 1px solid;
}
</style>
