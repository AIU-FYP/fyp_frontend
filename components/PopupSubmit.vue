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
      <div class="notification">
        <div class="notification-icon">
          <UIcon
           name="ep-success-filled"
          />
        </div>
        <div class="thank-info">
          <p>
            Dear Student, Thank you for submitting your room maintenance request. We have successfully received your
            application, and our team will review it within the next 7 days. We will keep you informed about the
            progress and let you know if any further information is needed.
          </p>
          <h2>Thank you for your patience.</h2>
        </div>
      </div>
      <hr class="divider">
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
  max-width: 50%;
  width: 80%;
  position: relative;
  text-align: center;
}

.notification-icon {
  font-size: 15rem !important;
  color: var(--main-color);
}

span {
  margin: 0 5px;
}

.thank-info{
  margin-top: -5rem;
}

h2{
  font-size: 1.5rem;
  color: var(--main-color);
  line-height: 2.5rem;
}

p{
  font-size: 1.2rem;
  line-height: 2rem;
  color: var(--text-color);
  text-align: justify;
}

.divider {
  margin: 5% 3%;
  border: 1px solid var(--text-color);;
}


</style>
