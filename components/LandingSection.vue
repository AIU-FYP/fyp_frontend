<template>
  <section class="landing">
    <div class="container">
      <h2>Welcome to New Students</h2>
      <h1>AlBUKHARY INTERNATIONAL UNIVERSITY </h1>
      <P>SMART AIU MANAGEMENT SYSTEM</P>
      <button class="student-handbook"><a
          href="https://aiu.edu.my/PDF/Handbook/Student-Handbook.pdf"> Student Handbook</a></button>
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
  height: 100vh;
  background-image: url('/images/aiu random 2.jpg');
  background-size: cover;
  background-position: center;
  text-align: start;
  color: #fff;
}

.container {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  padding: 6rem 3rem;
  text-align: center;
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

.student-handbook {
  padding: .5rem;
  margin: 1rem;
  border-radius: 1rem;
  background-color: var(--main-color);
}

.student-handbook:hover {
  padding: .5rem;
  background-color: var(--text-hovor-color);
  transition: .2s;
}


@media screen and (max-width: 800px) {
  .container {
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
