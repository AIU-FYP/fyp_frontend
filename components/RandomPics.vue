<script setup lang="ts">
  const items =[
    {
      photoURL:"/images/aiu%20random%201.jpg"
    },
    {
      photoURL:"/images/aiu%20random%202.jpg"
    },
    {
      photoURL:"/images/aiu%20random%205.jpg"
    }

  ]
</script>

<template>
  <div class="hostels-section">
    <div class="container">
      <h2 class="title">Random Photos </h2>
      <div class="sub-container">
        <div class="box" v-for="(item, index) in items" :key="index">
          <img :src="item.photoURL" alt="random">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.hostels-section{
  margin: 5rem 2rem;
}

.container{
  margin: 2rem auto;
  max-width: 1200px;
}

.hostels-section .title{
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: var(--main-hovor-color);
  margin: 3rem auto;
}

.sub-container {
  display: flex;
  width: 100%;
  box-sizing: border-box;
}

.box {
  flex: 1;
  overflow: hidden;
  transition: 0.5s;
  margin: 0 1%;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  max-width: 100%;
}

@media (max-width: 1200px) {
  .sub-container {
    flex-direction: column;
  }

  .box {
    flex: 1 1 100%;
    margin: 2% 0;
  }

  .box > img {
    height: 100%;
  }
}

.box > img {
  width: 200%;
  height: calc(100% - 10vh);
  object-fit: cover;
  transition: 0.5s;
}

.box:hover {
  flex: 1 1 50%;
}

.box:hover > img {
  width: 100%;
  height: 100%;
}
</style>