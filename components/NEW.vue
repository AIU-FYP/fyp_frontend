<template>
  <div class="hostels-section">
    <h2 class="title">Random Photos</h2>
    <div class="carousel">
      <div class="carousel-wrapper">
        <div
            class="carousel-track"
            :style="{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }"
        >
          <div
              class="carousel-slide"
              v-for="(item, index) in items"
              :key="index"
          >
            <div class="box">
              <p class="photo-title">{{ item.label }}</p>
              <img :src="item.photoURL" :alt="item.label" />
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-dots">
        <span
            v-for="index in totalSlides"
            :key="index"
            :class="{ active: currentIndex === index - 1 }"
            @click="goToSlide(index - 1)"
        ></span>
        <div>
          <button class="carousel-btn prev-btn" @click="prevSlide">‹</button>
          <button class="carousel-btn next-btn" @click="nextSlide">›</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface CarouselItem {
  label: string;
  photoURL: string;
}

const items: CarouselItem[] = [
  {
    label: "AIU RANDOM 1",
    photoURL: "/images/aiu%20random%201.jpg",
  },
  {
    label: "AIU RANDOM 2",
    photoURL: "/images/aiu%20random%202.jpg",
  },
  {
    label: "AIU RANDOM 3",
    photoURL: "/images/aiu%20random%203.jpg",
  },
  {
    label: "AIU RANDOM 4",
    photoURL: "/images/aiu%20random%204.jpg",
  },
  {
    label: "AIU RANDOM 5",
    photoURL: "/images/aiu%20random%205.jpg",
  },
  {
    label: "AIU RANDOM 6",
    photoURL: "/images/aiu%20random%206.jpg",
  },
  {
    label: "AIU RANDOM 7",
    photoURL: "/images/aiu%20random%207.jpg",
  },
  {
    label: "AIU RANDOM 8",
    photoURL: "/images/aiu%20random%208.jpg",
  },
  {
    label: "AIU RANDOM 9",
    photoURL: "/images/aiu%20random%209.jpg",
  },
  {
    label: "AIU RANDOM 10",
    photoURL: "/images/aiu%20random%2010.jpg",
  },
  {
    label: "AIU RANDOM 11",
    photoURL: "/images/aiu%20random%2011.jpg",
  },
  {
    label: "AIU RANDOM 12",
    photoURL: "/images/aiu%20random%2012.jpg",
  },
  {
    label: "AIU RANDOM 13",
    photoURL: "/images/aiu%20random%2013.jpg",
  },
];

const currentIndex = ref(0);
const slidesToShow = 1; // Number of slides to show at a time

const totalSlides = computed(() => Math.ceil(items.length / slidesToShow));

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};
</script>

<style scoped>
.hostels-section {
  margin: 5rem 2rem;
}

.hostels-section .title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-color);
}

.carousel {
  position: relative;
  width: 100%;
  height: 30rem;
  margin: auto;
  overflow: hidden;
}

.carousel-wrapper {
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: calc(100% / 3);
  box-sizing: border-box;
  padding: 0.5rem;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  z-index: 10;
}

.prev-btn {
  left: 0;
}

.next-btn {
  right: 0;
}

.carousel-dots {
  text-align: center;
  margin-top: 1rem;
}

.carousel-dots span {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.carousel-dots span.active {
  background-color: #717171;
}


</style>
