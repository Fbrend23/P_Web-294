<script setup>
import BookFilter from '@/components/BookCatalogue/BookFilter.vue'
import BookList from '@/components/BookCatalogue/BookList.vue'
import SearchBar from '@/components/BookCatalogue/SearchBar.vue'
</script>
<template>
  <div id="content">
    <BookFilter />
    <div id="list">
      <SearchBar />
      <BookList />
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
