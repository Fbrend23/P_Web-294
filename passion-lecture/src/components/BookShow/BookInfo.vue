<script setup>
import { ref, watch } from 'vue'
import { apiAddAnEval, apiGetOneBookAvgEval } from '@/api/evaluation'

// Parent's props
const props = defineProps({
  book: Object,
  rating: Object,
  formerRating: Number,
})

const userRating = ref(0)
const defaultImg = '/no_cover.jpg'

const imgUrl = props.book.imagePath
  ? `${import.meta.env.VITE_API_URL}${props.book.imagePath}`
  : defaultImg

const pdfUrl = props.book.pdfLink ? `${import.meta.env.VITE_API_URL}${props.book.pdfLink}` : null

const hasRated = ref(!!props.formerRating)

// Synchronize with formerRating if the value arrives later
watch(
  () => props.formerRating,
  (newVal) => {
    if (newVal && newVal > 0) {
      userRating.value = newVal
    }
  },
  { immediate: true },
)

const setRating = (star) => {
  if (!props.formerRating || props.formerRating <= 0) {
    userRating.value = star
  }
}

const formatAverage = (avg) => {
  if (avg === undefined || avg === null) return 'Pas encore de note'
  return avg % 1 === 0 ? avg : avg.toFixed(2) // decimal places if necessary only
}

const onSubmit = async () => {
  try {
    console.log('Envoi au serveur:', props.book.id, userRating.value)

    await apiAddAnEval(props.book.id, userRating.value)

    // Refresh avg rating after submitting
    const resEval = await apiGetOneBookAvgEval(props.book.id)
    props.rating.value = resEval.data
    props.rating.average = resEval.data.average
    props.rating.count = resEval.data.count

    //The user has rated the book: hides the submit button
    hasRated.value = true
  } catch (err) {
    console.error("Erreur lors de l'ajout de la note :", err)
  }
}
</script>

<template>
  <div class="book" v-if="book">
    <div class="bookimagerating">
      <div class="bookimage">
        <img :src="imgUrl" alt="bookimage" @error="(event) => (event.target.src = defaultImg)" />
      </div>

      <div class="rating">
        <form class="review-form" @submit.prevent="onSubmit">
          <div class="star-rating">
            <i
              v-for="star in 5"
              :key="star"
              class="bi"
              :class="star <= userRating ? 'bi-star-fill' : 'bi-star'"
              @click="setRating(star)"
            ></i>
          </div>
          <input
            v-if="(!props.formerRating || props.formerRating <= 0) && !hasRated"
            class="button"
            type="submit"
            value="Submit"
          />
        </form>
        <div class="ratingAvg">
          <p>Note: {{ formatAverage(rating?.average) }} | {{ rating?.count || 0 }} avis</p>
        </div>
      </div>
    </div>
    <div class="bookinfos">
      <h2>{{ book.title }}</h2>
      <p>{{ book.author.firstName }} {{ book.author.lastName }}</p>
      <p>{{ book.category.label }}</p>
      <p>{{ book.numberOfPages }}</p>
      <a v-if="pdfUrl" :href="pdfUrl" target="_blank"><p>Lien vers un extrait du livre</p></a>
      <p v-else>Aucun extrait du livre</p>
      <!--add an icone to display link-->
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
  flex: 1; /* Left column : image + rating */
  margin: 10px;
}
.bookinfos {
  flex: 1; /* Right column : book infos */
  border: 2px solid;
  padding: 20px;
  margin: 10px;
  min-height: 435px;
}
.ratingAvg {
  text-align: center;
}
.review-form {
  margin-top: 10px;
  text-align: center;
}
.bookimage {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bookimage img {
  max-width: 70%;
  height: auto;
}
h1 {
  text-align: center;
}
h2 {
  border-bottom: 1px solid;
}
a {
  text-decoration: none;
}
a:visited {
  color: black;
}
.star-rating .bi {
  font-size: 2rem;
  cursor: pointer;
  color: #ccc;
  transition: color 0.2s;
}

.star-rating .bi-star-fill {
  color: gold;
}
</style>
