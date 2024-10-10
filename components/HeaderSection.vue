<script setup lang="ts">

import { ref } from 'vue'

type DropdownStates = {
  students: boolean;
  learnMore: boolean;
};

const dropdownStates = ref<DropdownStates>({
  students: false,
  learnMore: false,
});

const toggleMessage = (dropdown: keyof DropdownStates) => {
  dropdownStates.value[dropdown] = !dropdownStates.value[dropdown];
};
</script>

<template>
  <div class="header-secrion">
    <div class="container">
      <div class="image-logo">
        <img src="/images/AIU-Official-Logo.png" alt="aiu-logo">
      </div>
      <div class="title">
        <h2>smart AIU managment system </h2>
      </div>
      <div class="links-box">
        <ul>
          <li><a href="#">
              <span>
                <UIcon name="material-symbols-contact-page"
                />
              </span>
            Home
          </a></li>
          <li><a href="#">
              <span>
                <UIcon name="la-university"
                />
              </span>
            About</a></li>
          <li>
            <span>
                <UIcon name="ph-student-bold"
                />
              </span>
            Students
            <a href="#">
              <ul class="students-links-box" v-show="dropdownStates.students">
                <li @click="toggleMessage('students')"><a href="#">Maintenance Room</a></li>
                <li><a href="#">Requested to change room</a></li>
                <li><a href="#">Maintenance Room</a></li>
                <li><a href="#">Requested to change room</a></li>
              </ul>
            </a>
          </li>
          <li @click="toggleMessage('learnMore')">
            <span>
                <UIcon name="pepicons-pop-info-circle"
                />
              </span>
            Learn more
            <a href="#">
              <ul class="learn-more-box" v-show="dropdownStates.learnMore">
                <li @click="toggleMessage('learnMore')" ><a href="#">Hostel leave</a></li>
                <li><a href="#">Policy</a></li>
              </ul>
            </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

.header-secrion {
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

.container .image-logo {
  flex: 10%;
  margin: .5rem 0 .5rem 1rem;
}

.container .title {
  flex: 40%;
  margin: .5rem;
  text-align: start;
}

.container .links-box {
  flex: 40%;
  margin: .5rem;
}

@media (max-width: 800px) {
  .container {
    flex-direction: column;
  }

  .container {
    flex: 1 1 100%;
  }
}

.image-logo img {
  width: 70px !important;
  height: 50px !important;
}

.title h2 {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  text-transform: capitalize;
  color: var(--main-color);
}

.links-box > ul {
  display: flex;
  justify-content: space-between;
}

.links-box ul li {
  list-style: none;
  font-size: 1.2rem;
}

@media (max-width: 800px) {
  .container {
    flex-direction: column;
  }

  .links-box ul {
    display: block;
  }
}

.links-box ul li {
  list-style: none;
  font-size: 1.2rem;
}

.links-box ul li span {
  color: var(--main-color);
  margin-right: 0.5rem;
}

.students-links-box {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 10rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
  z-index: 1;
}

.learn-more-box{
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 3rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 3rem;
  margin: 2rem 0;
  z-index: 1;
}

.students-links-box,
.learn-more-box{
  display: block;
  padding: 1rem;
}

.students-links-box li a {
  margin: .5rem;
}

.students-links-box:hover .students-links-box {
  display: block;
}


</style>