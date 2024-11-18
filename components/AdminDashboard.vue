<script setup lang="ts">

import {onMounted, ref} from 'vue'
import {useNuxtApp} from '#app'
import Popup from '~/components/PopupAdminInfo.vue'

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
  {key: 'name', label: 'Name', sortable: true},
  {key: 'staffId', label: 'Staff ID', sortable: true},
  {key: 'phoneNo', label: 'Phone No', sortable: true},
  {key: 'emailAdminAddress', label: 'Email', sortable: true},
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
      <main class="dashboard-content">
        <div class="sub-container">
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
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: block;
}

.admin-dashboard > .container {
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
  margin: 0 auto;
  max-width: 1300px;
  width: 100%;
}

@media (max-width: 1200px) {
  .admin-dashboard .container{
    border-radius: 0;
    border: none;
  }
}

.dashboard-content {
  flex: 1;
}

.sidebar ul {
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: start;
  text-transform: capitalize;
  font-weight: normal;
  color: var(--text-color);
  background-color: transparent;
}

.sidebar ul li:hover {
  color: var(--text-hovor-color);
  background-color: var(--main-hovor-color);
}


.extend-btn {
  text-decoration: none;
  background-color: var(--main-color);
  padding: 0.2rem 0.5rem;
  margin: 0;
  font-size: 1rem;
  border-radius: 0.5rem;
  color: #eeeeee;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.extend-btn:hover {
  background-color: var(--text-hovor-color);
  color: var(--main-color);
}


.admin-title,
.footer-megs {
  font-size: 1.5rem;
  color: var(--main-color);
  text-align: center;
}

.divider {
  width: calc(100% - 1rem);
  border-bottom: 0.1rem solid var(--main-color);
  margin: 1rem 0;
  padding: 0;
  color: var(--main-color);
}

/* Media Queries for Responsiveness */
@media (max-width: 1200px) {
  .admin-dashboard > .container {
    flex-direction: column;
  }

}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 1rem;
  }
}
</style>
