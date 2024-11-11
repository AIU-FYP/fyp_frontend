<template>
  <div class="header-section">
    <div class="main-container">

      <div class="container-box">
        <div class="image-logo">
          <a href="https://aiu.edu.my/">
            <img src="/images/AIU-Official-Logo.png" alt="aiu-logo"/>
          </a>
        </div>
        <div>
          <button @click="toggleLinksVisibility" class="bar-btn" v-if="isMobile">
            <UIcon
                name="uil-bars"
            />
          </button>
        </div>
      </div>

      <div class="title">
        <h2>Smart AIU Management System</h2>
      </div>

      <nav class="menu" v-if="isLinksVisible || !isMobile">
        <ul class="menu-links">
          <li>
            <router-link to="/home">Home</router-link>
          </li>
          <li><router-link to="/about">About</router-link>
          </li>
          <li><router-link to="/maintenance-room">Maintenance Room</router-link></li>
          <li><router-link to="request-to-change-room">Request to Change Room</router-link></li>

          <li><router-link to="/login">Log In</router-link></li>

        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';

const isLinksVisible = ref(false);

function toggleLinksVisibility() {
  isLinksVisible.value = !isLinksVisible.value;
  console.log("Links visibility toggled:", isLinksVisible.value);
}

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth <= 1200;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 1200;
  });
});
</script>

<style scoped>
.header-section {
  background-color: var(--main-bg-color);
  padding: .5rem 1rem ;
}

.container-box button {
  display: none;
}

.main-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.image-logo img {
  width: 70px !important;
  height: 50px !important;
}

.title h2 {
  font-size: 1.5rem;
  font-weight: normal;
  text-transform: uppercase;
  color: var(--main-color);
}

.menu-links {
  display: inline-flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-links li {
  display: inline-block;
  margin-right: .5rem;
}

.menu-links a {
  color: var(--main-color);
  padding: 0 .5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.menu-links a:hover {
  color: var(--text-hovor-color);
  transition: .3s ease-in-out;
}


.dropdown-content li {
  display: block;
  margin: .5rem 0;
}

.dropdown-content li > a {
  margin: 0 1rem;
  padding: .5rem;
}

@media (max-width: 1200px ) {

  .main-container {
    display: block;
  }


  .title h2 {
    display: none;
  }

  .container-box {
    display: flex;
    justify-content: space-between;
  }

  .bar-btn {
    font-size: 2rem;
    font-weight: bold;
    margin: 0 1rem;
  }

  .menu-links {
    display: block;
    margin: 1rem 0;
  }

  .menu-links li {
    display: block;
    margin-left: .5rem;
    border-bottom: 2px solid var(--main-hovor-color);
  }

}

</style>
