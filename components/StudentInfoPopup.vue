<script setup lang="ts">
import {ref} from 'vue';

const studentsInfo = [
  {label: "Student ID Number"},
  {label: "Student Name"},
  {label: "Room Number"},
  {label: "Phone Number"},
  {label: "Email Address"},
  {label: "Type of damage"},
  {label: "How frequent the damages occur?"},
  {label: "Please provide evidence?"},
  {label: "Explain in detail"}
];

const showPopup = ref(false);
const selectedInfo = ref<string | null>(null);

const openPopup = (info: string) => {
  selectedInfo.value = info;
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
  selectedInfo.value = null;
};
</script>

<template>

  <div v-for="(studentInfo, index) in studentsInfo" :key="index">
    <button @click="openPopup(studentInfo.label)">View Info</button>
  </div>


  <div class="student-info">
    <div class="container">

      <div v-if="showPopup" class="popup-overlay">
        <div class="popup-content">
          <div class="header">
            <h1 class="close-popup" @click="closePopup">
              <UIcon
                  name="gravity-ui-square-xmark"
              />
            </h1>
            <h1>Welcome to AIU </h1>
          </div>
          <div class="popup-body">
            <p class="student-info" v-for="studentInfo in studentsInfo" :key="studentInfo.label">
              {{ studentInfo.label }}
            </p>
          </div>

          <h1>Thank you</h1>
        </div>
      </div>
    </div>

    </div>
</template>

<style scoped>
.student-info {
  margin: 5rem auto;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 10%;
  width: 80%;
  padding: 2rem;
  box-sizing: border-box;
  align-items: center;
  background-color: #eeeeee;
}

.student-info-content div {
  flex: 1 1 50%;
}

.student-info-content h2 {
  font-size: 1.5rem;
  font-weight: normal;
  text-align: start;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
}

.popup-content {
  background-color: white;
  width: 60%;
  padding: 2rem;
  border-radius: 1rem;
  text-align: start;
  max-height: 40rem;
  overflow-y: auto;
}

.popup-overlay h1 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0.5rem 0;
  color: var(--main-color);
}

.close-popup:hover {
  cursor: pointer;
  color: red;
  transition: .3s;
}

@media (max-width: 800px) {
  .popup-content {
    width: 90%;
    padding: 1rem;
  }
}

</style>
