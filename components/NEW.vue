<template>
  <div class="header-section">
    <div class="container">
      <div class="image-logo">
        <img src="/images/AIU-Official-Logo.png" alt="aiu-logo"/>
      </div>
      <div class="title">
        <h2>Smart AIU Management System</h2>
      </div>
      <div class="links-box">
        <ul> <span><UIcon name="fluent-list-bar-20-filled"/></span>

          <li><a href=""><span class="icon" ><UIcon name="material-symbols-contact-page"/></span>Home</a></li>
          <li><a href=""><span class="icon"><UIcon name="la-university"/></span> About</a></li>
          <li class="dropdown">
            <span @click="toggleDropdown('students')" class="dropbtn">
              <span class="icon"><UIcon name="ph-student-light"/>
              </span> Students </span>
            <ul v-show="dropdowns.students" class="dropdown-content">
              <li><a href=""> Maintenance Room </a></li>
            </ul>
          </li>
          <li class="dropdown">
            <span @click="toggleDropdown('learnMore')" class="dropbtn">
              <span class="icon"><UIcon name="pepicons-pop-info-circle"/></span> Learn More
            </span>
            <ul v-show="dropdowns.learnMore" class="dropdown-content">
              <li><a href=""> Hostel leave</a></li>
              <li><a href=""> Policy</a></li>
              <li><a href="">Contact</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';

const dropdowns = ref({
  students: false,
  learnMore: false,
});

const toggleDropdown = (dropdown) => {
  dropdowns.value[dropdown] = !dropdowns.value[dropdown];
};

const closeDropdown = (event) => {
  if (!event.target.matches('.dropbtn')) {
    dropdowns.value.students = false;
    dropdowns.value.learnMore = false;
  }
};

onMounted(() => {
  window.addEventListener('click', closeDropdown);
});

</script>

<style scoped>
.header-section {
  background-color: #eeeeee;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.image-logo {
  flex: 10%;
  margin: .5rem 1.5rem;
}

.image-logo img {
  width: 70px !important;
  height: 50px !important;
}

.title {
  flex: 40%;
  margin: 0.5rem;
  text-align: start;
}

.title h2 {
  font-size: 1.5rem;
  font-weight: normal;
  text-transform: uppercase;
  text-align: center;
  color: var(--main-color);
}

.links-box {
  flex: 40%;
  margin: 0.5rem;
  display: flex;
  justify-content:end;
  font-size: 1.2rem;
}

.links-box .icon{
  font-weight: bold;
  margin: 0.5rem ;
}

.links-box > ul {
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: .5rem;
}

.links-box > ul li {
  font-size: 1rem;
  color: var(--main-color);
  margin: 0 0.5rem;
}

@media (max-width: 820px) {
  .image-logo img {
    width: 60px !important;
    height: 50px !important;
  }

  .title {
    display: none;
  }
}

.dropdown-content {
  position: absolute;
  background-color: #f1f1f1;
  min-width: 10rem;
  overflow: auto;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  list-style-type: none;
  padding: 1rem;
  margin: 1rem 0 0 -3rem;
}

.dropdown-content li {
  color: var(--main-color);
}

.dropdown-content li a {
  display: block;
  color: var(--main-color);
  padding: .5rem 0;
}

.dropdown-content li a:hover {
  background-color: #ddd;
}

@media (max-width: 800px) {
  .dropdown-content {
    width: 100%;
    padding: 0.5rem 1rem;
    margin: 0;
  }

}

</style>
