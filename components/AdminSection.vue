<script setup lang="ts">
import {ref} from 'vue';

const dashboardItems = [
  {
    title: "Main Dashboard",
    maintenanceStats: [
      {
        subTitle: "Male Students",
        icon: "fa-male",
      },
      {
        subTitle: "Female Students",
        icon: "fa-female",
      },
      {
        subTitle: "Maintenance Requested",
        icon: "la-building-solid",
      },
      {
        subTitle: "Changes Room Requested",
        icon: "la-building-solid",
      },
      {
        subTitle: "Available Rooms",
        icon: "fa-bed",
      },
      {
        subTitle: "Occupied Rooms",
        icon: "ic-baseline-clear",
      },
    ],
  },
];


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
            <a :href="link.url" >{{ link.text }}</a>
          </li>
        </ul>
      </div>
    </aside>

    <main class="dashboard-content">

      <section class="dashboard-info-content">
        <div class="welcome-info">
          <h2>Welcome back </h2>
        </div>
        <div class="image-container">
          <img src="/images/login.webp" alt="welcome-image">
        </div>
      </section>

      <section v-for="item in dashboardItems" :key="item.title" class="analysis-section">
        <div class="stat-cards">
          <div v-for="(stat, index) in item.maintenanceStats" :key="index" class="stat-card">
            <div class="box">
              <h4>{{ stat.subTitle }}</h4>
              <span class="stat-icon">
              <UIcon
                  :name="stat.icon"
              />
            </span>
            </div>
            <div class="num">
              <span>2000</span>
            </div>
          </div>
        </div>
      </section>

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
  padding: 4rem;
  background-color: #eeeeee;
}

.dashboard-info-content {
  display: flex;
  justify-content: space-between;
  padding: 0;
  border: 2px solid var(--main-color);
  border-radius: 1rem;
}

@media (max-width: 1200px) {
  .dashboard-info-content {
    display: block;
  }
}

.dashboard-info-content div {
  margin: 1rem;
}

.welcome-info h2 {
  font-size: 1.5rem;
  color: var(--main-color);
}

.dashboard-info-content .image-container {
  width: 120px;
  height: 120px;
}

.analysis-section {
  margin-bottom: 2rem;
}

.stat-cards {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1 1 20%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: var(--text-hovor-color);
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0 1rem 1rem 0 !important;
}

.stat-card .box {
  flex: 5;
  padding: 1rem 0.5rem;
}

.stat-card .num {
  padding: 1rem 0.5rem;
  flex: 2;
  border-radius: 0 1rem 1rem 0;
  background-color: var(--main-color);
}

.stat-card .num > span {
  display: flex;
  margin: 2rem 0;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-color);
}

.stat-card h4 {
  font-size: 1.1rem;
  color: var(--main-color);
}

.stat-icon {
  font-size: 2rem;
  color: var(--main-color);
  margin: 0.5rem 0;
}


@media (max-width: 768px) {
  .sidebar {
    flex-basis: 100%;
  }

  .dashboard-content {
    padding: 1rem;
  }

  .stat-cards{
    flex-direction: column;
  }
}
</style>
