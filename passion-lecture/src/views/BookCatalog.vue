<script setup>
import BookFilter from '@/components/BookCatalog/BookFilter.vue'
import BookList from '@/components/BookCatalog/BookList.vue'
import SearchBar from '@/components/BookCatalog/SearchBar.vue'
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
