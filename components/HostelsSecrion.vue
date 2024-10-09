<script setup lang="ts">
  const items =[
    {
      label:"aiu hostles",
      photoURL:"/images/aiu-hostel.jpg"
    },
    {
      label:"aiu hostles",
      photoURL:"/images/aiu-hostel.jpg"
    },
    {
      label:"aiu hostles",
      photoURL:"/images/aiu-hostel.jpg"
    }

  ]
</script>

<template>
  <div class="hostels-secrion">
    <div class="container">
      <div class="box" v-for="(item, index) in items" :key="index">
        <img :src="item.photoURL" :alt="item.label">
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.hostels-secrion{
  margin: 5rem 2rem;
}

.container {
  display: flex;
  width: 100%;
  padding: 4% 2%;
  box-sizing: border-box;
  height: 100vh;
}

.box {
  flex: 1;
  overflow: hidden;
  transition: 0.5s;
  margin: 0 2%;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  line-height: 0;
  max-width: 100%;
}

@media (max-width: 600px) {
  .container {
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

.box > span {
  font-size: 1.5rem;
  display: block;
  text-align: center;
  height: 10rem;
  line-height: 2.6;
  text-transform: capitalize;
}

.box:hover {
  flex: 1 1 50%;
}

.box:hover > img {
  width: 100%;
  height: 100%;
}
</style>