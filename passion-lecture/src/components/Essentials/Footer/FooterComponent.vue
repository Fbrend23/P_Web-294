<script setup></script>
<template>
  <footer class="bg-dark text-light py-3 mt-auto container rounded mb-4">
    <div class="d-flex flex-column flex-md-row justify-content-around align-items-center h-100">
      <p class="mb-0 fs-5">© ETML - P_Web-294</p>
      <div id="github" class="d-flex align-items-center mt-3 mt-md-0">
        <img src="@/assets/icons/github-mark-white.svg" alt="Github Icon" style="height: 50px;" class="mx-3" />
        <div id="github-accounts" class="d-flex flex-column align-items-start">
          <a href="https://github.com/fbrend23" target="_blank"
            class="text-light text-decoration-none footer-link">Brendan Fleurdelys</a>
          <a href="https://github.com/NovaNoctua" target="_blank"
            class="text-light text-decoration-none footer-link">Maël Naudet</a>
          <a href="https://github.com/mina-etml" target="_blank"
            class="text-light text-decoration-none footer-link">Mina Morier</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  font-size: 0.9rem;
}

.footer-link:hover {
  color: #42d21a !important;
}
</style>
