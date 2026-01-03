<script setup>
import BookFilter from '@/components/BookCatalog/BookFilter.vue'
import BookList from '@/components/BookCatalog/BookList.vue'
import SearchBar from '@/components/BookCatalog/SearchBar.vue'
import { reactive } from 'vue'

const filters = reactive({
  sort: {
    sort: 'title',
    order: 'asc',
  },
  category: '',
  search: '',
})
</script>
<template>
  <div class="container my-4">
    <div class="row g-4">
      <div class="col-md-3">
        <BookFilter :filters="filters" @change-filters="
          (newFilters) => {
            filters = newFilters
            console.log(filters)
          }
        " />
      </div>
      <div class="col-md-9">
        <div class="d-flex flex-column gap-3">
          <SearchBar :filters="filters" />
          <BookList :filters="filters" />
        </div>
      </div>
    </div>
  </div>
</template>
