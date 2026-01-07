<script setup>
import UserBookList from '@/components/MyBooks/UserBookList.vue';

</script>
<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="display-6 fw-bold">Mes Livres</h2>
      <router-link :to="{ name: 'bookCreate' }" class="btn btn-success rounded-pill px-4 shadow-sm">
        <i class="bi bi-plus-lg me-1"></i> Nouveau Livre
      </router-link>
    </div>

    <div class="card shadow-sm border-0">
      <div class="card-body p-0">
        <UserBookList />
      </div>
    </div>
  </div>
</template>
