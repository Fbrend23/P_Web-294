<script setup>
import { ref, onMounted } from 'vue';
import { apiGetUser } from '@/api/user';
import { useRoute } from 'vue-router';

const route = useRoute();
const dateInscription = ref('');
const numberOfBooksCreated = ref(0);
const bookImage = ref('');
const userName = ref('')

onMounted(async () => {
    try {
        const userId = route.params.id;
        const resUser = await apiGetUser(userId);

        // backend response is an array of objects
        const data = resUser.data;

        // fetch user
        if (data[0]) {
            dateInscription.value = new Date(data[0].creationDate).toLocaleDateString();
            userName.value = data[0].username;
        }

        // fetch number of books
        numberOfBooksCreated.value = data[1];

        // fetch last book
        if (data[2].length > 0) {
            bookImage.value = data[2].imagePath;
        } else {
            bookImage.value = '/public/no_cover.jpg';
        }

    } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
    }
});
</script>

<template>

    <div class="container-fluid d-flex flex-column justify-content-between align-items-center ">
        <div class="card-body text-center">
            <h3 class="card-title mb-2">{{ userName }}</h3>
            <p class="text-muted mb-1">Inscrit depuis: <strong>{{ dateInscription }}</strong></p>
            <p class="mb-3">Ouvrages créés: <strong>{{ numberOfBooksCreated }}</strong></p>
            <p class="mb-0 text-secondary small">Dernier ouvrage ajouté</p>
        </div>

        <img :src="bookImage" alt="Dernier ouvrage" class="img-fluid rounded preview-img" />

    </div>

</template>

<style scoped>
.preview-img {
    max-height: 200px;
    width: auto;
    object-fit: cover;
}
</style>