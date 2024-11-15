<script setup>
import {defineEmits, defineProps} from 'vue'

const studentFields = [
  {label: 'ID ', key: 'id'},
  {label: 'Name ', key: 'name'},
  {label: 'Student ID Number ', key: 'studentIdNumber'},
  {label: 'Room Number ', key: 'roomNumber'},
  {label: 'phone Number ', key: 'phoneNumber'},
  {label: 'WhatsApp Number ', key: 'whatsappNumber'},
  {label: 'Email Address ', key: 'emailAddress'},
  {label: 'Gender ', key: 'gender'},
  {label: 'Location specific Issue ', key: 'locationSpecificIssue'},
  {label: 'Frequent damages occur', key: 'frequentTheDamagesOccur'},
  {label: 'Student Nationality ', key: 'studentNationality'},
  {label: 'Photo evidence damages ', key: 'photoEvidenceDamages'},
  {label: 'Reason for room change', key: 'detailTheDamage'},
  {key: 'status', label: 'Status'},
];

const props = defineProps({
  show: Boolean,
  student: Object
});

const emit = defineEmits(['update:show'])

const closePopup = () => {
  emit('update:show', false)
}
</script>

<template>
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="popup-header">
        <span style="font-size: 1.5rem">Welcome  to {{props.student.name}}</span>
        <span @click="closePopup" class="close-btn">
          <UIcon
              name="fontisto-close"
          />
        </span>
      </div>
      <hr class="divider">
      <div class="popup-content">
        <div class="box" v-for="field in studentFields" :key="field.key">
          <span class="student-label-info">
            <span>
              <UIcon
                  style="color: var(--main-color)"
                  name="ph-student"
              />
            </span>
            {{ field.label }}</span>
          <span class="student-key-info">
            <span>
              <UIcon
                  style="color: var(--main-color)"
                  name="bx-data"
              />
            </span>
            {{ student[field.key] }}</span>
        </div>
      </div>
      <hr class="divider">
      <div class="popup-footer">
        <div class="popup-bts">
          <button class="work-done-by-SA" id="workDoneBySA">Work done by SA</button>
          <button class="work-done-by-PPK" id="workDoneByPPK">Work done by PPK</button>
          <button class="reject-maintenance-request" id="rejectMaintenanceRequest">Reject request</button>
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
  background: rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  background: #fff;
  padding: 2rem;
  width: 60%;
  max-width: 60%;
  scroll-behavior: smooth;
  text-align: center;
  max-height: 90vh;
  position: relative;
  overflow-y: auto;
  border: 3px solid var(--main-color);
}

@media (max-width: 1200px) {
  .popup-container {
    width: 90%;
    max-width: 100%;
  }
}


@media (max-width: 800px) {
  .popup-container {
    width: 100%;
    max-width: 100%;
    border-radius:  0;
  }
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
  color: var(--main-color);
}

.close-btn:hover {
  color: #ff0000;
  transition: .2s ease-in-out;
}

.divider {
  margin: 3% 2%;
  border: 2px solid var(--main-color);;
}

.popup-content {
  padding: 0 20px;
}

.box {
  display: flex;
}

.student-label-info,
.student-key-info {
  text-align: start;
  text-transform: capitalize;
  color: var(--main-color);
  font-size: 1.2rem;
  width: 50%;
  padding: .5rem;
  border-radius: .5rem 0;
  background-color: #eeeeee;
  margin-bottom: .5rem;
}

@media (max-width: 800px){
  .box{
    display: flex;
    flex-direction: column ;
  }
  .student-label-info,
  .student-key-info {
    width: 100%;
    font-size: .9rem;
  }
}

.popup-bts {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 0;
}

.popup-bts button {
  padding: .5rem;
  font-size: 1.2rem;
  text-transform: capitalize;
}

.popup-bts .work-done-by-SA {
  border-radius: 0 1rem;
  border: 2px solid var(--main-color);
}

.popup-bts .work-done-by-SA:hover {
  background: var(--main-color);
  color: var(--text-hovor-color);
  transition: .4s ease-in-out;
}

.popup-bts .work-done-by-PPK {
  border-radius: 0 1rem;
  border: 2px solid var(--main-hovor-color);
}

.popup-bts .work-done-by-PPK:hover {
  background: var(--main-hovor-color);
  color: var(--text-hovor-color);
  transition: .4s ease-in-out;
}

.popup-bts .reject-maintenance-request {
  border-radius: 0 1rem;
  border: 2px solid red;
}

.popup-bts .reject-maintenance-request:hover {
  background: red;
  color: var(--text-hovor-color);
  transition: .4s ease-in-out;
}

@media (max-width: 800px){
  .popup-bts button {
    padding: .5rem;
    margin: 1rem 0;
    font-size: 1rem;
  }
}

h2 {
  font-size: 1.5rem;
  text-align: center;
  text-transform: capitalize;
}

</style>
