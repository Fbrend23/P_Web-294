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

const formData = ref({ ...props.initialData })
const selectedImage = ref(null)

const selectedPDF = computed(() => {
  return props.initialData.pdfLink ? props.initialData.pdfLink : null
})

const imagePreview = computed(() => {
  if (selectedImage.value) {
    return URL.createObjectURL(selectedImage.value)
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
  props.initialData.imagePath = null
}

const removePDF = () => {
  props.initialData.pdfLink = null
  formData.value.pdf = null
}

// Mise à jour si les données arrivent après le chargement
watch(
  () => props.initialData,
  (newData) => {
    formData.value = { ...newData }
  },
  { deep: true },
)

// Gestion de l'image (Aperçu + Stockage du fichier)
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedImage.value = file
    formData.value.image = file
  }
}

// Gestion du fichier extrait
const handleExtractUpload = (event) => {
  const file = event.target.files[0]
  formData.value.pdf = file
}

const handleSubmit = () => {
  emit('submit-form', formData.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="p-6 bg-white rounded shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">
      {{ isEditing ? 'Modifier un ouvrage' : 'Ajouter un ouvrage' }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-4">
        <div>
          <label class="block font-semibold mb-1">Titre</label>
          <input
            v-model="formData.title"
            type="text"
            class="w-full border p-2 rounded bg-gray-100"
            placeholder="Titre du livre"
          />
        </div>

        <div>
          <label class="block font-semibold mb-1">Auteur</label>
          <select v-model="formData.authorId" class="w-full border p-2 rounded bg-gray-100">
            <option value="" disabled>Sélectionnez un auteur</option>
            <option v-for="auth in authors" :key="auth.id" :value="auth.id">
              {{ auth.lastName }} {{ auth.firstName }}
            </option>
          </select>
        </div>

        <div>
          <label class="block font-semibold mb-1">Catégorie</label>
          <select v-model="formData.categoryId" class="w-full border p-2 rounded bg-gray-100">
            <option value="" disabled>Sélectionnez une catégorie</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.label }}
            </option>
          </select>
        </div>

        <div class="w-1/3">
          <label class="block font-semibold mb-1">Nombres de page</label>
          <input
            v-model="formData.numberOfPages"
            type="number"
            class="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label class="block font-semibold mb-1">Extrait (1 page)</label>
          <div class="flex items-center border p-2 rounded bg-gray-100">
            <button v-if="selectedPDF" type="button" @click="removePDF">Retirer l'extrait</button>
            <input
              @change="handleExtractUpload"
              type="file"
              class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-300 file:text-gray-700 hover:file:bg-gray-400"
              accept="application/pdf"
            />
          </div>
        </div>

        <div>
          <label class="block font-semibold mb-1">Editeur</label>
          <input
            v-model="formData.editor"
            type="text"
            class="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label class="block font-semibold mb-1">Année de l'édition</label>
          <input
            v-model="formData.editionYear"
            type="number"
            class="w-full border p-2 rounded bg-gray-100"
          />
        </div>
      </div>

      <div class="md:col-span-1 flex flex-col items-center">
        <div
          class="w-full aspect-[3/4] bg-gray-300 flex items-center justify-center border rounded mb-4 overflow-hidden relative"
        >
          <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
          <span v-else class="text-gray-500 text-4xl">✕</span>
        </div>

        <button v-if="imagePreview" @click="removeImage" type="button">Retirer l'image</button>

        <label
          class="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded inline-flex items-center border shadow-sm"
        >
          <span class="mr-2">↑</span> <span v-if="imagePreview">Modifier l'image</span>
          <span v-else>Ajouter une image</span>
          <input
            type="file"
            class="hidden"
            accept="image/png, image/jpeg, image/jpg"
            @change="handleImageUpload"
          />
        </label>
      </div>
    </div>

    <div class="mt-4">
      <label class="block font-semibold mb-1">Résumé</label>
      <textarea
        v-model="formData.abstract"
        rows="5"
        class="w-full border p-2 rounded bg-gray-100"
      ></textarea>
    </div>

    <div class="flex justify-between mt-8 pt-4 border-t">
      <button type="button" @click="$emit('cancel')" class="text-black font-semibold py-2 px-6">
        Annuler
      </button>
      <button
        type="submit"
        class="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-8 rounded-full shadow"
      >
        Sauvegarder
      </button>
    </div>
  </form>
</template>
