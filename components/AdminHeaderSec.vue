<script setup lang="ts">
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


const auth = useAuth()

const handleLogout = () => {
  auth.logout()
  navigateTo('/login')
}

</script>

<template>
  <div class="header-admin-section">
    <div class="header-container">

      <div class="container-box">
        <div class="image-logo">
          <a href="https://aiu.edu.my/">
            <img src="/images/AIU-Official-Logo.png" alt="image-logo">
          </a>
        </div>
        <div class="bar-btn">
          <button @click="toggleLinksVisibility" v-if="isMobile">
            Setting
          </button>
        </div>
      </div>

      <div class="title">
        <h1>Admin Dashboard </h1>
      </div>
      <div class="menu-container">
        <ul class="submenu" v-if="isLinksVisible || !isMobile">
          <li>
            <a>
              <router-link to="/new-admin">Add New Admin</router-link>
            </a>
          </li>
          <li>
            <a>
              <router-link to="/new-admin">Change Password</router-link>
            </a>
          </li>
          <li>
            <a @click="handleLogout">
              <router-link to="/">Log Out</router-link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-admin-section {
  background-color: var(--main-bg-color);
  margin: auto;
}

.container-box .bar-btn {
  display: none;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: .5rem 1rem;
  text-align: center;
}

.header-container .image-logo {
  margin: 0;
}

.header-container .image-logo img {
  width: 60px;
  height: 50px;
}

.title {
  font-size: 1.5rem;
  color: var(--main-color);
}

.submenu {
  display: flex;
}

.submenu li a {
  margin-left: .5rem;
  font-size: 1.2rem;
  color: var(--main-color);
}

.submenu li a:hover {
  color: var(--text-hovor-color);
}


@media (max-width: 1200px) {
  .header-container {
    display: block;
  }

  .title {
    display: none;
  }

  .container-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container-box .bar-btn {
    display: flex;
    font-size: 1.2rem;
    padding: .5rem;
    border-radius: .5rem;
    background-color: var(--main-color);
    color: var(--text-hovor-color);
  }

  .submenu {
    display: block;
    text-align: start;
  }

  .submenu li {
    color: var(--main-color);
    margin: .5rem 0;
    padding-bottom: .2rem;
  }

  .submenu li a {
    color: var(--main-color);
  }
}

</style>