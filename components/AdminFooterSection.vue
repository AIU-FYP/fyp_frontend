<script setup lang="ts">

const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="footer-admin-section">
    <div class="footer-container">
      <div class="footer-bottom">
        <p>&copy; Copyright <a href="">Albukhary International University {{ currentYear }}</a></p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.footer-admin-section {
  background-color: var(--main-color);
  margin: auto;
}


.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: .2rem 1rem;
  text-align: center;
}

.footer-bottom {
  text-align: center;
  font-size: 1.2rem;
  padding: .5rem;
  color: var(--text-color);
}

.footer-bottom a {
  color: var(--text-color);
}

a:hover {
  color: var(--text-hovor-color);
}
</style>