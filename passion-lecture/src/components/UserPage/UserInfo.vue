<script setup>
import { ref, onMounted } from 'vue'
import { apiGetUser } from '@/api/user'
import { useRoute } from 'vue-router'

const route = useRoute()
const dateInscription = ref('')
const numberOfBooksCreated = ref(0)
const bookImage = ref('')
const userName = ref('')

onMounted(async () => {
  try {
    const userId = route.params.id
    const resUser = await apiGetUser(userId)

    // backend response is an array of objects
    const data = resUser.data

    // fetch user
    if (data[0]) {
      dateInscription.value = new Date(data[0].creationDate).toLocaleDateString()
      userName.value = data[0].username
    }

    // fetch number of books
    numberOfBooksCreated.value = data[1]

    // fetch last book
    if (data[2].length > 0) {
      bookImage.value = data[2].imagePath
    } else {
      bookImage.value = '/public/no_cover.jpg'
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error)
  }
})
</script>

<template>
  <div class="container d-flex justify-content-center my-5">
    <div class="card shadow-sm border-0" style="width: 100%; max-width: 350px">
      <div class="card-body text-center pt-5 pb-4">
        <div class="mb-3">
          <div
            class="avatar-placeholder rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
            style="width: 80px; height: 80px"
          >
            <i class="bi bi-person fs-1 text-secondary"></i>
          </div>
        </div>
        <h3 class="card-title fw-bold mb-1">{{ userName }}</h3>
        <p class="text-muted small mb-4">Inscrit depuis: {{ dateInscription }}</p>

        <div class="d-flex justify-content-around mb-4 border-top border-bottom py-3">
          <div class="text-center">
            <span class="d-block fw-bold fs-4">{{ numberOfBooksCreated }}</span>
            <small class="text-muted text-uppercase" style="font-size: 0.75rem">Ouvrages</small>
          </div>
        </div>

        <div class="text-center">
          <p class="mb-2 text-secondary small text-uppercase fw-bold">Dernier ouvrage ajouté</p>
          <img
            :src="bookImage"
            alt="Dernier ouvrage"
            class="img-fluid rounded shadow-sm border"
            style="max-height: 150px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
