<template>
  <div class="header-section">
    <div class="container">
      <div class="image-logo">
        <a href="https://aiu.edu.my/">
          <img src="/images/AIU-Official-Logo.png" alt="aiu-logo"/>
        </a>
      </div>

      <div class="title">
        <h2>Smart AIU Management System</h2>
      </div>

      <div class="menu" :class="{ 'menu-visible': isNavVisible }">
        <ul class="menu-links">
          <li><router-link to="/home"><span class="icon"><UIcon class="bar-icon-links" name="material-symbols-contact-page"/></span>Home</router-link>
          </li>
          <li><router-link to="/about"><span class="icon"><UIcon class="bar-icon-links" name="la-university"/></span>About</router-link></li>
          <li class="dropdown" @click="toggleDropdown('student')">
            <span class="dropbtn">
              <UIcon name="ph-student-light"/>
              Student
            </span>
            <ul class="dropdown-content" :class="{ 'dropdown-visible': activeDropdown === 'student' }">
              <li><router-link to="/maintenance-room">Maintenance Room</router-link></li>
              <li><router-link to="request-to-change-room">Request to Change Room</router-link></li>
            </ul>
          </li>
          <li class="dropdown" @click="toggleDropdown('learnMore')">
            <span class="dropbtn">
              <UIcon class="bar-icon-links" name="ph-student-light"/>
              Learn More
            </span>
            <ul class="dropdown-content" :class="{ 'dropdown-visible': activeDropdown === 'learnMore' }">
              <li><a href="https://aiustudenthostelleavesystem.net/leave_system/singup">Hostel Leave</a></li>
              <li><router-link to="/faq">Policy</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const isNavVisible = ref(false);
const activeDropdown = ref(null);

const toggleDropdown = (dropdown) => {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown;
};
</script>

<style scoped>
.header-section {
  background-color: #eeeeee;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: .5rem;
}

.container {
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
  text-align: center;
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
  margin-right: 1rem;
}

.bar-icon-links {
  display: flex;
  justify-content: center;
  margin: .2rem;
}

.dropdown {
  position: relative;
}

.menu-links a,
.dropbtn {
  color: var(--main-color);
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #eeeeee;
  margin-top: 1rem;
  left: -2rem;
  min-width: 11rem;
  box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content.dropdown-visible {
  display: block;
}

.dropdown-content li {
  display: block;
  margin: .5rem 0;
}

.dropdown-content li > a {
  margin: 0 1rem;
  padding: .5rem;
}

@media (max-width: 1200px) {
  .dropdown-content.dropdown-visible {
    display: block;
    margin: 0;
  }

  .dropdown-content li {
    display: block;
    margin: 0;
  }

  .dropdown-content li > a {
    margin: 0 4rem;
    padding: .3rem 0;
  }

}

.dropdown-content a {
  color: var(--main-color);
  font-size: .9rem;
  margin: .5rem;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

@media (max-width: 1200px) {
  .container {
    display: block;
  }

  .title h2 {
    display: none;
    font-size: 1rem;
    margin: 1rem 3.5rem;
  }

  .menu {
    display: block;
  }

  .menu-links {
    display: block;
  }

  .menu-links li {
    display: block;
  }

  .dropdown-content {
    width: 100%;
    position: relative;
    box-shadow: none;
  }
}
</style>
