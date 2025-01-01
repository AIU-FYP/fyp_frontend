<template>
  <section class="landing">
    <div class="main-container">
      <div class="box-info">
        <h2 class="fade-in">Welcome Students</h2>
        <h1 class="slide-up">Albukhary International University</h1>
        <div class="students-btn">
          <button class="btn-animate">Maintenance Room Form</button>
          <button class="btn-animate">Change Room Form</button>
        </div>
      </div>
      <div class="image-container">
        <img src="/images/aiu%20random%201.jpg" alt="image" class="image-fade">
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.landing {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: var(--text-hovor-color);
  overflow: hidden;
  background: linear-gradient(135deg, #133E87FF, #4B8AE6, #82B4F9);
}

.main-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: linear-gradient(120deg, #82B4F9, #4B8AE6, #133E87FF);
  width: 90%;
  height: 90vh;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

@media (max-width: 1200px) {
  .main-container {
    width: 100%;
    height: 100%;
  }
}

.main-container .box-info {
  flex: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.box-info .students-btn {
  display: inline-flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.students-btn .btn-animate {
  padding: 0.6rem 1.2rem;
  border-radius: 1rem;
  background-color: var(--main-hovor-color);
  font-size: 1.2rem;
  color: var(--text-color);
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.students-btn .btn-animate:hover {
  transform: scale(1.1);
  background-color: var(--main-color);
}

.main-container .image-container {
  flex: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-container .image-container img {
  width: 80%;
  height: auto;
  margin: 2rem auto;
  border-radius: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  opacity: 0;
  animation: fadeIn 1.5s ease forwards;
}

h2 {
  font-size: 3rem;
  margin: 1rem 0;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
}

h1 {
  font-size: 3rem;
  margin-top: -1rem;
  color: var(--main-color);
  opacity: 0;
  animation: slideUp 1.2s ease forwards;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1200px) {
  .main-container {
    display: block;
  }

  .box-info .students-btn {
    display: block;
  }

  .box-info .students-btn button {
    margin: 0.5rem 0;
  }
}

@media (max-width: 800px) {
  .main-container {
    padding: 2rem 1rem;
    text-align: center;
  }

  h2 {
    font-size: 1.8rem;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
