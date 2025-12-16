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
  <div id="content">
    <BookFilter
      :filters="filters"
      @change-filters="
        (newFilters) => {
          filters = newFilters
          console.log(filters)
        }
      "
    />
    <div id="list">
      <SearchBar :filters="filters" />
      <BookList :filters="filters" />
    </div>
  </div>
</template>
<style scoped>
#content {
  margin: auto;
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
