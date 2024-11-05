<script setup lang="ts">
import {defineProps, onMounted, ref} from 'vue';

const studentProps = defineProps<{
  student: {
    id: number;
  }
}>();


const items = [
  {
    title: "Maintenance Room Dashboard",
    maintenanceRooms: [
      {
        subTitle: "Total appending",
      },
      {
        subTitle: "Total accepted",
      },
      {
        subTitle: "Total rejected",
      }
    ]
  },
  {
    title: "Change Room Dashboard",
    changeRooms: [
      {
        subTitle: "Total appending",
      },
      {
        subTitle: "Total accepted",
      },
      {
        subTitle: "Total rejected",
      },
    ]
  },
  {
    title: "Students Dashboard",
    studentsDashboard: [
      {
        subTitle: "Total students males",
      },
      {
        subTitle: "Total student females",
      }
    ]
  },
  {
    title: "Rooms Dashboard",
    rooms: [
      {
        subTitle: "Total available rooms",
      },
      {
        subTitle: "Total occupied rooms",
      }
    ]
  }
]

const currentNumber = ref(0);
const targetNumber = 400;
const duration = 3000;
const incrementTime = 50;
const totalIncrements = duration / incrementTime;
const incrementValue = targetNumber / totalIncrements;

onMounted(() => {
  let currentIncrement = 0;

  const interval = setInterval(() => {
    currentIncrement++;
    currentNumber.value = Math.min(Math.round(currentIncrement * incrementValue), targetNumber);

    if (currentIncrement >= totalIncrements) {
      clearInterval(interval);
    }
  }, incrementTime);
});

</script>

<template>
  <div class="admin-section">
    <div class="admin-section-container">
      <div class="side-bar">
        <h2>
          <span>
            <UIcon
                name="ic-round-home"
                class="dashboard-icon"
            />
          </span>
          Dashboard
        </h2>
        <ul class="admin-menu">
          <li>
            <router-link to="/maintenance-room-dashboard">
              <span class="admin-icon">
                <UIcon name="icon-park-outline-data-switching"/>
              </span>
              Maintenance Room
            </router-link>
          </li>
          <li>
            <router-link to="/change-room-dashboard">
              <span class="admin-icon">
                <UIcon name="icon-park-outline-data-switching"/>
              </span>
              Change Room
            </router-link>
          </li>
          <li>
            <a href="">
              <span class="admin-icon">
                <UIcon name="icon-park-outline-data-switching"/>
              </span>
              Room Dashboard
            </a>
          </li>
        </ul>
        <h2> <span>
            <UIcon
                name="ic-round-home"
                class="dashboard-icon"
            /></span>
          Students
        </h2>
        <ul class="admin-menu">
          <li>
            <router-link to="/maintenance-room">
              <span class="admin-icon">
                <UIcon name="icon-park-outline-data-switching"/>
              </span>
              maintenance Form
            </router-link>
          </li>
          <li>
            <router-link to="/request-to-change-room">
              <span class="admin-icon">
                <UIcon name="icon-park-outline-data-switching"/>
              </span>
              Change Room Form
            </router-link>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="content-container">
          <div class="info-analysis" v-for="item in items">
            <h3 class="title">{{ item.title }}</h3>
            <div class="main-box" v-if="item.maintenanceRooms">
              <div v-for="(maintenanceRoom, index) in item.maintenanceRooms" :key="index">
                <div class="icon">
                  <UIcon
                      name="mdi-worker-outline"
                  />
                </div>
                <h2 class="subTitle">{{ maintenanceRoom.subTitle }}</h2>
                <h2 class="percentage">
                  <span>{{ studentProps.student?.id || 0 }}</span>
                  <span> + </span>
                </h2>
              </div>
            </div>

            <div class="main-box" v-if="item.changeRooms">
              <div v-for="(changeRoom, index) in item.changeRooms" :key="index">
                <div class="icon">
                  <UIcon
                      name="stash-arrows-switch"
                  />
                </div>
                <h2 class="subTitle">{{ changeRoom.subTitle }}</h2>
                <h2 class="percentage">
                  <span>{{ studentProps.student?.id || 0 }}</span>
                  <span> + </span>
                </h2>
              </div>
            </div>
            <div class="main-box" v-if="item.studentsDashboard">
              <div v-for="(studentsDashboard, index) in item.studentsDashboard" :key="index">
                <div class="icon">
                  <UIcon
                      name="stash-arrows-switch"
                  />
                </div>
                <h2 class="subTitle">{{ studentsDashboard.subTitle }}</h2>
                <h2 class="percentage">
                  <span> + </span>
                </h2>
              </div>
            </div>
            <div class="main-box" v-if="item.rooms">
              <div v-for="(room, index) in item.rooms" :key="index">
                <div class="icon">
                  <UIcon
                      name="medical-icon-i-restrooms"
                  />
                </div>
                <h2 class="subTitle">{{ room.subTitle }}</h2>
                <h2 class="percentage">
                  <span>{{ studentProps.student?.id || 0 }}</span>
                  <span> + </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-section {
  align-items: center;
  text-align: center;
  background-color: var(--bg-color);
}

.admin-section-container {
  display: flex;
  flex-direction: row;
  margin: 0;
  background-color: #eeeeee;
}

.side-bar {
  flex: 20%;
  background-color: var(--main-color);
  padding: 3rem 1rem;
}

.content {
  flex: 80%;
}

@media (max-width: 1200px) {
  .admin-section-container {
    display: block;
    margin: 5rem 0;
    padding: 0;
  }
}

.side-bar > h2 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: normal;
  color: var(--bg-color);
  padding: 0;
}

.side-bar > h2 > span {
  font-size: 1.5rem;
}

.admin-menu {
  margin: 2rem 0;
}

.admin-menu li {
  list-style: none;
  margin: 0.8rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: start;
  text-transform: capitalize;
  font-weight: normal;
  color: var(--main-color);
  background-color: #eeeeee;
  border-radius: 1rem 0;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.admin-menu li:hover {
  background-color: var(--text-hovor-color);
  color: var(--bg-color);
}

.admin-menu li a span {
  margin-right: 0.4rem;
}

.submenu li {
  text-decoration: none;
  display: block;
  color: var(--main-color);
  background-color: var(--bg-color);
  text-align: start;
  padding: 0.3rem 0.5rem;
  margin: 0.5rem 1rem;
  border-radius: 1rem 0;
}

.submenu a:hover {
  text-decoration: none;
}

.content > h1 {
  text-align: center;
  font-size: 1.2rem;
  font-weight: normal;
  color: var(--main-color);
  margin: 2rem 0;
}

.content-container {
  display: block;
  flex-wrap: wrap;
}

.content-container .info-analysis {
  margin: 1rem;
  padding: .5rem 0;
  font-size: 1.2rem;
  background-color: var(--bg-color);
  border-radius: 2rem 0;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;

}

.content-container .info-analysis h3 {
  font-size: 2rem;
  color: var(--main-color);
}

.info-analysis > .main-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem 0;
  margin: 2rem 1rem 1rem 1rem;
  gap: 1rem;
}

.main-box > div {
  flex: 30%;
  background-color: #eeeeee;
  border-radius: 1rem;
}

@media (max-width: 1200px) {
  .info-analysis > .main-box {
    display: block;
    gap: 1rem;
    border-radius: 0;
  }

  .main-box div {
    margin: 3rem auto;
    padding: 0;;
  }
}


.icon {
  font-size: 3rem;
  background-color: var(--main-color);
  color: var(--bg-color);
  width: 5rem;
  height: 5rem;
  margin: -2.5rem auto 0 auto;
  border-radius: 50%;
}

@media (max-width: 1200px) {
  .icon {
    border-radius: 50%;
  }
}

.subTitle {
  font-size: 1.2rem;
  text-align: center;
  color: var(--main-color);
  margin: 1rem 0;
}

.percentage {
  padding: 1rem;
  font-size: 3rem;
  text-align: center;
  color: var(--text-hovor-color);
  margin: .5rem auto;
}
</style>
