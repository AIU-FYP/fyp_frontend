<script setup>
import {defineEmits, defineProps} from 'vue';
import axios from 'axios';

const requestFields = [
  {label: 'ID ', key: 'id'},
  {label: 'Name ', key: 'student'},
  {label: 'Student ID ', key: 'student_id'},
  {label: 'Room No ', key: 'room_number'},
  {label: 'phone No ', key: 'phone'},
  {label: 'Email Address ', key: 'email'},
  {label: 'Gender ', key: 'gender'},
  {label: 'Frequent damages occur', key: 'occurrence'},
  {label: 'Student Nationality ', key: 'nationality'},
  {label: 'Photo evidence damages ', key: 'evidence_photo'},
  {label: 'Reason for room change', key: 'explanation'},
  {key: 'status', label: 'Status'},
];

const props = defineProps({
  show: Boolean,
  request: Object,
});

const emit = defineEmits(['update:show']);

const closePopup = () => {
  emit('update:show', false);
};

const updateStatus = async (status) => {
  try {
    const response = await axios.patch(
        `/api/${props.request.type}-requests/${props.request.id}/`,
        {
          status: status,
        }
    );
    // Handle success
    emit('update:show', false);
    alert('Status updated successfully');
  } catch (error) {
    console.error('Failed to update status:', error);
    alert('Failed to update status. Please check the console for details.');
  }
};
</script>

<template>
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="popup-header">
        <span style="font-size: 1.5rem">Student name is {{ props.request.student }}</span>
        <span @click="closePopup" class="close-btn">
          <UIcon name="fontisto-close"/>
        </span>
      </div>
      <hr class="divider">

      <div class="popup-content">
        <div class="box" v-for="field in requestFields" :key="field.key">
          <span class="student-label-info">
            <span>
              <UIcon style="color: var(--main-color)" name="ph-student"/>
            </span>
            {{ field.label }}
          </span>
          <span class="student-key-info">
            <span v-if="field.key === 'evidence_photo'">
              <a
                  :href="request[field.key]"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link"
                  style="color: var(--main-color); text-decoration: underline; cursor: pointer;"
              >
                Supporting Document
              </a>
            </span>
            <span v-else-if = "field.key === 'explanation' " class="truncate-single">
              {{request[field.key]}}
            </span>
            <span v-else>
              {{ request[field.key] }}
            </span>
          </span>
        </div>
      </div>

      <hr class="divider">

      <div class="popup-footer">
        <div class="popup-bts">
          <button class="reject-maintenance-request" @click="updateStatus('rejected')">
            Reject request
          </button>
          <button class="work-done-by-ppk" @click="updateStatus('ppk_done')">
            Work done by PPK
          </button>
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
  background: rgba(0, 0, 0, 0.8);
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
    border-radius: 0;
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
  font-size: 1rem;
  width: 50%;
  padding: .5rem;
  border-radius: .5rem 0;
  background-color: #eeeeee;
  margin-bottom: .5rem;
}

.truncate-single {
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  word-wrap: break-word;
  line-height: 1.5rem;
  padding: 0.5rem;
}


@media (max-width: 800px) {
  .box {
    display: flex;
    flex-direction: column;
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
  margin: 1rem 0;
}

.popup-bts button {
  padding: .5rem;
  font-size: 1.2rem;
  text-transform: capitalize;
}

.popup-bts .work-done-by-PPK {
  border-radius: 0 1rem;
  border: 2px solid var(--main-hovor-color);
}

.popup-bts .work-done-by-PPK:hover {
  background: var(--button-hovor-color);
  border: 2px solid var(--button-hovor-color);
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

@media (max-width: 800px) {
  .popup-bts {
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: 0;
  }

  .popup-bts button {
    padding: .5rem;
    margin: 1rem 0;
    font-size: 1rem;
  }
}


</style>
