<script setup lang="ts">

import {onMounted, ref} from 'vue'
import {useNuxtApp} from '#app'
import Popup from '~/components/PopupStudentMaintenanceRoom.vue'

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
  {key: 'studentId', label: 'Student ID', sortable: true},
  {key: 'roomNo', label: 'Room No', sortable: true},
  {key: 'whatsappNo', label: 'WhatsApp No', sortable: true},
  {key: 'gender', label: 'Gender', sortable: true},
  {key: 'status', label: 'Status', sortable: true},
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


const visibleButtonIndex = ref<number | null>(null);

const navigationButtons = [
  {
    name: "Student",
    icon: "ph-student",
    links: [
      {text: "Register Student", url: "/student-registration-form"},
      {text: "Manage Student", url: "/student-registration-dashboard"},
    ],
  },
  {
    name: "Maintenance",
    icon: "wpf-maintenance",
    links: [
      {text: "Maintenance Form", url: "/maintenance-room-form"},
      {text: "Manage Maintenance", url: "/maintenance-room-dashboard"},
    ],
  },
  {
    name: "Change Room",
    icon: "bx-building",
    links: [
      {text: "Change Room Form", url: "/change-room-form"},
      {text: "Manage Room Changes", url: "/change-room-dashboard"},
    ],
  },
  {
    name: "Room",
    icon: "bx-building",
    links: [
      {text: "Manage Rooms", url: "/room-dashboard"},
    ],
  },
];

function toggleLinkVisibility(index: number) {
  visibleButtonIndex.value = visibleButtonIndex.value === index ? null : index;
}

</script>

<template>

  <div class="admin-dashboard">
    <div class="container">

      <aside class="sidebar">
        <div v-for="(button, index) in navigationButtons" :key="index">
          <div class="btn-container">
            <button
                @click="toggleLinkVisibility(index)"
                :aria-expanded="visibleButtonIndex === index"
                class="sidebar-button"
            >
              <UIcon
                  :name="button.icon"
              />
              {{ button.name }}
            </button>
          </div>
          <ul v-if="visibleButtonIndex === index">
            <li v-for="(link, linkIndex) in button.links" :key="linkIndex">
              <a :href="link.url">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </aside>

      <main class="dashboard-content">
        <StudentRegistrationForm/>

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
  border: 3px solid var(--main-color);
  border-radius: 0 1rem 1rem 0;
}

@media (max-width: 1200px) {
  .admin-dashboard .container{
    border-radius: 0;
    border: none;
  }
}
.sidebar {
  flex: 0 0 15%;
  background-color: var(--main-color);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-content {
  flex: 1;
}

.sidebar-button {
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  text-align: start;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
}

.sidebar-button:hover {
  color: var(--text-hovor-color);
  background-color: var(--main-hovor-color);
  transition: 0.3s ease-in-out;
}

.btn-container {
  display: flex;
  margin-bottom: .5rem;
  font-size: 1rem;
  font-weight: normal;
  color: var(--text-color);
  background-color: transparent;
}

.btn-container:hover {
  display: flex;
  margin-bottom: .5rem;
  font-size: 1rem;
  font-weight: normal;
  color: var(--text-color);
  background-color: var(--main-hovor-color);
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

@media (max-width: 1200px) {
  .admin-dashboard > .container {
    flex-direction: column;
  }

  .sidebar {
    min-height: 30vh;
    flex-basis: 100%;
  }
}

@media (max-width: 768px) {
  .sidebar {
    flex-basis: 100%;
    min-width: 0;
  }

  .dashboard-content {
    padding: 1rem;
  }
}
</style>
