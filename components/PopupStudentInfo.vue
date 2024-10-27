<script setup>
import {defineEmits, defineProps} from 'vue'

const student = [{
  studentName: "student name",
  StudentIDNumber: "Student ID Number",
  RoomNumber: "Room Number",
  PhoneNumber: "Phone Number",
  WhatsAppNumber: "WhatsApp Number",
  EmailAddress: "Email Address ",
  Gender: "Gender",
  EnterYourNationality: "Enter your Nationality",
  PleaseProvidePhotoEvidence: "Please provide photo evidence",
  ExplainYourReasonForRoomChange: "Explain your reason for room change"

}]

const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['update:show'])

const closePopup = () => {
  emit('update:show', false)
}
</script>

<template>
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="popup-header">
        <span style="font-size: 1.5rem">Welcome Back!</span>
        <span @click="closePopup" class="close-btn">
          <UIcon
              name="fontisto-close"
          />
        </span>
      </div>
      <hr class="divider">
      <div class="popup-content">
        <div class="container" v-for="label in Object.values(student[0])" :key="label">
          <div>
            <h2 class="student-info">{{ label}}</h2>
          </div>
          <div></div>
        </div>
      </div>
      <hr class="divider">
      <div class="popup-footer">
        <div class="popup-bts">
          <button class="accept" id="accept">Accept request</button>
          <button class="reject" id="reject">Reject request</button>
        </div>
        <div>
          <h2>Thank you </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 60%;
  width: 80%;
  scroll-behavior: smooth;
  text-align: center;
  max-height: 90vh;
  position: relative;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

span {
  margin: 0 5px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
}

.close-btn:hover {
  color: #ff0000;
  transition: .2s ease-in-out;
}

.divider {
  margin: 5% 3%;
  border: 1px solid var(--text-color);;
}

.popup-content {
  padding: 0 20px ;
}

.student-info{
  text-align: start;
  text-transform: capitalize;
  color: var(--text-color);
  font-size: 1.2rem;
  width: 50%;
  padding: .5rem ;
  border-radius: .5rem 0 ;
  background-color: #eeeeee;
  margin-bottom: 1rem;
}

.popup-bts {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.popup-bts button {
  padding: .5rem;
  font-size: 1.2rem;
  text-transform: capitalize;
}

.popup-bts .accept {
  border-radius: 1rem;
  border: 2px solid var(--main-color);
}

.popup-bts .accept:hover {
  background: var(--main-color);
  transition: .4s ease-in-out;
}


.popup-bts .reject {
  border-radius: 1rem;
  border: 2px solid red;
}

.popup-bts .reject:hover {
  background: red;
  transition: .4s ease-in-out;
}


</style>
