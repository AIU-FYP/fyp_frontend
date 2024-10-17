<template>
  <div class="shape">
    <div class="top"></div>
    <div class="bottom"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.shape{
  background-color: var(--main-color);
}
.top {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), 50% 100%, 0 calc(100% - 50px));
  background-color: white;
  height: 109px;
}

.bottom {
  clip-path: polygon(0 0, 50% 50px, 100% 0, 100% 100%, 0 100%);
  margin-top: -45px;
  background-color: white;
  height: 90px;
}

@media (max-width: 800px) {
  .shape{
    margin: 2rem 0;
  }
  .top {
    height: 50px;
  }

  .bottom {
    height: 50px;
  }
}

</style>
