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
    <div>
        <h2>{{ userName }}</h2>
        <p>Inscrit depuis: {{ dateInscription }}</p>
        <p>Ouvrages créer: {{ numberOfBooksCreated }}</p>
        <div>
            <p> Dernier ouvrage ajouté</p>
            <img :src="bookImage" alt="Image du dernier ouvrage ajouté">
        </div>
    </div>
</template>

<style></style>