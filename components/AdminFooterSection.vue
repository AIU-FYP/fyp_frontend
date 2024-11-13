<script setup lang="ts">

const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="footer-admin-section">
    <div class="footer-container">
      <p>&copy; Copyright <a href="">Albukhary International University {{ currentYear }}</a></p>
    </div>
  </div>
</template>


<style scoped>
.footer-admin-section {
  background-color: var(--main-color);
  margin: auto;
  border-top: .2rem solid var(--text-color);

}


.footer-container {
  display: flex;
  justify-content: space-between;
  margin:auto;
  text-align: center;
  font-size: 1.2rem;
  padding: .5rem;
  color: var(--text-color);
}

a:hover {
  color: var(--text-hovor-color);
}
</style>