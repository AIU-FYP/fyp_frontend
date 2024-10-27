<template>
  <div class="header-section">
    <div class="container">

      <div class="image-logo">
        <img src="/images/AIU-Official-Logo.png" alt="aiu-logo"/>
      </div>

      <div class="title">
        <h2>Smart AIU Management System</h2>
      </div>

      <div class="bar-icon" @click="toggleNav">
        <UIcon name="fluent-list-bar-20-filled"/>
      </div>

      <div class="links-box" :class="{ 'show-nav': isNavVisible }">
        <ul>
          <li><a href="#"><span class="icon"><UIcon name="material-symbols-contact-page"/></span>Home</a></li>
          <li><a href="#"><span class="icon"><UIcon name="la-university"/></span>About</a></li>

          <li class="dropdown">
            <button class="dropbtn" tabindex="0">
              <span class="icon"><UIcon name="ph-student-light"/></span>Students
            </button>
            <div class="dropdown-content">
              <a href="#">Maintenance Room</a>
            </div>
          </li>

          <li class="dropdown">
            <button class="dropbtn" tabindex="0">
              <span class="icon"><UIcon name="pepicons-pop-info-circle"/></span>Learn More
            </button>
            <div class="dropdown-content">
              <a href="#">Hostel Leave</a>
              <a href="#">Policy</a>
              <a href="#">Contact</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const isNavVisible = ref(false);

const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value;
};
</script>

<style scoped>
.header-section {
  background-color: #eeeeee;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 1rem;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.image-logo img {
  width: 70px !important;
  height: 50px !important;
}

.title {
  flex: 1;
  text-align: start;
}

.title h2 {
  font-size: 1.5rem;
  font-weight: normal;
  text-transform: uppercase;
  text-align: center;
  color: var(--main-color);
}

.bar-icon {
  display: none;
  cursor: pointer;
  font-size: 2rem;
  color: var(--main-color);
}

.links-box {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.links-box ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.links-box ul li {
  margin-left: 1.5rem;
  font-size: 1.2rem;
  color: var(--main-color);
}

.links-box ul li:hover {
  color: var(--text-hovor-color);
  cursor: pointer;
  transition: .2s;
}

.links-box ul .icon {
  margin: .5rem;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 0;
  margin-left: -2rem;
}

.dropdown:hover .dropdown-content {
  display: block;
  background-color: #eeeeee;
  padding: 1rem;
}

.dropdown-content a {
  color: var(--main-color);
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

@media (max-width: 800px) {
  .container {
    display: block;
    flex-direction: column;
  }

  .bar-icon {
    display: block;
  }

  .title {
    display: none;
    padding: 1rem 0;
  }

  .links-box {
    display: none;
    width: 100%;
    text-align: start;
    margin: 1rem 0;
    padding: 0;
  }

  .links-box.show-nav {
    display: block;
  }

  .links-box > ul {
    flex-direction: column;
  }

  .links-box > ul li {
    margin: 0.5rem 1rem;
  }

  .image-logo {
    display: none;
  }

  .dropdown-content {
    width: 100%;
    box-shadow: none;
  }
}

</style>