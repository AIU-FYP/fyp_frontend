<script setup lang="ts">
import {onMounted, ref} from 'vue';
import Popup from "~/components/PopupChangePassword.vue";
import PopupNewAdmin from "~/components/PopupNewAdmin.vue";

const isLinksVisible = ref(false);
const isPopupChangePasswordVisible = ref(false);
const isPopupNewAdminVisible = ref(false);
const isMobile = ref(false);

function toggleLinksVisibility() {
  isLinksVisible.value = !isLinksVisible.value;
}

onMounted(() => {
  isMobile.value = window.innerWidth <= 1200;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 1200;
  });
});

const auth = useAuth();

const handleLogout = () => {
  navigateTo('/home');
  auth.logout();
};
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

        <div class="title">
          <h1>Admin Dashboard</h1>
        </div>

        <div class="bar-btn">
          <button class="nav-item" @click="toggleLinksVisibility">
            Services
            <span class="sublist" v-if="isLinksVisible">
                <a class="sub-item" @click="isPopupNewAdminVisible = true">Add New Admin</a>
                <PopupNewAdmin :show="isPopupNewAdminVisible" @update:show="isPopupNewAdminVisible = $event"/>
                <a class="sub-item" style="cursor: pointer"
                   @click="isPopupChangePasswordVisible = true">Change Password</a>
                <Popup :show="isPopupChangePasswordVisible" @update:show="isPopupChangePasswordVisible = $event"/>
                <a class="sub-item" @click="handleLogout">
                  <router-link to="/">Log Out</router-link>
              </a>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-admin-section {
  background-color: var(--main-color);
  margin: auto;
  border-bottom: .2rem solid var(--text-color);
}

.container-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem;
}

.header-container .image-logo img {
  width: 60px;
  height: 50px;
}

.title {
  font-size: 1.5rem;
  color: var(--text-color);
}

.bar-btn {
  position: relative;
}

.bar-btn button {
  font-size: 1.2rem;
  color: var(--text-hovor-color);
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.bar-btn button:hover {
  background-color: var(--main-hovor-color);
  transition: .3s ease-in-out;
}

.nav-item {
  position: relative;
}

.sublist {
  display: none;
  position: absolute;
  margin-top: 1rem;
  top: 100%;
  left: -6rem;
  background-color: var(--main-color);
  list-style: none;
  padding:.5rem;
  border-radius: .5rem ;
  z-index: 10;
}

.sublist a {
  display: block;
  padding: .3rem .5rem ;
  white-space: nowrap;
}

.sublist a:hover {
  background-color: var(--main-hovor-color);
}

.sublist {
  display: block;
}

@media (max-width: 1200px) {
  .header-container {
    display: block;
  }

  .title {
    display: none;
  }

  .bar-btn {
    margin: 0;
    border-radius: 0.5rem;
    background-color: var(--main-color);
    color: var(--text-hovor-color);
  }

  .sublist {
    display: block;
    width: 100%;
    min-width:100%;
  }

  .sublist a {
    display: block;
    padding: .3rem .5rem ;
    white-space: nowrap;
  }

  .sublist a:hover {
    background-color: var(--main-hovor-color);
  }

  .sublist {
    display: block;
  }
  .container-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem;
  }

  .header-container .image-logo img {
    width: 60px;
    height: 50px;
  }

  .title {
    font-size: 1.5rem;
    color: var(--text-color);
  }

  .bar-btn {
    position: relative;
  }

  .bar-btn button {
    font-size: 1.2rem;
    color: var(--text-hovor-color);
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }

  .bar-btn button:hover {
    background-color: var(--main-hovor-color);
    transition: .3s ease-in-out;
  }

  .nav-item {
    position: relative;
  }

  .sublist {
    display: none;
    position: absolute;
    margin-top: 1rem;
    top: 100%;
    left: -6rem;
    background-color: var(--main-color);
    list-style: none;
    padding:.5rem;
    border-radius: .5rem ;
    z-index: 10;
  }

  .sublist a {
    display: block;
    padding: .3rem .5rem ;
    white-space: nowrap;
  }

  .sublist a:hover {
    background-color: var(--main-hovor-color);
  }

  .sublist {
    display: block;
  }
}
</style>
