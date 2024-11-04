<script setup lang="ts">
import {ref} from 'vue'
import Popup from "~/components/PopupChangePassword.vue";

const isMenuVisible = ref(false)
const isPopupVisible = ref(false)
</script>

<template>
  <div class="header-admin-section">
    <div class="header-container">
      <div class="image-logo">
        <a href="https://aiu.edu.my/">
          <img src="/images/AIU-Official-Logo.png" alt="image-logo">
        </a>
      </div>
      <div class="title">
        <p>Al bukhary International University Admin Dashboard </p>
      </div>
      <button class="setting-btn" @click="isMenuVisible = !isMenuVisible">
        <span>
          <UIcon
              name="mage-user"
          />
        </span>
        Setting
      </button>
      <ul v-if="isMenuVisible" class="submenu">
        <li>
          <button>
            <span class="user-icon">
              <UIcon name="bxs-user"/>
            </span>Sing Out
          </button>
        </li>
        <li>
          <button @click="isPopupVisible=true">
            <span class="user-icon">
              <UIcon name="bxs-user"/>
            </span>Change Password
          </button>
          <Popup :show="isPopupVisible" @update:show="isPopupVisible = $event"></Popup>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.header-admin-section {
  background-color: #f5f5f5;
  margin: auto;
}

.header-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: .5rem 1rem;
  text-align: center;
}

.header-container .image-logo {
  flex: 15%;
  margin: 0;
}

.header-container .image-logo img {
  width: 60px;
  height: 50px;
}

.header-container .title {
  flex: 70%;
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-color);
}

.header-container .setting-btn {
  flex: 15%;
  padding: 0.5em;
  font-size: 1.2rem;
  color: var(--main-color);
  border: none;
  cursor: pointer;
}

.header-container .setting-btn {
  background-color: var(--main-color);
  color: var(--bg-color);
  transition: 0.3s ease-in-out;
  border-radius: 1rem 0;
  outline: none;
}

.header-container .setting-btn:hover {
  background-color: var(--text-hovor-color);
}

.submenu {
  display: block;
  width: 100px;
  min-width: 15rem;
  list-style: none;
  padding: 1rem;
  margin: 0.5em 1em;
  text-align: center;
  align-items: center;
}

.submenu li {
  margin: 0.3em 0;
  text-align: left;
}

.submenu button {
  color: var(--main-color);
  text-transform: capitalize;
  text-align: start;
  text-decoration: none;
  font-size: 1.2rem;
}

.user-icon {
  margin: .5rem;
}

@media (max-width: 1200px) {
  .submenu {
    display: block;
  }

  .title {
    display: none;
  }
}

</style>