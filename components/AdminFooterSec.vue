<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="footer">
    <div class="container">
      <div class="footer-bottom">
        <p>&copy; Copyright <a href="">Albukhary International University {{ currentYear }}</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: block;
  padding: 0 100px;
}

.footer {
  margin-bottom: auto;
  padding: 1em 0;
  background-color: var(--main-bg-color);
}

.footer-bottom {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-color);
}

.footer-bottom a {
  color: var(--main-color);
}

a:hover {
  color: var(--text-hovor-color);
}

@media (max-width: 1200px) {
  .container{
    padding:5px;
  }
  .container P{
    font-size: .8rem;
  }
}
</style>