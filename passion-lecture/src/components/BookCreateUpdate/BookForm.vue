<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  initialData: {
    default: () => ({
      title: '',
      authorId: '',
      categoryId: '',
      numberOfPages: '',
      editor: '',
      editionYear: '',
      abstract: '',
      pdf: null,
      image: null,
    }),
  },
  isEditing: { default: false },
  authors: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
})

const emit = defineEmits(['submit-form', 'cancel'])

const formData = ref({ ...props.initialData, removeImage: false, removePDF: false })
const selectedImage = ref(null)

const selectedPDF = computed(() => {
  if (formData.value.removePDF) {
    return null
  }
  return props.initialData.pdfLink ? props.initialData.pdfLink : null
})

const imagePreview = computed(() => {
  if (selectedImage.value) {
    return URL.createObjectURL(selectedImage.value)
  }

  if (formData.value.removeImage) {
    return null
  }

  if (props.initialData.imagePath) {
    const backendUrl = import.meta.env.VITE_API_URL
    return `${backendUrl}${props.initialData.imagePath}`
  }

  return null
})

const removeImage = () => {
  selectedImage.value = null
  formData.value.image = null
  // props.initialData.imagePath = null
  formData.value.removeImage = true
}

const removePDF = () => {
  // props.initialData.pdfLink = null
  formData.value.pdf = null
  formData.value.removePDF = true
}

// Mise à jour si les données arrivent après le chargement
watch(
  () => props.initialData,
  (newData) => {
    formData.value = { ...newData, removeImage: false, removePDF: false }
  },
  { deep: true },
)

// Gestion de l'image (Aperçu + Stockage du fichier)
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedImage.value = file
    formData.value.image = file
    formData.value.removeImage = false
  }
}

// Gestion du fichier extrait
const handleExtractUpload = (event) => {
  const file = event.target.files[0]
  formData.value.pdf = file
  formData.value.removePDF = false
}

const handleSubmit = () => {
  console.log(formData.value.removeImage)
  console.log(formData.value.removePDF)
  emit('submit-form', formData.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="card shadow border-0 p-4">
    <h2 class="card-title text-center mb-4 display-6 fw-bold">
      {{ isEditing ? 'Modifier un ouvrage' : 'Ajouter un ouvrage' }}
    </h2>

    <div class="row g-4">
      <div class="col-md-8">
        <div class="mb-3">
          <label class="form-label fw-bold">Titre</label>
          <input
            v-model="formData.title"
            type="text"
            class="form-control bg-light"
            placeholder="Titre du livre"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Auteur</label>
          <select v-model="formData.authorId" class="form-select bg-light" required>
            <option value="" disabled>Sélectionnez un auteur</option>
            <option v-for="auth in authors" :key="auth.id" :value="auth.id">
              {{ auth.lastName }} {{ auth.firstName }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Catégorie</label>
          <select v-model="formData.categoryId" class="form-select bg-light" required>
            <option value="" disabled>Sélectionnez une catégorie</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.label }}
            </option>
          </select>
        </div>

        <div class="mb-3 w-50">
          <label class="form-label fw-bold">Nombres de page</label>
          <input
            v-model="formData.numberOfPages"
            type="number"
            class="form-control bg-light"
            min="1"
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Extrait (1 page)</label>
          <div class="input-group">
            <button
              v-if="selectedPDF"
              type="button"
              class="btn btn-outline-danger"
              @click="removePDF"
            >
              <i class="bi bi-trash"></i>
            </button>
            <input
              @change="handleExtractUpload"
              type="file"
              class="form-control bg-light"
              accept="application/pdf"
            />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Editeur</label>
          <input v-model="formData.editor" type="text" class="form-control bg-light" />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Année de l'édition</label>
          <input v-model="formData.editionYear" type="number" class="form-control bg-light" />
        </div>
      </div>

      <div class="col-md-4 d-flex flex-column align-items-center">
        <div
          class="card mb-3 w-100 bg-light border d-flex justify-content-center align-items-center position-relative overflow-hidden user-select-none"
          style="aspect-ratio: 3/4"
        >
          <img
            v-if="imagePreview"
            :src="imagePreview"
            class="w-100 h-100 object-fit-cover"
            alt="Preview"
          />
          <span v-else class="text-muted fs-1"><i class="bi bi-image"></i></span>
        </div>

        <button
          v-if="imagePreview"
          @click="removeImage"
          type="button"
          class="btn btn-outline-danger btn-sm mb-2 w-100"
        >
          Retirer l'image
        </button>

        <div class="w-100">
          <label
            class="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
            style="cursor: pointer"
          >
            <i class="bi bi-upload"></i>
            <span v-if="imagePreview">Modifier l'image</span>
            <span v-else>Ajouter une image</span>
            <input
              type="file"
              class="d-none"
              accept="image/png, image/jpeg, image/jpg"
              @change="handleImageUpload"
            />
          </label>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <label class="form-label fw-bold">Résumé</label>
      <textarea v-model="formData.abstract" rows="5" class="form-control bg-light"></textarea>
    </div>

    <div class="d-flex justify-content-between mt-5 pt-3 border-top">
      <button
        type="button"
        @click="$emit('cancel')"
        class="btn btn-link text-dark text-decoration-none fw-semibold"
      >
        Annuler
      </button>
      <button type="submit" class="btn btn-dark rounded-pill px-5 fw-bold shadow-sm">
        Sauvegarder
      </button>
    </div>
  </form>
</template>
