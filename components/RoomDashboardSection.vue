<script setup lang="ts">

import {onMounted, ref} from 'vue'
import {useNuxtApp} from '#app'
import Popup from '~/components/PopupRoom.vue'

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
  {key: 'gender', label: 'Gender', sortable: true},
  {key: 'blockName', label: 'Block Name', sortable: true},
  {key: 'roomNo', label: 'Room No', sortable: true},
  {key: 'levelNo', label: 'Level No', sortable: true},
  {key: 'status', label: 'Status', sortable: true},
  {key: 'extend', label: 'Extend', sortable: false,}
]

const people = ref<Person[]>([]);

let {$axios} = useNuxtApp()
const api = $axios()

const fetchData = async () => {
  try {
    const response = await api.get("/Students")
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
  background-color: var(--main-color);
}

.container {
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
  border: 3px solid var(--main-color);
  width: 100%;
  margin: 0 auto;
}

.sidebar {
  flex: 2;
  background-color: var(--main-color);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-content{
  flex: 6;
}

@media (max-width: 1200px) {
  .container {
    display: block;
  }

  .sidebar {
    min-height: 30vh;
  }
}

.btn-container {
  padding: .5rem;
  background-color: transparent;
}

.btn-container:hover {
  background-color: var(--main-hovor-color);
}

.sidebar-button {
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  text-align: start;
  border-radius: .5rem;
  transition: 0.3s ease-in-out;
}

.sidebar-button:hover {
  color: var(--text-hovor-color);
}

.sidebar ul li {
  list-style: none;
  margin: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: start;
  text-transform: capitalize;
  font-weight: normal;
  color: var(--text-hovor-color);
  background-color: transparent;
}

.sidebar li:hover {
  color: var(--text-hovor-color);
  background-color: var(--main-hovor-color);
  transition: .3s ease-in-out;
}

.dashboard-content {
  flex: 10;
  padding: 4rem;
  background-color: #eeeeee;
}


.dashboard-info-content div {
  margin: 1rem;
}

.extend-btn {
  padding: .5rem;
  border-radius: .5rem 0;
  color: var(--text-hovor-color);
  background-color: var(--main-hovor-color);
  cursor: pointer;
}

.extend-btn:hover {
  color: var(--text-color);
  background-color: var(--main-color);
  transition: .3s ease-in-out;
}

.header h2,
.footer h2{
  font-size: 1.5rem;
  color: var(--main-hovor-color);
  text-align: center;
  margin: 1rem auto;
}

.divider{
  border-bottom: 2px solid var(--main-hovor-color);
  margin: 1rem 0 ;
}

@media (max-width: 768px) {
  .sidebar {
    flex-basis: 100%;
  }

  .dashboard-content {
    padding: 1rem;
  }
}
</style>
