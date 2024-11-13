<script setup lang="ts">
import {ref} from 'vue';

const dashboardItems = [
  {
    title: "Main Dashboard",
    maintenanceStats: [
      {subTitle: "Total Pending"},
      {subTitle: "Total Accepted"},
      {subTitle: "Total Rejected"},
      {subTitle: "Available Rooms"},
      {subTitle: "Occupied Rooms"},
      {subTitle: "Total Pending"},
      {subTitle: "Total Accepted"},
      {subTitle: "Total Rejected"},
    ],
  },
];

const summaryDetails = [
  {
    title: "Total Maintenance Requests"
  },
  {title: "Total Room Change Requests"},
];

const visibleButtonIndex = ref<number | null>(null);

const navigationButtons = [
  {
    name: "Student",
    links: [
      {text: "Register Student", url: "/add-new-student"},
      {text: "Manage Student", url: ""},
    ],
  },
  {
    name: "Maintenance",
    links: [
      {text: "Maintenance Form", url: "/maintenance-room"},
      {text: "Manage Maintenance", url: ""},
    ],
  },
  {
    name: "Change Room",
    links: [
      {text: "Change Room Form", url: "/request-to-change-room"},
      {text: "Manage Room Changes", url: "https://www.vuemastery.com"},
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
        <button
            @click="toggleLinkVisibility(index)"
            :aria-expanded="visibleButtonIndex === index"
            class="sidebar-button"
        >
          <UIcon name="icon-park-outline-control"/>
          {{ button.name }}
        </button>
        <ul v-if="visibleButtonIndex === index">
          <li v-for="(link, linkIndex) in button.links" :key="linkIndex">
            <a :href="link.url" target="_blank">{{ link.text }}</a>
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
            <h4>{{ stat.subTitle }}</h4>
            <UIcon name="mdi-worker-outline" class="stat-icon"/>
            <p class="stat-value">+ <span></span></p>
          </div>
        </div>
      </section>

      <section class="dashboard-summary">
        <div v-for="detail in summaryDetails" :key="detail.title" class="summary-card">
          <h3>{{ detail.title }}</h3>
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

.sidebar-button {
  font-size: 1.2rem;
  color: var(--text-hovor-color);
  margin-bottom: 0.5rem;
  text-align: start;
  transition: color 0.3s;
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
  background-color: var(--text-hovor-color);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

.dashboard-summary {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.summary-card {
  background-color: var(--main-color);
  padding: 1rem;
  border-radius: 1rem 0;
  flex: 1 1 calc(50% - 1rem);
  text-align: center;
}

@media (max-width: 768px) {
  .sidebar {
    flex-basis: 100%;
  }

  .dashboard-content {
    padding: 1rem;
  }

  .stat-cards,
  .dashboard-summary {
    flex-direction: column;
  }
}
</style>
