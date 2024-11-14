<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useNuxtApp} from '#app'
import Popup from '~/components/PopupStudentChangeInfo.vue'

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
    </main>
  </div>
</template>

<style scoped>

.admin-dashboard {
  display: flex;
}

.sidebar {
  flex: 1;
  background-color: var(--main-color);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@media (max-width: 1200px) {
  .admin-dashboard {
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
  flex: 5;
  padding: 0;
  background-color: #eeeeee;
}

.container {
  margin: 2rem 0;
  padding: 2rem;
  max-width: 1200px;
  background-color: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
}

@media (max-width: 768px) {
  .sidebar {
    flex-basis: 100%;
  }

  .dashboard-content {
    padding: 1rem;
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