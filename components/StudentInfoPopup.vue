<script setup>
import { defineEmits, defineProps } from 'vue';
import axios from 'axios';

const props = defineProps({
  show: Boolean,
  student: Object,
});

const emit = defineEmits(['update:show']);

const studentFields = [
  { label: 'ID ', key: 'id' },
  { label: 'Status', key: 'status' },
  { label: 'Name', key: 'name' },
  { label: 'Student ID', key: 'student_id' },
  { label: 'Passport No', key: 'passport' },
  { label: 'Date of Arrival', key: 'arrival_date' },
  { label: 'WhatsApp No', key: 'phone' },
  { label: 'Student Email', key: 'email' },
  { label: 'Gender', key: 'gender' },
  { label: 'Religion', key: 'religion' },
  { label: 'Nationality', key: 'nationality' },
  { label: 'Program/Major', key: 'major' },
  { label: 'Block Name', key: 'name' },
  { label: 'Level No', key: 'level' },
  { label: 'Room No', key: 'room' },
  { label: 'Hostel Name', key: 'room' },
  { label: 'Which Zone?', key: 'room_zone' },
];

const closePopup = () => {
  emit('update:show', false);
};

const updateStudentInfo = async () => {
  try {
    const response = await axios.patch(
        `http://127.0.0.1:8000/api/students/${props.student.id}/`,
        { ...props.student }
    );
    console.log('Success:', response.data);
    alert("Student info updated successfully");
    emit('update:show', false);
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};

const deleteStudent = async () => {
  try {
    const response = await axios.delete(
        `http://127.0.0.1:8000/api/students/${props.student.id}/`
    );
    console.log('Student deleted:', response.data);
    alert("Student deleted successfully");
    emit('update:show', false); // Close the popup after deletion
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};

</script>

<template>
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="popup-header">
        <span style="font-size: 1.5rem">Welcome to {{ props.student.name }}</span>
        <span @click="closePopup" class="close-btn">
          <UIcon name="fontisto-close" />
        </span>
      </div>
      <hr class="divider">
      <div class="popup-content">
        <div class="box" v-for="field in studentFields" :key="field.key">
          <span class="student-label-info">
            <span>
              <UIcon style="color: var(--main-color)" name="ph-student" />
            </span>
            {{ field.label }}:
          </span>
          <span class="student-key-info">
            <input
                v-if="field.key !== 'status'"
                v-model="props.student[field.key]"
                class="control-input"
            />
            <span v-else>{{ props.student[field.key] }}</span>
          </span>
        </div>
      </div>
      <hr class="divider">
      <div class="popup-footer">
        <div class="popup-bts">
          <button @click="deleteStudent" class="delete-student">Delete Student</button>
          <button @click="updateStudentInfo" class="change-student-info">
            Change Student Info
          </button>
        </div>
        <div>
          <h2>Thank you</h2>
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
  z-index: 1000;
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
  z-index: 1001;
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
  font-size: 1.2rem;
  width: 50%;
  padding: .5rem;
  border-radius: .5rem 0;
  background-color: #eeeeee;
  margin-bottom: .5rem;
}

.control-input {
  text-align: start;
  text-transform: capitalize;
  color: var(--main-color);
  font-size: 1.2rem;
  width: 100%;
  outline: none;
  background-color: #eeeeee;
  margin-bottom: .5rem;
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
}


@media (max-width: 800px){
  .popup-bts{
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

.popup-bts button {
  padding: .5rem;
  font-size: 1.2rem;
  text-transform: capitalize;
}

.popup-bts .change-student-info {
  border-radius: 0 1rem;
  border: 2px solid var(--main-color);
}

.popup-bts .change-student-info:hover {
  background: var(--main-color);
  color: var(--text-hovor-color);
  transition: .4s ease-in-out;
}

.popup-bts .delete-student {
  border-radius: 0 1rem;
  border: 2px solid red;
}

.popup-bts .delete-student:hover {
  background: red;
  color: var(--text-hovor-color);
  transition: .4s ease-in-out;
}

@media (max-width: 800px) {
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


