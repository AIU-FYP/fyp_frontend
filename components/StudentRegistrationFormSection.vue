<script setup lang="ts">
import { ref} from 'vue'




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
      <StudentRegistrationForm/>
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
  margin: 0.5rem 1rem;
  font-size: 1rem;
  text-align: start;
  text-transform: capitalize;
  font-weight: normal;
  color: var(--text-hovor-color);
}

.sidebar li:hover {
  color: var(--text-hovor-color);
  transition: .3s ease-in-out;
}

.dashboard-content {
  flex: 5;
  padding: 0;
  background-color: #eeeeee;
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