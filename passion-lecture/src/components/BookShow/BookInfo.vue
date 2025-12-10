<script setup>
import { ref} from 'vue'
import {apiAddAnEval, apiGetOneBookAvgEval} from '@/api/evaluation'


// Parent's props
const props = defineProps({
  book: Object,
  rating: Object
})

const userRating = ref(null);

const onSubmit = async () => {
try {
    await apiAddAnEval(props.book.id, userRating.value);

    // Refresh avg rating after submitting
    const resEval = await apiGetOneBookAvgEval(props.book.id);
    props.rating.value = resEval.data;
    props.rating.average = resEval.data.average
    props.rating.count = resEval.data.count;

  } catch (err) {
    console.error("Erreur lors de l'ajout de la note :", err);
  }
};
</script>

<template>
    <div class="book"  v-if="book">
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
.book {
  display: flex;
  flex-direction: row;     
  gap: 20px;               
  align-items: flex-start; 
  margin: 20px 0;
  padding: 20px;
}
.bookimagerating {
  flex: 1;                 /* Left column : image + rating */
}
.bookinfos {
  flex: 2;                 /* Right column : book infos */
  border: 2px solid;
  padding: 20px;
  margin: 10px;
  min-height: 395px;
}
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