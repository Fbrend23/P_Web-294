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
    <!-- loading -->
    <div v-if="comments === null">
        <p>Chargement des commentaires...</p>
    </div>

    <!-- no comments on that book -->
    <div v-else-if="comments.length === 0">
        <h4>Il n'y a pas encore de commentaire sur cet ouvrage</h4>
    </div>

    <!-- comments list-->
    <div v-else class="comments-container">
        <div class="comment" v-for="comment in comments" :key="comment.id">
            <h4>{{ comment.content }}</h4>
            <p class="username">{{ comment.user.username }}</p>
        </div>
    </div>
</template>

<style scoped>
.comments-container {
    max-height: 300px; /* la hauteur doir peut-être être corrigée*/
    overflow-y: auto;
    padding-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.comment {
    border: 1px solid;
    padding-left: 10px;
    margin: 10px;
}

.username {
    text-align: right;
    padding-right: 20px;
}

h2 {
    border-bottom: 1px solid;
}
</style>
