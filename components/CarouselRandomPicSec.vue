<template>
  <div class="center">
    <div class="wrapper">
      <div class="inner" ref="inner">
        <div class="card" v-for="(card, index) in cards" :key="index">
          <img :src="card.imgSrc" alt="Card image" />
          <div class="content">
            <h1>{{ card.title }}</h1>
            <h3>{{ card.subtitle }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="map">
      <button class="first" @click="changeSlide(0)" :class="{ active: activeIndex.value === 0 }"></button>
      <button class="second" @click="changeSlide(1)" :class="{ active: activeIndex.value === 1 }"></button>
      <button class="third" @click="changeSlide(2)" :class="{ active: activeIndex.value === 2 }"></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(0)

const cards = ref([
  { imgSrc: "/images/aiu%20random%201.jpg", title: "Product Design", subtitle: "UI/UX, Design" },
  { imgSrc: "/images/aiu%20random%201.jpg", title: "Custom Website", subtitle: "UI/UX, Design" },
  { imgSrc: "/images/aiu%20random%201.jpg", title: "Digital Marketing", subtitle: "UI/UX, Design" },
  { imgSrc: "/images/aiu%20random%201.jpg", title: "Product Design", subtitle: "UI/UX, Design" },
  { imgSrc: "/images/aiu%20random%201.jpg", title: "Custom Website", subtitle: "UI/UX, Design" },
  { imgSrc: "/images/aiu%20random%201.jpg", title: "Digital Marketing", subtitle: "UI/UX, Design" },
])

const changeSlide = (index) => {
  activeIndex.value = index
  const innerElement = document.querySelector(".inner")
  const slideWidth = 100 / cards.value.length
  innerElement.style.transform = `translateX(-${index * slideWidth}%)`
}
</script>

<style scoped>

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.wrapper {
  display: flex;
  gap: 1em;
  overflow: hidden;
  width: 55em;
}

.inner {
  display: flex;
  gap: 1em;
  transition: all 1s ease-in-out;
}

.card {
  border-radius: 0.5em;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
}

.card img {
  border-top-right-radius: inherit;
  border-top-left-radius: inherit;
  display: block;
  width: 100%;
  min-width: 280px;
}

.card .content {
  background-color: var(--text-hovor-color);
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  padding: 1em;
  text-align: center;
}

.card .content h1 {
  color: white;
  font-size: 1.25rem;
  margin: 0.35em 0;
}

.card .content h3 {
  color: var(--text-color);
  font-size: 0.9rem;
  font-weight: 300;
}

.map {
  margin-top: 1em;
}

.map button {
  background-color: var(--main-color);
  border: none;
  cursor: pointer;
  display: inline-block;
  margin: 0 0.125em;
  height: 1em;
  width: 1em;
  border-radius: 50%;
  position: relative;
}

.map button.active:after {
  content: '';
  background-color: var(--main-color);
  position: absolute;
  top: 50%;
  left: 50%;
  height: 0.5em;
  width: 0.5em;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
