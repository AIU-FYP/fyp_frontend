<template>
  <section class="landing">
    <div class="main-container">
      <div class="box-info">
        <h2>Welcome Students</h2>
        <h1>Albukhary International University</h1>
        <div class="students-btn">
          <button> Maintenance Room Form</button>
          <button> Change Room Form</button>
        </div>
      </div>
      <div class="image-container">
        <img src="/images/aiu%20random%201.jpg" alt="image">
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
}

.main-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-image: linear-gradient(20deg, var(--text-hovor-color), var(--main-color));
  width: 100%;
  height: 100%;
}

.main-container .box-info {
  flex: 50%;
  margin: auto;
}

.box-info .students-btn {
  display: inline-flex;
}

.box-info .students-btn button {
  margin: 0 1rem;
  padding: .5rem 1rem;
  border-radius: 1rem;
  background-color: var(--main-color);
  font-size: 1.2rem;
}

.main-container .image-container {
  flex: 35%;
}

.main-container .image-container img {
  position: relative;
  width: 80%;
  height: 80%;
  margin: 2rem auto;
  border-radius: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
}

@media (max-width: 1200px) {
  .main-container {
    display: block;
  }
  .main-container .box-info {
    flex: 1;
    margin: auto 3rem;
  }

  .box-info .students-btn {
    display: block;
  }

  .box-info .students-btn button {
    margin: .5rem ;
    padding: .5rem 1rem;
    font-size: 1rem;
  }

  .main-container .image-container {
    flex: 1;
  }
}

h2 {
  font-size: 3rem;
  margin: 1rem 0;
}

h1 {
  top: 0;
  left: 0;
  font-size: 3rem;
  margin-top: -3rem;
  margin-bottom: 2rem;
  color: var(--main-color);
}

p {
  font-size: 1.5rem;
  margin-top: -3.3rem;
}

@media screen and (max-width: 800px) {
  .main-container {
    padding: 10rem 1rem;
    text-align: start;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 2rem;
  }

  .container h1 {
    font-size: 1rem;
    margin-top: -1.5rem;
  }

  .container p {
    font-size: 1rem;
    margin-top: -2.3rem;
  }
}

</style>
