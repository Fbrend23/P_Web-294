<script setup>
import {apiGetOneBook} from '@/api/books';
import {apiAddAnEval, apiGetOneBookAvgEval} from '@/api/evaluation'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const book = ref();
const bookId = route.params.id;
const rating = ref([]);
const userRating = ref([]);
// const user =  ref(null);
// const userId =  ref(null);


onMounted(async () => {
  try {
    const response = await apiGetOneBook(bookId);
    book.value = response.data; // met le livres dans le ref

    // userId.value = book.value.userId
    // const resUser = await apiGetUser(userId.value)

    // // FORMAT BACKEND = [ user, count, lastBook ]
    // user.value = resUser.data[0]

    const resEval = await apiGetOneBookAvgEval(bookId)
    rating.value = resEval.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du livre :", error);
  }
});

const onSubmit = async () => {
try {
    await apiAddAnEval(bookId, userRating.value);

    // Refresh avg rating after submitting
    const resEval = await apiGetOneBookAvgEval(bookId);
    rating.value = resEval.data;

  } catch (err) {
    console.error("Erreur lors de l'ajout de la note :", err);
  }
};
</script>

<template>
    <div class="book"  v-if="book">
        <router-link :to="{ name: 'userPage', params: { id: book.user.id } }">
        <h1>Créé par {{ book.user.username }}</h1>
        </router-link>

        <div class="bookimagerating">

            <img :src="book.imagePath" alt="book image"></img>

            <div class="rating">
                    <form class="review-form" @submit.prevent="onSubmit">
                    <label for="rating"></label>
                    <select id="rating" v-model.number="userRating">
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                    </select>
                    <input class="button" type="submit" value="Submit">
                    </form>

                    <div class="ratingAvg">
                        <p>Note: {{ rating.average ?? "Pas encore de note"}} | {{ rating.count }} avis</p>

                    </div>

                
            </div>

        </div>
        <div class="bookinfos">
            <h2>{{ book.title }}</h2>
            <p>{{ book.author.firstName }} {{ book.author.lastName }}</p>
            <p>{{ book.category.label}}</p> 
            <p>{{ book.numberOfPages }}</p>
            <a :href="book.pdfLink "><p>Lien vers un extrait du livre</p></a> <!--add an icone to display link-->
            <p>{{ book.abstract }}</p>
            <p>{{ book.editor }}</p>
            <p>{{ book.editionYear }}</p>
        </div>
    </div>
</template>

<style scoped>
.bookinfos {
  border: 2px solid;
  padding: 20px;
  margin: 10px;
}
h1{
    text-align: center;
}
h2{
    border-bottom: 1px solid;
}
a {
    text-decoration: none;
}
a:visited{
  color:black;
}
</style>