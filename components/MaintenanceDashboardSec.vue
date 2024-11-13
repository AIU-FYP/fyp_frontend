<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useNuxtApp} from '#app'
import Popup from '~/components/PopupStudentMaintenanceInfo.vue'

interface Person {
  id: number
  date: string
  name: string
  studentIdNumber: string
  roomNumber: string
  whatsappNumber: string
  emailAddress: string
  gender: string
  extend?: boolean | string
}

const columns = [
  {key: 'id', label: 'id'},
  {key: "date", label: 'Date',},
  {key: 'name', label: 'Name', sortable: true},
  {key: 'studentIdNumber', label: 'Student ID Number', sortable: true},
  {key: 'roomNumber', label: 'Room Number', sortable: true},
  {key: 'whatsappNumber', label: 'WhatsApp Number', sortable: true},
  {key: 'gender', label: 'Gender', sortable: true},
  {key: 'extend', label: 'Extend', sortable: false,}
]

const people = ref<Person[]>([]);

let {$axios} = useNuxtApp()
const api = $axios()

const fetchData = async () => {
  try {
    const response = await api.get("/Students/")
    people.value = response.data.map((person: Person) => ({
      ...person,
      date: new Date().toLocaleDateString()
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}


const isPopupVisible = ref(false);
const currentStudent = ref({});

const openPopup = (row: Person) => {
  currentStudent.value = row;
  isPopupVisible.value = true;
};

onMounted(fetchData)

</script>

<template>
  <div class="admin-dashboard">
    <div class="container">
      <div class="header">
        <h2 class="admin-title">Welcome back</h2>
      </div>
      <hr class="divider"/>
      <div class="content">
        <UTable :columns="columns" :rows="people">
          <template #extend-data="{ row }">
            <a @click="openPopup(row)" class="extend-btn">Extend</a>
            <Popup
                :show="isPopupVisible"
                @update:show="isPopupVisible = $event"
                :student="currentStudent"
            />
          </template>
        </UTable>
      </div>
      <hr class="divider"/>
      <div class="footer">
        <h2 class="footer-megs" style="text-align: center">Thank you !</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

.admin-dashboard {
  display: flex;
}

.container {
  margin: 5rem;
  padding: 2rem;
  background-color: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
}

@media (max-width: 1200px) {
  .container{
    margin: 5rem 0;
  }
}

.admin-title,
.footer-megs {
  font-size: 1.5rem;
  color: var(--main-color);
}

.divider {
  margin: 1rem 0;
  color: var(--main-color);
  border-bottom: 0.1rem solid var(--main-color);
}

.extend-btn {
  text-decoration: none;
  background-color: var(--main-color);
  padding: .2rem .5rem;
  font-size: 1rem;
  border-radius: .5rem 0;
  color: #eeeeee;
  cursor: pointer;
}

.extend-btn:hover {
  background-color: var(--text-hovor-color);
  transition: .3s ease-in-out;
  color: var(--main-color);
}

</style>