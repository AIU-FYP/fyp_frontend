<script setup lang="ts">
const information = [
  {
    title: "Vision",
    description:
        "Cultivating transformative experiences that challenge students to be their best at AIU and beyond. AIU Student Affairs facilitates holistic student success through purposeful advocacy, education, engagement, and support."
  },
  {
    title: "Mission",
    description:
        "With students at the heart of all that AIU does, the Student Affairs Department creates innovative learning opportunities, programmes, and services that prepare students to lead, serve, and become engaged members of a global society."
  }
];

const images=[
  {
    url:"/images/WB-5core-values.jpg",
    alt:"WB-5core-values"
  },
  {
    url:"/images/WB-8hrs-rules.jpg",
    alt:"WB-8hrs-rules"
  }
]
</script>

<template>
  <div class="about-section">
    <div class="container">
      <h1>About Albukhary International University</h1>
      <hr class="divider">
      <div class="content">
        <div v-for="info in information" :key="info.title" class="info">
          <h3>{{ info.title }}</h3>
          <p>{{ info.description }}</p>
        </div>
      </div>
      <div class="random-images" v-for="image in images" :key="image.url">
        <img :src="image.url" alt="image.alt">
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-section {
  padding: 5em;
  margin: 1em auto;
}

.container h1 {
  font-size: 2.5rem;
  margin-left: 20px;
  color: var(--main-hovor-color);
}

@media (max-width: 800px) {
  .about-section {
    padding: 2rem 1rem;
  }

  .container h1 {
    font-size: 1.2rem;
  }
}

.divider{
  margin: 1rem auto;
  border: 2px solid var(--main-color);
  width: 100%;
}

.content {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.info {
  margin: 1rem auto;
  padding: 20px;
  border-radius: 8px;
  flex: 1 1 45%;
  box-sizing: border-box;
}

h3 {
  font-size: 1.5rem;
  color: var(--main-color);
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  color: var(--main-hovor-color);
  text-align: justify;
}

@media (max-width: 800px) {
  .content {
    flex-direction: column;
  }

  .info {
    width: 100%;
    margin-bottom: 0;
  }
}

.random-images img {
  padding: .5rem;
}
</style>